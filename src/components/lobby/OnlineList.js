import React, { Component } from 'react';
import {Button} from "react-bootstrap";


export default class OnlineList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket : this.props.socket,
            list : [],
        };

        //updates list when user logs in
        this.state.socket.on('user_login', username => {
            let list = this.state.list;
            list.push(username);
            this.setState({list});
        });

        //update list when user logs out
        this.state.socket.on('user_logout', username => {
            let list = this.state.list;
            list.splice(list.indexOf(username), 1);
            this.setState({list});
        });

        //gets initial list when client logs in
        this.state.socket.on('set_login_list', list => this.setState({list}));

    }

    //turns array of username into array of <li> tags with buttons
    drawList(){
        let list = [];
        for (let index in this.state.list) {
            let name = this.state.list[index];
            list.push(<Button className="btn btn-success btn-block online_button"
                        onClick={() => this.state.socket.emit('chat_with', name)}>
                    {name}</Button>);
        }
        return list;
    }

    render() {
        return (
            <div className="well online_list">
                {this.drawList()}
            </div>
        )
    };

};