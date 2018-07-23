import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import Draggable from "react-draggable";
import {Button} from "react-bootstrap";
import SpecialBoard from "./SpecialBoard";

export default class SpecialGame extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            gameSocket : socketIOClient(
                //'http://localhost:4002',
                'https://special-game-server.herokuapp.com/',
            ),
            serverMsg : '',
            name : '',
            show :  true,
            playing : false
        };
        
        this.props.socket.emit('get_name');
        this.props.socket.on('get_name', name => {
            this.state.gameSocket.emit('start', {name, id: this.props.appJSON.id});
            this.setState({name})
        });
    
        this.state.gameSocket.on('update'+this.props.appJSON.id, board => {
            if (!this.state.playing)
                this.setState({playing:true});
            let scores = [];
            for (let i in board.players)
                scores.push(<span>&nbsp;&nbsp;{i}: {board.players[i].points}&nbsp;</span>)
            this.setState({serverMsg : scores});
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
                    position : 'absolute',
                    width: '290px',
                    border: 'black solid 1px',
                    background: 'gray',
                    padding: '5px',
                    paddingTop: '50px',
                    borderRadius: '5px'
                }}>

                    <strong><div className="title">Special Test Game</div></strong>
                    
                    
                    <p>{this.state.serverMsg}</p>
                    
                    
                    <button className={this.state.playing ? 'hide' : null}
                            onClick={() => this.state.gameSocket.emit('ready')}>
                        I'm Ready!</button>
                    
                    <Button className="close_window" bsStyle="danger" onClick={this.close.bind(this)}>x</Button>
                    
                    <SpecialBoard gameSocket={this.state.gameSocket} gameId={this.props.appJSON.id}/>
                    
                    
                </div>
            </Draggable>
        );
    }

}