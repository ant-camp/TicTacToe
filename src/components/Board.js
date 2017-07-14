import React, { Component } from 'react';
import OSymbol from '../symbols/OSymbol';
import BlankSymbol from '../symbols/BlankSymbol';
import XSymbol from '../symbols/XSymbol';
import { X, O } from '../symbols/symbols';
import { addSymbol, restartGame } from '../actions/actions';
import { connect } from 'react-redux';


class Board extends Component {
  //add symbol
  addSymbol (rowIndex, position, symbol) {
    !this.props.won && this.props.addSymbol(rowIndex, position, symbol);
  }
  //get symbol
  getSymbol(rowIndex, position, symbol) {
    if (symbol === X) {
      return <XSymbol key={position} position={position} />;
    }else if (symbol === O) {
      return <OSymbol key={position} position={position} />;
    }else {
    return <BlankSymbol key={position} addSymbol={this.addSymbol.bind(this, rowIndex, position)} turn={this.props.turn} />;
  }
}

  render() {
    const wonClass   = this.props.won ? ` won-${this.props.wonLine}` : '';
    const drawClass  = this.props.draw ? ' draw' : '';
    const boardClass = 'board' + wonClass + drawClass;
    return (
      <div className={boardClass}>
        {
          Object.keys(this.props.board)
            .map(rowIndex => {
              return (
                <div className={`row row${rowIndex}`} key={rowIndex}>
                  {
                    this.props.board[rowIndex].map((symbol, positon) => {
                      return this.getSymbol(rowIndex, positon, symbol);
                    })
                  }
                </div>
              );
            })
        }
        {
         this.props.won || this.props.draw ?
         <p className="restartGame" onClick={this.props.restartGame}>
           Click here to start new game.
         </p> : false
       }
       <h4>Score</h4>

       <p>Player X:{ this.props.xWins} Wins </p> <p>Player O: {this.props.oWins} Wins</p>
      </div>
    );
  }
}

//Board Property types
Board.propTypes = {
  board: React.PropTypes.object.isRequired,
  turn: React.PropTypes.string.isRequired,
  won: React.PropTypes.string,
  draw: React.PropTypes.bool.isRequired,
  wonLine: React.PropTypes.string,
  addSymbol: React.PropTypes.func.isRequired,
  restartGame: React.PropTypes.func.isRequired,
  xWins: React.PropTypes.number,
  oWins: React.PropTypes.number
};

export default connect(
  ({board, turn, won, draw, wonLine,xWins,oWins}) => ({
    board, turn, won, draw, wonLine,xWins,oWins
  }),
  (dispatch) => {
    return {
      addSymbol (rowIndex, position, symbol) {
        dispatch(addSymbol(rowIndex, position, symbol));
      },
      restartGame () {
        dispatch(restartGame());
      }
    };
  }
)(Board);


export {Board as GameBoard};
