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
            this.setState({chat, input: ''});
        });

    }


    handleInputChange(event) {
        this.setState({input:event.target.value});
    }


    render() {
        return (
            <div className="well global">
                <div className='well global_body'>
                    {this.state.chat}
                </div>
                <input className="form-control global_input"
                       value={this.state.input} onChange={this.handleInputChange.bind(this)}/>
                <button className="btn btn-primary global_send"
                        onClick={() => this.state.socket.emit('global_chat', this.state.input)}>send</button>
            </div>
        )
    }


}