import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function AddItem({ onAddItem }) {
  return (
    <>
      <input placeholder="Buy milk"></input>
      <button onClick={onAddItem}>Add Item</button>
    </>);
}

function TodoItem({ itemName, onDeleteItem }) {
  function DeleteButton() {
    return <button onClick={() => onDeleteItem(this)}>X</button>;
  }

  return (<li>{itemName} <DeleteButton /></li>);
}

function App() {
  const [todoItems, setTodoItems] = useState([]);

  function handleDeleteItem(item) {
    const updatedTodoItems = todoItems.filter((val) => {return val != item;});
    setTodoItems(updatedTodoItems);
  }

  function handleAddItem(itemName) {
    const updatedTodoItems = todoItems.slice();
    updatedTodoItems.push(<TodoItem itemName={itemName} onDeleteItem={(item) => handleDeleteItem(item)} />);
    setTodoItems(updatedTodoItems);
  }

  return (
    <div className="App">
      <h1>TODO</h1>
      <ul>
        {todoItems}
      </ul>
      <AddItem onAddItem={handleAddItem} />
    </div>
  );
}

export default App;
