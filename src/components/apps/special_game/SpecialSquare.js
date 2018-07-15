import React, {Component} from 'react';



export default class SpecialSquare extends Component {
    
    render() {
        return (
            <button style={{
                height: '30px',
                width: '30px',
                border: 'solid black 1px',
                borderRadius : '4px',
                margin: '2px',
                padding: 'auto',
                
            }} onClick={() => this.props.gameSocket.emit('move', this.props.spot)}>
                {this.props.value}
            </button>
        );
    }
    
}