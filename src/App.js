import { useState } from 'react';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 1, packed: true },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Away 🧳</h1>;
}

function Form() {
  const [description, setDesc] = useState('');
  const [quantity, setQuantity] = useState(1);

  function submitHandler(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    setDesc('');
    setQuantity(1);
    initialItems.push(newItem);
    console.log(newItem, initialItems);
  }

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What do you need for your 🥰 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%) </em>
    </footer>
  );
}

function Item({ item }) {
  return (
    <li key={item.id}>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

export default App;
