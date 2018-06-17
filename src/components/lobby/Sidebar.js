import React, { Component } from 'react';
import OnlineList from "./sidebar/OnlineList";


export default class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socket : this.props.socket,
        };



    }



    render() {
        return (
            <div className="well sidebar">
                <OnlineList socket={this.state.socket}/>
                <div className="well otherSideBar">
                    <h3>TODO</h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque in sagittis lacus. In id hendrerit felis, et varius tellus.
                    Curabitur sed vestibulum ipsum.
                    Ut hendrerit diam vel lacus aliquet, vitae iaculis leo maximus.
                    Vestibulum quis gravida odio.
                    Fusce erat purus, feugiat vitae gravida ut, gravida et lectus.
                    Duis imperdiet nec orci at rhoncus.
                </div>
            </div>
        )
    }


}