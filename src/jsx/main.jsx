import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function() {

    // square element
    class Square extends React.Component {
      render() {
        return <button className="square" onClick={ () => this.props.onClick()}>{this.props.value}</button>;
      }
    }

    // game board
    class Game extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
          nowX: true
        }
      }

      // X or O move
      handleClick(i) {
        const squares = this.state.squares.slice(); // use .slice() to copy existing squares array
        if (calculateWinner(squares) || squares[i]) {
          return; // block clicked element
        }
        squares[i] = this.state.nowX ? 'X' : 'O';
        this.setState({
          squares: squares,
          nowX: !this.state.nowX
        });
      }

      // create squares
      renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
      }

      render() {
        // info whose turn or who won
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner == "draw") {
          status = "It's a draw";
        } else if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Now player: ' + (this.state.nowX ? 'X' : 'O');
        }

        return (
          <div id="game">
            <div id="player-info">
              <h1>{status}</h1>
            </div>
            <div id="board">
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
          </div>
        );
      }
    }

    class App extends React.Component {
      render() {
        return (
          <div>
            <Game />
          </div>
        );
      }
    }

    ReactDOM.render(
      <App />,
      document.getElementById('app')
    );

    // check win or draw
    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      let checkDraw = 0;

      // check win
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }

      // check draw
      for (let i=0; i<squares.length; i++) {
        if (squares[i] !== null) {
          checkDraw++
        }
      }

      if (checkDraw == 9) {
        return 'draw';
      } else {
        return null;
      }
    }
});
