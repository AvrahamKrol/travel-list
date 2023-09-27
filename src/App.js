import { useState } from 'react';
import Logo from './components/Logo/Logo';
import Form from './components/Form/Form';
import PackingList from './components/PackingList/PackingList';
import Stats from './components/Stats/Stats';

function App() {
  const [items, setItems] = useState([]);

  function addItemHandler(newItem) {
    setItems((items) => [newItem, ...items]);
  }

  function deleteItemHandler(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function updateItemHandler(id, packedStatus) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: packedStatus } : item
      )
    );
  }

  function clearItemsHandler() {
    const confirmed = window.confirm(
      'Are you sure you want to delete all items?'
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItemHandler} />
      <PackingList
        items={items}
        onClearItems={clearItemsHandler}
        onDeleteItem={deleteItemHandler}
        onUpdateItem={updateItemHandler}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
