import React, { Component } from 'react';

export default class ConnectFourTile extends Component {

    render() {
        return (
            <td>
                <button className="connect_4_button" style={{
                    background : this.props.value > 0 ? 'red' : this.props.value < 0 ? 'yellow' : 'transparent'
                }} disabled> </button>
            </td>
        )
    }
}