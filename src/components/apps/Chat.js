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

        //removes user from memberlist and displays a message when user leaves
        this.state.socket.on(this.state.id + 'leave', username => {
            let text = this.state.text;
            text.push(<p>{username} has left the chat.</p>);
            let appJSON = this.state.appJSON;
            delete appJSON.members[appJSON.members.indexOf(username)];
            this.setState({text,appJSON});
        });

        //add user to member list
        this.state.socket.on(this.state.id + 'add', username => {
            let text = this.state.text;
            text.push(<p>{username} has joined the chat.</p>);
            let appJSON = this.state.appJSON;
            appJSON.members.push(username);
            this.setState({text,appJSON});
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
            string += `${members[i]}, `;
        }
        return string.substr(0,string.length -2);
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

