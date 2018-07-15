import React, { Component } from 'react';
import ConnectFourInputRow from "./connect-four/ConnectFourInputRow";
import Draggable from "react-draggable";
import ConnectFourBoard from "./connect-four/ConnectFourBoard";
import Button from "react-bootstrap/es/Button";

export default class ConnectFour extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            board : [
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
            ],
            active : true,
            show : true,
        };

        //closes at request of server
        this.props.socket.on(this.props.appJSON.id + 'close', () => this.setState({active:false}));

        //set the board at request of server
        this.props.socket.on(this.props.appJSON.id, board => {
            if(!this.state.show)
                this.props.socket.emit('self',{
                    type:'flash'+this.props.index
                });
            this.setState({board});
        });
    
        this.props.socket.on('task_' + this.props.index, this.taskClick.bind(this));
        
        setTimeout(this.bringToTop.bind(this), 200);

    }
    
    taskClick() {
        this.bringToTop();
        this.setState({show:!this.state.show});
    }
    
    bringToTop() {
        let elems = document.getElementsByTagName("*");
        let highest = 0;
        for (let i = 0; i < elems.length; i++) {
            let zindex = document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
            if ((zindex > highest) && (zindex != 'auto'))
                highest = zindex*1;
        }
        highest++;
        this.windowDiv.style.zIndex = highest;
    }

    render() {
        return (
            <Draggable handle="strong">
                <div ref={div => {this.windowDiv = div;}} onClick={this.bringToTop.bind(this)} className={this.state.show ? "connect_4" : 'hide'}>

                    <strong><div className="title">Connect 4 - {this.props.appJSON.id}</div></strong>
                    
                    {/*shows input row when active and close button when un-active*/}
                    {this.state.active ? <ConnectFourInputRow socket={this.props.socket} id={this.props.appJSON.id}/> :
                        <Button className="close_window" bsStyle="danger" onClick=
                            {() => this.props.socket.emit('close_me', {index : this.props.index, id : this.props.appJSON.id})}>x</Button>}

                    <ConnectFourBoard board={this.state.board}/>

                </div>
            </Draggable>
        )
    };

}