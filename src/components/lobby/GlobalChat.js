import React, { Component } from 'react';
import Draggable from "react-draggable";

export default class GlobalChat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chat : [<p>WELCOME TO THE GLOBAL CHAT</p>],
            input : '',
            show : true,
        };

        this.props.socket.on('global_chat', msg => {
            let chat = this.state.chat;
            chat.push(<p>{msg}</p>);
            this.setState({chat});
        });
    
        this.props.socket.on('task_global', () => this.taskClick());
        
    }


    handleInputChange(event) {
        this.setState({input:event.target.value});
    }

    sendChat() {
        if (this.state.input !== '') {
            this.props.socket.emit('global_chat', this.state.input);
            this.setState({input: ''});
        }
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
        for (let i = 0; i < elems.length; i++) {
            let zindex = document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
            if ((zindex > highest) && (zindex != 'auto'))
                highest = zindex*1;
        }
        highest++;
        this.windowDiv.style.zIndex = highest;
    }
    
    taskClick() {
        this.bringToTop();
        this.setState({show:!this.state.show});
    }
    
    render() {
        return (
            <Draggable handle="strong" enableUserSelectHack={false}>
                <div onClick={this.bringToTop.bind(this)} ref={div => {this.windowDiv = div;}}
                     className={this.state.show ? "well chat" : 'hide'}>
                    <strong><div className="title">Global Chat</div></strong>
                    <div ref={div => {this.messageList = div;}} className='well chat_body'>
                        {this.state.chat}
                    </div>
                    <input className="form-control global_input" onKeyPress={this.handleKeyPress}
                           value={this.state.input} onChange={this.handleInputChange.bind(this)}/>
                    <button className="btn btn-primary global_send"
                            onClick={this.sendChat.bind(this)}>send</button>
                </div>
            </Draggable>
        )
    }


}