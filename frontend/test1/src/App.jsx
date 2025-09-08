import { useState } from "react";

function Card({ onBlankClick, board, index }) {
  function handleClick(index) {
    onBlankClick(index);
    console.log(index);
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
    setBoard(board.map((item, i) => (i === index ? divCon : item)));

    setTurn(!turn);
  }

  return (
    <>
      <div class="board-line">
        <Card onBlankClick={handleClick} board={board} index={0}></Card>
        <Card onBlankClick={handleClick} board={board} index={1}></Card>
      </div>
    </>
  );
}

export default App;
