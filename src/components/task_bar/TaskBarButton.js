import React, { Component } from 'react';
import {Button} from "react-bootstrap";


export default class TaskBarButton extends Component {
    
    constructor(props) {
        super(props);
        
        
        
    }
    
    
    render() {
        return (
            <Button bsStyle="info">
                {this.props.appJSON.type + " " + this.props.appJSON.id}
            </Button>
        )
    }
    
}