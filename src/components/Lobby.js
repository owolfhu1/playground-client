import React, { Component } from 'react';
import GlobalChat from "./lobby/GlobalChat";
import OnlineList from "./lobby/OnlineList";

export default class Lobby extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket : this.props.socket,
            username : '',//this isn't used, maybe remove..
            show : false
        };

        //show/hide the lobby from server
        this.state.socket.on('lobby_show', username => this.setState({username, show: true}));
        this.state.socket.on('lobby_hide', () => this.setState({show: false}));

    }

    render() {
        return (
            <div className={this.state.show ? null : 'hide'}>
                <OnlineList socket={this.state.socket}/>
                <GlobalChat socket={this.state.socket}/>
            </div>
        )
    }

}