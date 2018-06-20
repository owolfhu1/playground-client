import React, { Component } from 'react';


export default class GlobalChat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socket : this.props.socket,
            chat : [<p>WELCOME TO THE GLOBAL CHAT</p>],
            input : '',
        };

        this.state.socket.on('global_chat', msg => {
            let chat = this.state.chat;
            chat.push(<p>{msg}</p>);
            this.setState({chat});
        });

    }


    handleInputChange(event) {
        this.setState({input:event.target.value});
    }

    sendChat() {
        if (this.state.input !== '') {
            this.state.socket.emit('global_chat', this.state.input);
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

    render() {
        return (
            <div className="well global">
                <div ref={div => {this.messageList = div;}} className='well global_body'>
                    {this.state.chat}
                </div>
                <input className="form-control global_input" onKeyPress={this.handleKeyPress}
                       value={this.state.input} onChange={this.handleInputChange.bind(this)}/>
                <button className="btn btn-primary global_send"
                        onClick={this.sendChat.bind(this)}>send</button>
            </div>
        )
    }


}