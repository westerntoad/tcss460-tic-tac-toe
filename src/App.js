import { useState } from "react";

function Square({ value, onSquareClick, squareColor }) {
  return (
    <button
      style={{ backgroundColor: squareColor }}
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, squareColors }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner[0];
  } else if (squares.filter((x) => x == null).length == 0) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          squareColor={squareColors[0]}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          squareColor={squareColors[1]}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          squareColor={squareColors[2]}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          squareColor={squareColors[3]}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          squareColor={squareColors[4]}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          squareColor={squareColors[5]}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          squareColor={squareColors[6]}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          squareColor={squareColors[7]}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          squareColor={squareColors[8]}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [squareColors, setSquareColors] = useState(Array(9).fill("#ffffff"));
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function checkWinner(squares) {
    let nextSquareColors;
    if (calculateWinner(squares)) {
      nextSquareColors = squareColors.slice();
      for (const idx of calculateWinner(squares)[1]) {
        nextSquareColors[idx] = "#ffff00";
      }
    } else if (squares.filter((x) => x == null).length == 0) {
      nextSquareColors = Array(9).fill("#8888ff");
    } else {
      nextSquareColors = Array(9).fill("#ffffff");
    }
    setSquareColors(nextSquareColors);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    checkWinner(nextSquares);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    checkWinner(history[nextMove]);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          squareColors={squareColors}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
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
      return [squares[a], lines[i]];
    }
  }
  return null;
}
