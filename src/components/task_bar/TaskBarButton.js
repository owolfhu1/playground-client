import React, { Component } from 'react';
import {Button} from "react-bootstrap";


export default class TaskBarButton extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            flash : false,
        };
        
        this.props.socket.on('flash'+this.props.index,
            () => this.setState({flash:true}));
        
    }
    
    click() {
        this.props.socket.emit('task_click', this.props.index);
        if (this.state.flash)
            this.setState({flash:false});
    }
    
    
    render() {
        return (
            <Button className={this.state.flash ? "flash" : null} bsStyle="info"
                    onClick={this.click.bind(this)}>
                {this.props.appJSON.type + " " + this.props.appJSON.id}
            </Button>
        )
    }
    
}