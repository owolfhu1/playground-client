import React, { Component } from 'react';

export default class ConnectFourInputRow extends Component {
    render() {
        return (
            <table>
                <tr>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:0})}> </button></td>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:1})}> </button></td>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:2})}> </button></td>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:3})}> </button></td>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:4})}> </button></td>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:5})}> </button></td>
                    <td><button className="connect_4_button" onClick={()=>this.props.socket.emit('drop_chip',{id:this.props.id,move:6})}> </button></td>
                </tr>
            </table>
        )
    }

}