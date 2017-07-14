import { X, O } from '../symbols/symbols';
import { resultForSymbol } from '../GameLogic';
import * as _ from 'lodash';

export const initialState = {
  board: {
    0: ['', '', ''],
    1: ['', '', ''],
    2: ['', '', '']
  },
  won: undefined,
  wonLine: undefined,
  draw: false,
  turn: O,
  xWins:0,
  oWins: 0
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SYMBOL':
      const {symbol, row, position} = action;
      const newState = _.cloneDeep(state);
      newState.board[row][position] = symbol;

      const xResult = resultForSymbol(X, newState.board);
      const oResult = resultForSymbol(O, newState.board);

      if (xResult.won) {
        newState.won = X;
        newState.wonLine = xResult.line;
        newState.xWins++
      }

      if (oResult.won) {
        newState.won = O;
        newState.wonLine = oResult.line;
        newState.oWins++

      }

      if (!newState.won) {
        newState.turn = newState.turn === O ? X : O;
      }

      const boardIsFull = [
        ...newState.board[0],
        ...newState.board[1],
        ...newState.board[2]
      ]
        .filter(symbol => symbol !== '')
        .length === 9;

      if (boardIsFull && !newState.won) {
        newState.draw = true;
      }

      return newState;
    case 'RESTART_GAME':
    console.log({...initialState,
          xWins:state.xWins,
          yWins:state.yWins
        });
      return {...initialState,
            xWins:state.xWins,
            oWins:state.oWins
            };
    default:
      return state;
  }
};
