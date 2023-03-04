import React, { useState } from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const AddBook = (props) => {
    const [open, setOpen] = useState(false)
    const [book, setBook] = useState({ title: '', author: '', year: '', isbn: '', price: '' })

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = () => {
        props.addBook(book);
        handleClose()
    }

    const inputChanged = (event) => {
        setBook({ ...book, [event.target.name]: [event.target.value] })
    }


    return (
        <div>
            <Button variant='outlined' color='primary' onClick={handleOpen}>
                Add Book
            </Button>
            <Dialog open={open}>
                <DialogTitle>New Book</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" id="standard-basic" variant="standard" placeholder="Title" name="title" value={book.title} onChange={inputChanged} fullWidth></TextField>
                    <TextField margin="dense" id="standard-basic" variant="standard" placeholder="Author" name="author" value={book.author} onChange={inputChanged} fullWidth></TextField>
                    <TextField margin="dense" id="standard-basic" variant="standard" placeholder="Year" name="year" value={book.year} onChange={inputChanged} fullWidth></TextField>
                    <TextField margin="dense" id="standard-basic" variant="standard" placeholder="Isbn" name="isbn" value={book.isbn} onChange={inputChanged} fullWidth></TextField>
                    <TextField margin="dense" id="standard-basic" variant="standard" placeholder="Price" name="price" value={book.price} onChange={inputChanged} fullWidth></TextField>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>

                </DialogActions>
            </Dialog>

        </div>
    )
}

export default AddBook;