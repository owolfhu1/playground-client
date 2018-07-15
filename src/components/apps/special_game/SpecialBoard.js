import React, {Component} from 'react';
import SpecialSquare from "./SpecialSquare";



export default class SpecialBoard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            board : [],
        };
        
        this.props.gameSocket.on('update'+this.props.gameId, board => {
            
            let grid = [];
            
            let name = (x,y) => {
                for (let i in board.players)
                    if (board.players[i].x === x && board.players[i].y === y)
                        return i;
                return null;
            };
            
            for (let y = 0; y < 12; y++){
                for (let x = 0; x < 8; x++) {
                    let name = this.playerAtSpot(board,{x,y});
                    grid.push(<SpecialSquare spot={{x,y}} gameSocket={this.props.gameSocket} value={name ? name.substr(0,2) : board.board[y][x].points}/>)
                }
                grid.push(<br/>);
            }
            
            this.setState({board:grid});
            
        });
        
    }
    
    playerAtSpot(board,spot){
        let atSpot = false;
        for (let player in board.players)
            atSpot = board.players[player].x === spot.x
            && board.players[player].y === spot.y ? player : atSpot;
        return atSpot;
    };
    
    render() {
        return (
            <div style={{
                border: 'solid black 1px',
                borderRadius : '4px',
                margin: '2px',
                padding: 'auto',
                background : this.props.color,
                
            }}>
                {this.state.board}
            </div>
        );
    }
    
    
}