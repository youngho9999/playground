function Card({ name }) {
  return <div class="kan">{name}</div>;
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
        <Card name="X"></Card>
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
