import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import Draggable from "react-draggable";


export default class OnlineList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list : [],
            show : true,
        };

        //updates list when user logs in
        this.props.socket.on('user_login', username => {
            let list = this.state.list;
            list.push(username);
            this.setState({list});
        });

        //update list when user logs out
        this.props.socket.on('user_logout', username => {
            let list = this.state.list;
            list.splice(list.indexOf(username), 1);
            this.setState({list});
        });

        //gets initial list when client logs in
        this.props.socket.on('set_login_list', list => this.setState({list}));
        
        this.props.socket.on('task_online', () => this.taskClick());

    }

    //turns array of username into array of <li> tags with buttons
    drawList(){
        let list = [];
        for (let index in this.state.list) {
            let name = this.state.list[index];
            list.push(<Button className="btn btn-sm btn-success btn-block online_button"
                        onClick={() => this.props.socket.emit('chat_with', name)}>
                    {name}</Button>);
        }
        return list;
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
    
    
    render() {
        return (
            <Draggable handle="strong">
                <div onClick={this.bringToTop.bind(this)} ref={div => {this.windowDiv = div;}}
                     className={this.state.show ? "well online_list": 'hide'}>
                    <strong><div className="title">Online List</div></strong>
                    <span>{this.drawList()}</span>
                </div>
            </Draggable>
        )
    };

};