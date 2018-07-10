import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import Draggable from "react-draggable";
import {Button} from "react-bootstrap";

export default class SpecialGame extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            gameSocket : socketIOClient(
                'http://localhost:4002',
                //'https://.herokuapp.com/',
            ),
            serverMsg : '',
            name : '',
            show :  true,
        };
        
        this.props.socket.emit('get_name');
        this.props.socket.on('get_name', name => {
            this.state.gameSocket.emit('start', {name, gameId: this.props.appJSON.id});
            this.setState({name})
        });
        
        
        this.state.gameSocket.on('response',
                serverMsg => this.setState({serverMsg}));
    
        this.props.socket.on('task_' + this.props.index, this.taskClick.bind(this));
        
        setTimeout(this.bringToTop.bind(this), 200);
    }
    
    
    taskClick() {
        this.bringToTop();
        this.setState({show:!this.state.show});
    }
    
    
    //todo: why doesn't this work???
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

    close() {
        this.state.gameSocket.disconnect();
        this.props.socket.emit('close_me', {index : this.props.index, id : this.props.appJSON.id});
    }
    
    render() {
        return (
            <Draggable handle="strong">
                <div ref={div => {this.windowDiv = div;}} className={this.state.show ? null : 'hide'}
                     onClick={this.bringToTop.bind(this)} style={{
                    width: '400px',
                    height: '400px',
                    border: 'black solid 1px',
                    background: 'gray',
                    padding: '20px'
                }}>

                    <strong><div className="title">Special Test Game</div></strong>


                    {/* example */}
                    <h1>Hello {this.state.name}!</h1>
                    <button onClick={() => this.state.gameSocket.emit('click', this.state.name)}>
                        click me</button>
                    <p>{this.state.serverMsg}</p>
                    {/* example */}



                    <Button className="close_window" bsStyle="danger" onClick={this.close.bind(this)}>x</Button>
                    
                </div>
            </Draggable>
        );
    }

}