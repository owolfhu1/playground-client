import React, { Component } from 'react';

//this is where draggable components will get added and removed from the page
//TODO: figure out just how the heck im gonna do this....
export default class LaunchPad extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket : this.props.socket,
            show : false,
        };

        //launch components at request of server
        this.state.socket.on('launch', data => {
            //todo
        });

        //idk why this doesnt just hide with the loby, but this is quick fix
        this.state.socket.on('lobby_show', username => this.setState({show: true}));
        this.state.socket.on('lobby_hide', () => this.setState({show: false}));
    }

    render() {
        return (
            <ul className={`well launch_pad ${this.state.show ? null : 'hide'}`}>

            </ul>
        )
    }

}