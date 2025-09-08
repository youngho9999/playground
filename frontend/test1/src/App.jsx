import { useState } from "react";

function Card({ index, turn, setTurn }) {
  const [sym, setSym] = useState("");

  function cardClick() {
    let turnSym = turn ? "X" : "O";
    setSym(turnSym);
    setTurn(!turn);
  }

  return (
    <div className="kan" onClick={cardClick}>
      {sym}
    </div>
  );
}

function App() {
  const [turn, setTurn] = useState(true);

  return (
    <>
      <div class="board-line">
        <Card index={0} turn={turn} setTurn={setTurn}></Card>
        <Card index ={1}turn={turn} setTurn={setTurn}></Card>
        <Card index ={2}turn={turn} setTurn={setTurn}></Card>
      </div>

      <div class="board-line">
        <Card index = {3}turn={turn} setTurn={setTurn}></Card>
        <Card index = {4}turn={turn} setTurn={setTurn}></Card>
        <Card index = {5}turn={turn} setTurn={setTurn}></Card>
      </div>
      <div class="board-line">
        <Card index = {6}turn={turn} setTurn={setTurn}></Card>
        <Card index = {7}turn={turn} setTurn={setTurn}></Card>
        <Card index = {8}turn={turn} setTurn={setTurn}></Card>
      </div>
    </>
  );
}

export default App;
