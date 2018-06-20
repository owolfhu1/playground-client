import React, { Component } from 'react';
import Draggable from "react-draggable";
import {Button} from "react-bootstrap";
import ChatMenu from "./chat/ChatMenu";


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
        if (this.state.input !== '') {
            this.state.socket.emit('chat_room_msg', {input: this.state.input, id: this.state.id});
            this.setState({input: ''});
        }
    }

    printNames() {
        let string = '';

        let members = this.state.appJSON.members;

        for (let i in members) {
            string += i*1 === members.length - 1 ? members[i] : `${members[i]}, `;
        }
        return string;
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.sendChat();
        }
    };

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidUpdate() {
        this.scrollToBottom();
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
            <Draggable enableUserSelectHack={false} >
                <div ref={div => {this.windowDiv = div;}} className="well chat" onClick={this.bringToTop.bind(this)}>

                    <Button className="close_window" bsStyle="danger" onClick=
                        {() => this.state.socket.emit('close_me', {index : this.state.index, id : this.state.id})}>x</Button>

                    <div className="title">Chat - {this.printNames()}</div>

                    <div ref={div => {this.messageList = div;}} className="well chat_body">{this.state.text}</div>

                    <input type="text" className="form-control global_input" onKeyPress={this.handleKeyPress}
                           value={this.state.input} onChange={this.handleInputChange.bind(this)}/>

                    <Button className="btn-success global_send"
                        onClick={this.sendChat.bind(this)}>send</Button>

                    <ChatMenu appId={this.state.id} socket={this.state.socket}/>
                </div>

            </Draggable>
        )
    };

};

