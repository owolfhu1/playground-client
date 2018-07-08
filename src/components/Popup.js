import React, { Component } from 'react';
import {Button, Panel} from "react-bootstrap";
import Draggable from "react-draggable";

export default class Popup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            title: '',
            show: false
        };

        //lets server activate popup
        this.props.socket.on('popup', data => this.show(data));

    }

    //hide the popup on button press
    hide = () => this.setState({show: false});

    //show the popup with given data
    show = data => {
        this.setState({show: true, text: data.text, title: data.title});
        this.bringToTop();
    };


    bringToTop() {
        let elems = document.getElementsByTagName("*");
        let highest = 0;
        for (let i = 0; i < elems.length; i++) {
            let zindex = document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
            if ((zindex > highest) && (zindex != 'auto'))
                highest = zindex*1;
        }
        highest++;
        this.windowDiv.style.zIndex = highest;
    }



    render() {
        return (
            <Draggable handle="strong">
                <div ref={div => {this.windowDiv = div;}} onClick={this.bringToTop.bind(this)}
                     className={this.state.show ? 'popup_window' : 'hide'}>
                    <Panel>
                        <Panel.Heading>
                            <strong><Panel.Title>
                                {this.state.title}
                            </Panel.Title></strong>
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