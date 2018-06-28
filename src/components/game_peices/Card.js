import React, { Component } from 'react';

//makes a card from props: h(height), s(suit), v(value), x(exposed)
//suits: ♣ ♥ ♦ ♠ (copy from here to use)
//example: <Card h={100} s={'♥'} v={'6'} x={true}/>
export default class Card extends Component {

    static cardBack() {
        let htmlCollection = [];

        let randomColor = () => {
            let letters = '0123456789ABCDEF';
            let c = '#';
            for (let i = 0; i < 6; i++) {
                c += letters[Math.floor(Math.random() * 16)];
            }
            return c;
        };

        for (let i = 0; i < 70; i++) {
            //let color = i % 2 === 0 ? 'red' : 'black';
            let color = randomColor();
            let suit =  i % 4 === 0 ? '♣' :
                        i % 4 === 1 ? '♥' :
                        i % 4 === 2 ? '♠' : '♦';
            htmlCollection.push(<span style={{color}} >{suit} </span>);
        }
        return (
            <div>
                {htmlCollection}
            </div>
        )
    }

    cardFront() {
        return (
            <div>
                <span className="card-top">{this.props.card.v}{this.props.card.s}</span>
                <span className="card-bottom">{this.props.card.s}{this.props.card.v}</span>
                <span style={{
                    color: (this.props.card.s === '♣' || this.props.card.s === '♠') ? 'black' : 'red',
                    fontSize: this.props.h / 2 + 'px',
                    right: this.props.card.s === '♣' ? '29%' :
                        this.props.card.s === '♥' ? '30%' :
                            this.props.card.s === '♠' ? '33%' : '34%'
                }} className="suit-box">{this.props.card.s}</span>
            </div>
        )
    }

    render() {
        return (
            <div className="card-window" style={{
                width: this.props.h * .75 + 'px',
                height: this.props.h + 'px',
                fontSize: this.props.h / (this.props.show ? 5 : 8) + 'px',
                color: 'black',
                borderRadius: this.props.h / 20 + 'px',
                lineHeight : this.props.show ? 'normal' : '80%',
                top:this.props.position.y,
                left:this.props.position.x,
            }}>
                {this.props.show ? this.cardFront() : Card.cardBack()}
            </div>
        )
    }

}