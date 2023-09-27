import { useState } from 'react';

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

export default Form;
