import React, { Component } from 'react';
import Draggable from "react-draggable";
import {Button} from "react-bootstrap";
import ChatMenu from "./chat/ChatMenu";


export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.appJSON.id,
            input: '',
            text: [],
            show : true,
        };

        //update chat with incoming messages
        this.props.socket.on(this.props.appJSON.id, msg => {
            if(!this.state.show)
                this.props.socket.emit('self',{
                    type:'flash'+this.props.index
                });
            let text = this.state.text;
            text.push(<p>{msg}</p>);
            this.setState({text});
        });

        //removes user from member list and displays a message when user leaves
        this.props.socket.on(this.props.appJSON.id + 'leave', username => {
            let text = this.state.text;
            text.push(<p>{username} has left the chat.</p>);
            let appJSON = this.props.appJSON;
            delete appJSON.members[appJSON.members.indexOf(username)];
            this.setState({text,appJSON});
        });

        //add user to member list
        this.props.socket.on(this.props.appJSON.id + 'add', username => {
            let text = this.state.text;
            text.push(<p>{username} has joined the chat.</p>);
            let appJSON = this.props.appJSON;
            appJSON.members.push(username);
            this.setState({text,appJSON});
        });

        this.props.socket.on('task_' + this.props.index, this.taskClick.bind(this));
        
        setTimeout(this.bringToTop.bind(this), 200);

    }
    
    taskClick() {
        this.bringToTop();
        this.setState({show:!this.state.show});
    }

    handleInputChange(event) {
        this.setState({input:event.target.value});
    }

    sendChat() {
        if (this.state.input !== '') {
            this.props.socket.emit('chat_room_msg', {input: this.state.input, id: this.props.appJSON.id});
            this.setState({input: ''});
        }
    }

    printNames() {
        let string = '';

        let members = this.props.appJSON.members;

        for (let i in members)
            if (members[i])
                string += `${members[i]}, `;

        return string.substr(0,string.length -2);
    }

    handleKeyPress = e => {
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
        for (let i = 0; i < elems.length; i++) {
            let zindex = document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
            if ((zindex > highest) && (zindex != 'auto'))
                highest = zindex*1;
        }
        highest++;
        this.windowDiv.style.zIndex = highest;
    }

    render() {
        return (
            <Draggable handle="strong" enableUserSelectHack={false} >
                <div ref={div => {this.windowDiv = div;}} className={this.state.show ? "well chat" : 'hide'} onClick={this.bringToTop.bind(this)}>

                    <strong><div className="title">Chat - {this.printNames()}</div></strong>

                    <div ref={div => {this.messageList = div;}} className="well chat_body">{this.state.text}</div>

                    <input type="text" className="form-control global_input" onKeyPress={this.handleKeyPress}
                           value={this.state.input} onChange={this.handleInputChange.bind(this)}/>

                    <Button className="btn-success global_send"
                        onClick={this.sendChat.bind(this)}>send</Button>

                    <ChatMenu appId={this.props.appJSON.id} socket={this.props.socket}/>
                    
                    <Button className="close_window" bsStyle="danger" onClick=
                        {() => this.props.socket.emit('close_me', {index : this.props.index, id : this.props.appJSON.id})}>x</Button>
                </div>

            </Draggable>
        )
    };

};

