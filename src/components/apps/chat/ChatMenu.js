import React, { Component } from 'react';

//displays a little blue button: [^]
//when pressed a drop down is displayed:
//||
export default class ChatMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show : false,
            inviteInput : ''
        };

    }

    dropDown() {
        this.setState({show:!this.state.show}, () => {
            if (this.state.show)
                this.inviteInput.focus();
        });
    }

    handleInputChange(event) {
        this.setState({inviteInput:event.target.value});
    }


    render() {
        return (
            <div onClick={this.dropDown.bind(this)} className="btn btn-primary app_menu">
                ^
                <div className={this.state.show ? 'app_menu_drop_down':'hide'}>

                    {/*invite input*/}
                    <input type="text" onChange={this.handleInputChange.bind(this)}
                           value={this.state.inviteInput} className="form-control"
                           ref={input => {this.inviteInput = input;}} />

                    {/*invite button*/}
                    <button onClick={() => this.props.socket.emit('chat_invite',
                        {id:this.props.appId,name:this.state.inviteInput})}

                            className="btn btn-block btn-sm btn-success">invite</button>
                    <hr/>

                    {/*start shared document button*/}
                    <button onClick={() => this.props.socket.emit('make_doc', this.props.appId)}
                            className="btn btn-block btn-sm btn-primary">Shared Doc</button>

                    {/*start connect four button*/}
                    <button onClick={() => this.props.socket.emit('start_connect_4', this.props.appId)}
                            className="btn btn-block btn-sm btn-warning">Connect Four</button>
    
                    {/*start special game button*/}
                    <button onClick={() => this.props.socket.emit('make_special', this.props.appId)}
                            className="btn btn-block btn-sm btn-info">Test Game</button>
                    


                </div>
            </div>
        );
    }
}