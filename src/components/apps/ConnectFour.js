import React, { Component } from 'react';
import ConnectFourInputRow from "./connect-four/ConnectFourInputRow";
import Draggable from "react-draggable";
import ConnectFourBoard from "./connect-four/ConnectFourBoard";

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
        };

        //closes at request of server
        this.state.socket.on(this.state.id + 'close', () =>
            this.state.socket.emit('close_me', {index:this.props.index, id: this.state.id}));

        //set the board at request of server
        this.state.socket.on(this.state.id, board => this.setState({board}));

    }

    bringToTop() {
        let elems = document.getElementsByTagName("*");
        let highest = 0;
        for (let i = 0; i < elems.length; i++)
        {
            let zindex = document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
            if ((zindex > highest) && (zindex != 'auto'))
            {
                highest = zindex*1;
            }
        }
        highest++;
        this.windowDiv.style.zIndex = highest;
    }

    render() {
        return (
            <Draggable>
                <div ref={div => {this.windowDiv = div;}} onClick={this.bringToTop.bind(this)} className="connect_4">
                    <ConnectFourInputRow socket={this.state.socket} id={this.state.id}/>
                    <ConnectFourBoard board={this.state.board}/>
                </div>
            </Draggable>
        )
    }

}