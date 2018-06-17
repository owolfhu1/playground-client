import React, { Component } from 'react';
import {ButtonGroup, FormControl, Well} from "react-bootstrap";
import Button from "react-bootstrap/es/Button";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            show : true
        };

        //functions to let server show/hide login window
        this.props.socket.on('login_hide', () => this.setState({show : false}));
        this.props.socket.on('login_show', () => this.setState({show : true}));

    }

    //function to attempt to login
    submit() {
        let data = {
            username : this.state.username,
            password : this.state.password,
        };
        this.props.socket.emit('login', data);
    }

    //function to attempt to register
    register() {
        let data = {
            username : this.state.username,
            password : this.state.password
        };
        this.props.socket.emit('register', data);
    }

    //handle data change in inputs
    handleUsernameChange(event) {this.setState({username:event.target.value});}
    handlePasswordChange(event) {this.setState({password:event.target.value});}

    render() {
        return (
            <div className={this.state.show ? 'top' : 'hide'}>
                <Well className="login">
                    Username
                    <FormControl value={this.state.username} onChange={this.handleUsernameChange.bind(this)}
                                 type="text" placeholder="username"/>
                    Password
                    <FormControl value={this.state.password} onChange={this.handlePasswordChange.bind(this)}
                                 type="password" placeholder="Password"/>
                    <br/>
                    <ButtonGroup>
                        <Button onClick={this.submit.bind(this)}>Sign in</Button>
                        <Button onClick={this.register.bind(this)}>register</Button>
                    </ButtonGroup>
                </Well>
            </div>
        )
    }

}