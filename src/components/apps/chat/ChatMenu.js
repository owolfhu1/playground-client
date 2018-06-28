import React, { Component } from 'react';

//displays a little blue button: [^]
//when pressed a drop down is displayed:
//||
export default class ChatMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket : this.props.socket,
            appId : this.props.appId,
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
                           value={this.state.saveInput} className="form-control"
                           ref={input => {this.inviteInput = input;}} />

                    {/*invite button*/}
                    <button onClick={() => this.state.socket.emit('chat_invite',
                        {id:this.state.appId,name:this.state.saveInput})}

                            className="btn btn-block btn-sm btn-success">invite</button>
                    <hr/>

                    {/*start shared document button*/}
                    <button onClick={() => this.state.socket.emit('make_doc', this.state.appId)}
                            className="btn btn-block btn-sm btn-primary">Shared Doc</button>


                </div>
            </div>
        );
    }
}