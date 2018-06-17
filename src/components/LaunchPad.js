import React, { Component } from 'react';

//this is where draggable components will get added and removed from the page
//TODO: figure out just how the heck im gonna do this....
export default class LaunchPad extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket : this.props.socket,
        };

        //launch components at request of server
        this.state.socket.on('launch', data => {
            //todo
        });
    }

    render() {
        return (
            <div className="launch_pad">
            </div>
        )
    }

}