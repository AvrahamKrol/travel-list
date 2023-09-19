import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  function addItemHandler(newItem) {
    setItems((items) => [newItem, ...items]);
  }

  function deleteItemHandler(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    console.log(items);
  }

  function updateItemHandler(id, packedStatus) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: packedStatus } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItemHandler} />
      <PackingList
        items={items}
        onDeleteItem={deleteItemHandler}
        onUpdateItem={updateItemHandler}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Away 🧳</h1>;
}

function Form({ onAddItem }) {
  const [description, setDesc] = useState('');
  const [quantity, setQuantity] = useState(1);

  function submitHandler(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItem(newItem);
    setDesc('');
    setQuantity(1);
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

function PackingList({ items, onDeleteItem, onUpdateItem }) {
  return (
    <div className="list">
      {items.length > 0 ? (
        <ul>
          {items?.map((item) => (
            <Item
              key={item?.id}
              item={item}
              onUpdateItem={onUpdateItem}
              onDeleteItem={onDeleteItem}
            />
          ))}
        </ul>
      ) : (
        <p>empty list</p>
      )}
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

function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={(e) => {
          onUpdateItem(item.id, e.target.checked);
        }}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item?.id)}>❌</button>
    </li>
  );
}

export default App;
