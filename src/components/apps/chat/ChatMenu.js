import React, { Component } from 'react';

export default class ChatMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket : this.props.socket,
            appId : this.props.appId,
            show : false,
        };

    }

    dropDown() {
        this.setState({show:!this.state.show});
    }


    render() {
        return (
            <div onClick={this.dropDown.bind(this)} className="btn btn-primary chat_menu">
                ^
                <div className={this.state.show ? 'chat_menu_drop_down':'hide'}>
                    <button onClick={() => this.state.socket.emit('make_doc', this.state.appId)}
                            className="btn btn-block btn-sm btn-primary">Shared Doc</button>

                </div>
            </div>
        );
    }
}