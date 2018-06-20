import React, { Component } from 'react';
import {Button, Panel} from "react-bootstrap";
import Draggable from "react-draggable";

export default class Popup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            text: '',
            title: '',
            show: false
        };

        //lets server activate popup
        this.state.socket.on('popup', data => this.show(data));

    }

    //hide the popup on button press
    hide = () => this.setState({show: false});

    //show the popup with given data
    show = data => this.setState({show: true, text: data.text, title: data.title});

    render() {
        return (
            <Draggable>
                <div className={this.state.show ? 'popup_window' : 'hide'}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>
                                {this.state.title}
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {this.state.text}
                        </Panel.Body>
                        <Button className="close_window" bsStyle="danger" onClick={this.hide}>x</Button>
                    </Panel>
                </div>
            </Draggable>
        )
    }

}