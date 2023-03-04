
import React, { useState, useEffect } from 'react';
import './App.css';
import AddBook from './AddBook';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchBooks = () => {
    fetch('https://bookstore-34445-default-rtdb.firebaseio.com/books/.json')
      .then(response => response.json())
      .then(data => addKeys(data))
      .catch(err => console.log(err))
  }
  //Add keys into the books objects
  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) =>
      Object.defineProperty(item, 'id', { value: keys[index] }));
    setBooks(valueKeys)
  }

  const addBook = (newBook) => {
    fetch('https://bookstore-34445-default-rtdb.firebaseio.com/books/.json',
      {
        method: 'POST',
        body: JSON.stringify(newBook)
      })
      .then(response => fetchBooks())
      .catch(err => console.log(err))
  }

  const deleteBook = (id) => {
    fetch(`https://bookstore-34445-default-rtdb.firebaseio.com/books/${id}.json`,
      {
        method: 'DELETE',
      })
      .then(response => fetchBooks())
      .catch(err => console.log(err))
  }


  const columnDefs = [
    { field: 'title', filter: true, sortable: true },
    { field: 'author', filter: true, sortable: true },
    { field: 'year', filter: true, sortable: true },
    { field: 'isbn', filter: true, sortable: true },
    { field: 'price', filter: true, sortable: true },
    {
      headerName: '',
      field: 'id', cellRenderer: (params) =>
        <div>
          <IconButton color="secondary" size="small" onClick={() => deleteBook(params.value)}><DeleteIcon /></IconButton>
        </div>
    }
  ]

  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' noWrap>
            Booklist
          </Typography>
        </Toolbar>

      </AppBar>
      <AddBook addBook={addBook} />
      <div className="ag-theme-material" style={{ height: 700, margin: 'auto', paddingTop: 30, width: 1200 }}>
        <AgGridReact rowData={books} columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;