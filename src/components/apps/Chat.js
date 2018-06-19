import React, { Component } from 'react';
import Draggable from "react-draggable";
import {Button} from "react-bootstrap";


export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            id: this.props.appJSON.id,
            index: this.props.index,
            appJSON: this.props.appJSON,
            input: '',
            text: [],
    }
        ;

        //update chat with incoming messages
        this.state.socket.on(this.state.id, msg => {
            let text = this.state.text;
            text.push(<p>{msg}</p>);
            this.setState({text});
        });

    }

    handleInputChange(event) {
        this.setState({input:event.target.value});
    }

    sendChat() {
        this.state.socket.emit('chat_room_msg', {input : this.state.input, id : this.state.id});
        this.setState({input:''});
    }

    render() {
        return (
            <Draggable>
                <div className="well chat">
                    <Button className="close" bsStyle="danger"
                            onClick={() => this.state.socket.emit('close_me', this.state.index)}>x</Button>
                    <div className="title">{this.state.appJSON.id}</div>
                    <div className="well chat_body">{this.state.text}</div>
                    <input type="text" className="form-control global_input"
                           value={this.state.input} onChange={this.handleInputChange.bind(this)}/>
                    <Button className="btn-success global_send"
                        onClick={this.sendChat.bind(this)}>send</Button>
                </div>
            </Draggable>
        )
    };

};

