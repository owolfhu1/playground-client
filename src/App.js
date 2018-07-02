import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import './App.css';
import Login from "./components/Login";
import Popup from "./components/Popup";
import Lobby from "./components/Lobby";
import AppLauncher from "./components/AppLauncher";
class App extends Component {

    constructor() {
        super();
        this.state = {
            socket : socketIOClient(
                //'http://localhost:4001',
                'https://react-playground-server.herokuapp.com/',
            ),
        };
    };
//suits: ♣ ♥ ♦ ♠
    render() {
        return (
            <div>
                <Login socket={this.state.socket}/>
                <Popup socket={this.state.socket}/>
                <Lobby socket={this.state.socket}/>
                <AppLauncher socket={this.state.socket}/>
            </div>
        );
    };
}

export default App;
