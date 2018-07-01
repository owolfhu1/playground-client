import React, { Component } from 'react';
import ConnectFourTile from "./ConnectFourTile";

export default class ConnectFourRow extends Component {
    render() {
        return (
            <tr>
                <ConnectFourTile value={this.props.row[0]}/>
                <ConnectFourTile value={this.props.row[1]}/>
                <ConnectFourTile value={this.props.row[2]}/>
                <ConnectFourTile value={this.props.row[3]}/>
                <ConnectFourTile value={this.props.row[4]}/>
                <ConnectFourTile value={this.props.row[5]}/>
                <ConnectFourTile value={this.props.row[6]}/>
            </tr>
        )
    }
}