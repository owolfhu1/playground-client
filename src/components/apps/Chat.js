import React, { Component } from 'react';
import Draggable from "react-draggable";
import {Button} from "react-bootstrap";


export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket : this.props.socket,
            id : this.props.id,
            index : this.props.index,
        };

    }

    render() {
        return (
            <Draggable>
                <div className="well chat">
                    <Button onClick={() => this.state.socket.emit('close_me', this.state.index)}>close</Button>
                </div>
            </Draggable>
        )
    };

};