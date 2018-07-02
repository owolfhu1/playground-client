import React, { Component } from 'react';
import ConnectFourRow from "./ConnectFourRow";

export default class ConnectFourBoard extends Component {
    render() {
        return (
            <table>
                <ConnectFourRow row={this.props.board[0]}/>
                <ConnectFourRow row={this.props.board[1]}/>
                <ConnectFourRow row={this.props.board[2]}/>
                <ConnectFourRow row={this.props.board[3]}/>
                <ConnectFourRow row={this.props.board[4]}/>
                <ConnectFourRow row={this.props.board[5]}/>
            </table>
        )
    }

}