function Card({ name }) {
  return <div class="kan" onClick={cardClick}>{name}</div>;
}

function cardClick() {

}

function App() {
  return (
    <>
      <div class="board-line">
        <Card name="X"></Card>
        <Card name="X"></Card>
        <Card name="X"></Card>
      </div>

      <div class="board-line">
        <Card name="X"></Card>
        <Card name="X"></Card>
        <Card name={'Q'}></Card>
      </div>

      <div class="board-line">
        <Card name="X"></Card>
        <Card name="X"></Card>
        <Card name="X"></Card>
      </div>
    </>
  );
}

export default App;
