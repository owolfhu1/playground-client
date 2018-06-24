import React, { Component } from 'react';

//makes a card from props
export default class Card extends Component {

    //suits: ♣ ♥ ♦ ♠ (copy from here to use)
    //example: <Card h={40} s={'♠'} v={'7'}/>
    render() {
        return (
            <div>


                <div className="card-window" style={{
                    width:this.props.h*.75+'px',
                    height:this.props.h+'px',
                    fontSize : this.props.h/4 +'px',
                    color : 'black',
                    borderRadius : this.props.h/15+'px'
                }}>
                    <span className="card-top">{this.props.v}</span>
                    <span className="card-bottom">{this.props.v}</span>
                    <span style={{
                        color : (this.props.s === '♣' || this.props.s === '♠') ? 'black' : 'red',
                        fontSize:this.props.h/2+'px',
                        right:  this.props.s === '♣' ? '29%' :
                                this.props.s === '♥' ? '30%' :
                                this.props.s === '♠' ? '33%' : '34%'
                    }} className="suit-box">{this.props.s}</span>
                </div>
            </div>
        )
    }

}