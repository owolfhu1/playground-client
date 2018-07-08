import React, { Component } from 'react';
import Chat from "./apps/Chat";
import SharedDoc from "./apps/SharedDoc";
import ConnectFour from "./apps/ConnectFour";
import Button from "react-bootstrap/es/Button";
import TaskBarButton from "./task_bar/TaskBarButton";

export default class TaskBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            list : [],
            show : false
        };
        
        //pushes component to list
        this.props.socket.on('launch', appJSON => {
            let list = this.state.list;
            list.push(<TaskBarButton index={list.length} appJSON={appJSON} socket={this.props.socket}/>);
            this.setState({list});
        });
        
        //removes component from list
        this.props.socket.on('close', index => {
            let list = this.state.list;
            delete list[index];
            this.setState({list});
        });
        this.props.socket.on('lobby_show', () => this.setState({show: true}));
        this.props.socket.on('lobby_hide', () => this.setState({show: false}));
    }
    
    render() {
        return (
            <div className="task_bar">
                <Button bsStyle="success">Menu</Button> |&nbsp;
                <span className={this.state.show ? null : 'hide'}>
                    <Button onClick={() => this.props.socket.emit('task_click', 'online')} bsStyle="primary">Online</Button>&nbsp;
                    <Button onClick={() => this.props.socket.emit('task_click', 'global')} bsStyle="primary">Global</Button> |&nbsp;
                </span>
                <span>{this.state.list}</span>
            </div>
        )
    }
    
}