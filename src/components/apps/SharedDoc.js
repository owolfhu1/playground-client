import React, { Component } from 'react';
import Button from "react-bootstrap/es/Button";
import Draggable from "react-draggable";

export default class SharedDoc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket : this.props.socket,
            value : '',
            index : this.props.index,
            id : this.props.appJSON.id,
        };

        this.state.socket.on(this.state.id, value => {
            this.setState({value});
        });

    }

    bringToTop() {
        let elems = document.getElementsByTagName("*");
        let highest = 0;
        for (let i = 0; i < elems.length; i++)
        {
            let zindex = document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
            if ((zindex > highest) && (zindex != 'auto'))
            {
                highest = zindex*1;
            }
        }
        highest++;
        this.windowDiv.style.zIndex = highest;
    }




    handleChange(event) {
        this.state.socket.emit('update_doc', {id : this.state.id, text: event.target.value});
    }


    render() {
        return (
            <Draggable enableUserSelectHack={false} >
                <div ref={div => {this.windowDiv = div;}} onClick={this.bringToTop.bind(this)} className="shared_doc_window">
                    <Button className="close_window" bsStyle="danger" onClick=
                        {() => this.state.socket.emit('close_me', {index : this.state.index, id : this.state.id})}>x</Button>


                    <textarea className="shared_doc" value={this.state.value}
                              onChange={this.handleChange.bind(this)}/>


                </div>
            </Draggable>
        )
    }

}