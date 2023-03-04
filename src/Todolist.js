import './App.css';
import { useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';


function Todolist() {
  const [todo, setTodo] = useState({ description: '', date: '', status: '' });
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  }


  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({ description: '', date: '', status: '' });
  }


  const columnDefs = [
    { field: 'description', suppressMovable: true, sortable: true, filter: true },
    { field: 'date', suppressMovable: true, sortable: true, filter: true },
    { field: 'status', suppressMovable: true, sortable: true, filter: true}
  ]

  

  return (
    <div className="App">
      <input placeholder="Description" name="description" value={todo.description} onChange={inputChanged} />
      <input placeholder="Date" name="date" value={todo.date} onChange={inputChanged} />
      <input placeholder="Status" name="status" value={todo.status} onChange={inputChanged} />
      <AwesomeButton type="primary" onPress={addTodo}>Add</AwesomeButton>
      <div className="ag-theme-material" style={{ height: 600, width: 600, margin: 'auto' }} >
        <AgGridReact
          rowData={todos} columnDefs={columnDefs} animateRows={true} >
        </AgGridReact>
      </div>
    </div>
  );
}

export default Todolist;