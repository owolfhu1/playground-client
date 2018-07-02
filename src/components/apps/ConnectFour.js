import React, { Component } from 'react';
import ConnectFourInputRow from "./connect-four/ConnectFourInputRow";
import Draggable from "react-draggable";
import ConnectFourBoard from "./connect-four/ConnectFourBoard";
import Button from "react-bootstrap/es/Button";

export default class ConnectFour extends Component {
        //<ConnectFour id={} board={} socket={this.state.socket}/>
    constructor(props) {
        super(props);
        this.state = {
            socket : this.props.socket,
            id : this.props.appJSON.id,
            board : [
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
            ],
            active : true,
        };

        //closes at request of server
        this.state.socket.on(this.state.id + 'close', () => this.setState({active:false}));
            //this.state.socket.emit('close_me', {index:this.props.index, id: this.state.id}));

        //set the board at request of server
        this.state.socket.on(this.state.id, board => this.setState({board}));

        setTimeout(this.bringToTop.bind(this), 200);

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
                <div ref={div => {this.windowDiv = div;}} onClick={this.bringToTop.bind(this)} className="connect_4">

                    <strong><div className="title">Connect 4 - {this.state.id}</div></strong>
                    
                    {/*shows input row when active and close button when un-active*/}
                    {this.state.active ? <ConnectFourInputRow socket={this.state.socket} id={this.state.id}/> :
                        <Button className="close_window" bsStyle="danger" onClick=
                            {() => this.state.socket.emit('close_me', {index : this.props.index, id : this.state.id})}>x</Button>}

                    <ConnectFourBoard board={this.state.board}/>

                </div>
            </Draggable>
        )
    };

}