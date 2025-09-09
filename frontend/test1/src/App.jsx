import { useState } from "react";

function Card({ onBlankClick, board, index }) {
  function handleClick() {
    onBlankClick(index);
  }

  return (
    <div className="kan" onClick={handleClick}>
      {board[index]}
    </div>
  );
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState(true);

  function handleClick(index) {
    let divCon = turn ? "X" : "O";

    const nextBoard = board.map((item, i) => (i === index ? divCon : item));
    setBoard(nextBoard);
    setTurn(!turn);

    let winnerFlag = isPlayerWinning(nextBoard, divCon);
    console.log(winnerFlag);
    if (winnerFlag) {
      alert("now player win");
    }

    if (isGameEnd(nextBoard)) {
      alert("game ended");
    }
  }

  function isPlayerWinning(nextBoard, mark) {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // 가로
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // 세로
      [0, 4, 8],
      [2, 4, 6], // 대각선
    ];
    console.log(mark);

    return winPatterns.some((pattern) => {
      return pattern.every((index) => nextBoard[index] === mark);
    });

    for (const pattern of winPatterns) {
      let checkFlag = true;

      console.log(nextBoard);
      for (const i of pattern) {
        if (nextBoard[i] !== mark) {
          checkFlag = false;
        }
      }
      if (checkFlag) {
        return true;
      }
    }

    return false;
  }

  function isGameEnd(nextBoard) {
    return nextBoard.every((cell) => cell === "O" || cell === "X");
  }

  return (
    <>
      <div class="board-line">
        <Card onBlankClick={handleClick} board={board} index={0}></Card>
        <Card onBlankClick={handleClick} board={board} index={1}></Card>
        <Card onBlankClick={handleClick} board={board} index={2}></Card>
      </div>
      <div class="board-line">
        <Card onBlankClick={handleClick} board={board} index={3}></Card>
        <Card onBlankClick={handleClick} board={board} index={4}></Card>
        <Card onBlankClick={handleClick} board={board} index={5}></Card>
      </div>
      <div class="board-line">
        <Card onBlankClick={handleClick} board={board} index={6}></Card>
        <Card onBlankClick={handleClick} board={board} index={7}></Card>
        <Card onBlankClick={handleClick} board={board} index={8}></Card>
      </div>
    </>
  );
}

export default App;
