import React, { Component } from 'react';
import GlobalChat from "./lobby/GlobalChat";
import OnlineList from "./lobby/OnlineList";

export default class Lobby extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show : false
        };
        this.props.socket.on('lobby_show', () => this.setState({show: true}));
        this.props.socket.on('lobby_hide', () => this.setState({show: false}));
    }

    render() {
        return (
            <div className={this.state.show ? null : 'hide'}>
                <OnlineList socket={this.props.socket}/>
                <GlobalChat socket={this.props.socket}/>
            </div>
        )
    }

}