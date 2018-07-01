import React, { Component } from 'react';

export default class ConnectFourInputRow extends Component {
    render() {
        return (
            <table>
                <tr>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:0})}>drop</button></td>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:1})}>drop</button></td>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:2})}>drop</button></td>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:3})}>drop</button></td>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:4})}>drop</button></td>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:5})}>drop</button></td>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:6})}>drop</button></td>
                </tr>
            </table>
        )
    }

}