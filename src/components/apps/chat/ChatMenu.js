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
                    <button className="btn btn-block btn-warning">Click a</button>
                    <button className="btn btn-block btn-danger">button to</button>
                    <button className="btn btn-block btn-primary">shart a new</button>
                    <button className="btn btn-block btn-success">activity!!</button>
                    <button className="btn btn-block">coming soon</button>
                </div>
            </div>
        );
    }
}