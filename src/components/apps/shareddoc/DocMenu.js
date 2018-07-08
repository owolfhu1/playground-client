import React, { Component } from 'react';
import Button from "react-bootstrap/es/Button";
import ButtonGroup from "react-bootstrap/es/ButtonGroup";

//displays a little blue button: [^]
//when pressed a drop down is displayed:
export default class DocMenu extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            appId : this.props.appId,
            show : false,
            saveInput : '',
            list : []
        };
        
        //gets list from server to display in menu
        this.props.socket.on('doc_names', list => this.setState({list}));
    
    }
    
    dropDown() {
        this.setState({show:!this.state.show}, () => {
            if (this.state.show)
                this.saveInput.focus();
        });
    }
    
    handleInputChange(event) {
        this.setState({saveInput:event.target.value});
    }
    
    savedButtons() {
        let buttons = [];
        
        
        for (let i in this.state.list) {
            let item = this.state.list[i];
            
            buttons.push(
                <div className="row">
                    
                    <div className="col-sm-8">
                        <button onClick={() => this.props.socket.emit('load_doc', {
                            name:item,
                            appId:this.state.appId
                        })} className="btn btn-primary btn-block">{item}</button>
                    </div>
                    
                    <div className="col-sm-4">
                        <button onClick={() => this.props.socket.emit('delete_doc', item)}
                                className="btn btn-warning btn-block">x</button>
                    </div>
                    
                </div>
            )
            
        }
        
        
        return buttons;
    }
    
    render() {
        return (
            <div onClick={this.dropDown.bind(this)} className="btn btn-primary app_menu">
                ^
                <div className={this.state.show ? 'app_menu_drop_down':'hide'}>
                    
                    {/*doc name input*/}
                    <input type="text" onChange={this.handleInputChange.bind(this)}
                           value={this.state.saveInput} className="form-control"
                           ref={input => {this.saveInput = input;}} />
                    
                    {/*save button*/}
                    <button onClick={() => this.props.socket.emit('save_doc',
                        {id:this.state.appId,name:this.state.saveInput})}
                            className="btn btn-block btn-sm btn-success">save</button>
                    <hr/>
                    
                    {/*load saved doc buttons*/}
                    {this.savedButtons()}
                
                </div>
            </div>
        );
    }
}