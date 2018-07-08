import React, { Component } from 'react';
import {Button} from "react-bootstrap";


export default class TaskBarButton extends Component {
    
    constructor(props) {
        super(props);
        
        
        
    }
    
    
    render() {
        return (
            <Button onClick={() => this.props.socket.emit('task_click', this.props.index)} bsStyle="info">
                {this.props.appJSON.type + " " + this.props.appJSON.id}
            </Button>
        )
    }
    
}