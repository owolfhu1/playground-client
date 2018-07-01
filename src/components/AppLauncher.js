import React, { Component } from 'react';
import Chat from "./apps/Chat";
import SharedDoc from "./apps/SharedDoc";
import ConnectFour from "./apps/ConnectFour";

export default class AppLauncher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket : this.props.socket,
            list : [],
        };

        //pushes component to list
        this.state.socket.on('launch', appJSON => {
            let list = this.state.list;
            switch (appJSON.type) {
                case 'chat' :
                    list.push(<Chat appJSON={appJSON} index={list.length} socket={this.state.socket}/>);
                    break;
                case 'doc' :
                    list.push(<SharedDoc appJSON={appJSON} index={list.length} socket={this.state.socket}/>);
                    break;
                case 'con_4' :
                    list.push(<ConnectFour appJSON={appJSON} index={list.length} socket={this.state.socket}/>);
                    break;
                //new apps added here

            }
            this.setState({list});
        });

        //removes component from list
        this.state.socket.on('close', index => {
            let list = this.state.list;
            delete list[index];
            this.setState({list});
        });

    }

    render() {
        return (
            <div>
                {this.state.list}
            </div>
        )
    }

}