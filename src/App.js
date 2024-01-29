import './App.css';
import { useState } from 'react';
import { Button, IconButton, Input } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function AddItem({ onAddItem }) {
  const [itemName, setItemName] = useState('');

  function handleItemNameChange(e) {
    setItemName(e.target.value);
  }

  function handleSubmit() {
    onAddItem(itemName);
  }

  return (
    <div className="AddItem">
      <Input placeholder="Buy milk" onChange={handleItemNameChange} />
      <Button onClick={handleSubmit}>Add Item</Button>
    </div>);
}

function TodoItem({ todo, onDeleteItem }) {
  function DeleteButton() {
    return (
      <IconButton color="inherit"
                  className="DeleteButtton" 
                  onClick={() => onDeleteItem(todo.id)} 
                  aria-label="delete">
        <DeleteOutlineOutlinedIcon />
      </IconButton>);
  }

  return (<li key={todo.id} className="TodoItem">{todo.name}<DeleteButton /></li>);
}

let idCounter = 0;
class Todo {

  constructor(name) {
    this.name = name;
    this.id = idCounter++;
  }
}

function App() {
  const [todos, setTodos] = useState([]);

  function handleDeleteItem(id) {
    const updatedTodos = todos.filter((todo) => {return id !== todo.id;});
    setTodos(updatedTodos);
  }

  function handleAddItem(itemName) {
    const updatedTodos = todos.slice();
    updatedTodos.push(new Todo(itemName));
    setTodos(updatedTodos);
  }

  const todoItems = todos.map((todo) => <TodoItem todo={todo} onDeleteItem={handleDeleteItem} />);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <h1>TODO</h1>
        <ul>
          {todoItems}
        </ul>
        <AddItem onAddItem={handleAddItem} />
      </div>
    </ThemeProvider>
  );
}

export default App;
