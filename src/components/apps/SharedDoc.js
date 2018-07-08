import React, { Component } from 'react';
import Button from "react-bootstrap/es/Button";
import Draggable from "react-draggable";
import DocMenu from "./shareddoc/DocMenu";

export default class SharedDoc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value : '',
            index : this.props.index,
            id : this.props.appJSON.id,
            title : '',
            show : true,
        };

        //gets text from server and puts it in the the textarea
        this.props.socket.on(this.state.id, data => {

            //get the position
            let positionStart = this.textarea.selectionStart;
            positionStart = positionStart > data.position ? positionStart + 2 : positionStart + 1;

            //put the new text in the textarea and callback sets selection position
            this.setState({value:data.text}, () => {
                this.textarea.setSelectionRange(positionStart,positionStart);
            });

        });

        this.props.socket.on(this.state.id+'title', title => this.setState({title}));
    
        this.props.socket.on('task_' + this.props.index, this.taskClick.bind(this));
        
        setTimeout(this.bringToTop.bind(this), 200);

    }
    
    save(name) {
        this.props.socket.emit('save_doc', {
            text:this.state.value,
            filename : name,
            id : this.state.id,
        });
    }
    

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
    
    taskClick() {
        this.bringToTop();
        this.setState({show:!this.state.show});
    }
    
    handleChange(event) {
        this.props.socket.emit('update_doc', {
            id : this.state.id,
            text: event.target.value,
            position : this.textarea.selectionStart
        });
    };
    
    render() {
        return (
            <Draggable handle="strong" nableUserSelectHack={false} >
                <div ref={div => {this.windowDiv = div;}} onClick={this.bringToTop.bind(this)}
                     className={this.state.show ? "shared_doc_window" : 'hide'}>

                    <strong><div className="title">{this.state.title}</div></strong>

                    <DocMenu save={this.save.bind(this)} appId={this.state.id} socket={this.props.socket}/>
                    
                    <Button className="close_window" bsStyle="danger" onClick=
                        {() => this.props.socket.emit('close_me', {index : this.state.index, id : this.state.id})}>x</Button>
                    
                    <textarea ref={textarea => {this.textarea = textarea;}} className="shared_doc" value={this.state.value}
                              onChange={this.handleChange.bind(this)}/>


                </div>
            </Draggable>
        )
    }

}