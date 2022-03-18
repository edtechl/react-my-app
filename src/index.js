import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
See here:
https://reactjs.org/tutorial/tutorial.html

If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game which are listed in order of increasing difficulty:

1. Display the location for each move in the format (col, row) in the move history list.
2. Bold the currently selected item in the move list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.
*/

// converted to function component Square below
// class Square extends React.Component {
//     // not used. Lifted state up from Square component to Board component to enable determinating the winner
//     constructor(props) {
//         super(props);
//         this.state = {
//             squares: null,
//         };
//     }
//     render() {
//       return (
//         <button 
//             className="square"
//             // calls the onClick handler passed in by the Board class as well as
//             // receiving values from the Board class, making it a controlled component
//             // of the Board component
//            // changed this.setState({value: 'X'}) to this.props.onClick() to use Board component's onClick state
//             onClick = { () => { this.props.onClick(); } }
//         >
//            //   changed this.state.value to this.props.value to use Board component's value state
//           { this.props.value }
//         </button>
//       );
//     }
//   }

// class components can be converted to function components if they don't have a state
// and only contain a render() method
// change class Square extends React.Component to function Square(props)
function Square(props) {
    //return jsx description (see https://babeljs.io/repl to see js conversion)
    return (
        <button 
            className="square"
            // calls the onClick handler passed in by the Board class as well as
            // receiving values from the Board class, making it a controlled component
            // of the Board component
            // change this.props to props: see below
            // change () => { props.onClick(); } to props.onClick
            // (possible because it is expecting a function and automatically invokes it, i.e.
            // it runs props.onClick() )
            // as part of state lift from Square component to Board component,
            // it now references the props passed down by Board component
            onClick = { props.onClick }
            // onClick = { () => { console.log("test")} }
        >
        { props.value }
        </button>
    );
}
  
  class Board extends React.Component {
      // Lifted from Square component to enable determining the winner
      // Now Lifted state up from Board component to Game component to enable tracking moves history
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     };
    // }

    // moved to Game component as part of state lift from Board component
    // handleClick(i) {
    //     // shallow copy of squares array to maintain immutability
    //     const squares = this.state.squares.slice();
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //     }
    //     //const squares = Object.assign({}, this.state.squares, {i: 'X'}); // alternative shallow copy
    //     //const squares = {...this.state.squares, i: 'X'} // object spread syntax
    //     squares[i] = this.state.xIsNext? 'X': 'O';
    //     // will automatically update/re-render all of the child components (Squares) inside this state (Board) too
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.state.xIsNext, //flip the state, evaluates to the opposite of the current value
    //     });
    // };

    renderSquare(i) {
        // change this.state.squares[i] to this.props.squares[i] as part of state lift from Board component
        // change this.handleClick(i) to this.props.onClick(i) as part of state lift from Board component
      return (
        // Changed empty <Square /> to below as part of state lift from Square component to Board component
        <Square
            value = { this.props.squares[i] }
            onClick = { () => this.props.onClick(i) }
        />
      );
    }
  
    render() {
        // constants cannot evaluate expressions, therefore ',' cannot be used as it
        // evaluates each expression and returns the value of the rightmost expression
        // e.g. (a, b, a+b) = a+b
        // the ternary expression must be put in parentheses because we want it
        // evaluated first and the result of that to be concaternated to the string
        // const status = 'Next player: ' + (this.state.xIsNext? 'X': 'O');

        // moved to Game component as part of state lift from Board component
        // const winner = calculateWinner(this.state.squares);
        // let status; //status = null
        // if (winner) {
        //     status = 'Winner: ' + winner;
        // } else {
        //     status = 'Next player: ' + (this.state.xIsNext? 'X': 'O');
        // }
  
      return (
        <div>
            {/* moved to Game component as part of state lift from Board component*/}
          {/* <div className="status">{status}</div> */}
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
      // Lifted from Board component to enable tracking of moves history
      constructor(props) {
          super(props);
          this.state = {
              // changed from squares: Array(9).fill(null), as part of state lift from Board component
            history:[{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
          }
      }

      handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        // shallow copy of squares array to maintain immutability
        // change this.state.squares.slice(); to current.squares.slice(); as part of state lift from Board component
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        //const squares = Object.assign({}, this.state.squares, {i: 'X'}); // alternative shallow copy
        //const squares = {...this.state.squares, i: 'X'} // object spread syntax
        squares[i] = this.state.xIsNext? 'X': 'O';
        // will automatically update/re-render all of the child components (Squares) inside this state (Board) too
        this.setState({
            // changed from squares: squares, as part of state lift from Board component
            history: history.concat({
                squares: squares,
            }),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext, //flip the state, evaluates to the opposite of the current value
        });
      };

      jumpTo(step) {
          // react merges the state, or in more simple words, updates the props mentioned in setState,
          // leaving the remaining state as is
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
      }
    
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const currentMove = (
            <li key='currentMove'>
                <button onClick={() => this.jumpTo(history.length-1)}>{'Go to current move'}</button>
            </li>
        );
        // changed from this.state.squares to current.squares as part of state lift from Board component
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move:
                'Go to game start';
            return (
                // key is required to re-render components when they are changed
                <li key={move}>
                    <button onClick={() => this.jumpTo(move) }>{desc}</button>
                </li>
            );
        });

        let status; //status = null
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext? 'X': 'O');
        }
      return (
        <div className="game">
          <div className="game-board">
            {/* Changed empty <Board /> to below as part of state lift from Board component */}
            <Board
                squares = { current.squares }
                onClick = { (i) => this.handleClick(i) }
            />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <div>{ currentMove }</div>
            <ol>{ moves }</ol>
          </div>
        </div>
      );
    }
  }

  // no changes needed here when lifting
  function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]; //unpack the array into three separate variables
        //use === for strict equality comparison, so it also checks that the types are the same
        //checks if all squares have the same player who made the move ('X', 'O', or null)
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  