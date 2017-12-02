import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function() {

    class Square extends React.Component {
      handleClick = () => {
        this.props.onClick();
      }

      render() {
        return <button className="square" onClick={this.handleClick}>{this.props.value}</button>;
      }
    }

    class Board extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
          nowX: true
        }
      }

      handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.nowX ? 'X' : 'O';
        this.setState({
          squares: squares,
          nowX: !this.state.nowX
        });
      }

      renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
      }

      render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.nowX ? 'X' : 'O');
        }

        return (
          <div>
            <div id="player-info">
              <h1>{status}</h1>
            </div>
            <div id="board">
              <div className="board-row">
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
              </div>
              <div className="board-row">
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                {this.renderSquare(6)}
              </div>
              <div className="board-row">
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                {this.renderSquare(9)}
              </div>
            </div>
          </div>
        );
      }
    }

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
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }

    class Game extends React.Component {

    }

    class App extends React.Component {
      render() {
        return (
          <div>
            <Board />
          </div>
        );
      }
    }


    ReactDOM.render(
      <App />,
      document.getElementById('app')
    );
});
