import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { useTranslation } from 'react-i18next';

import { Delete, Edit, Add } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const {t} = useTranslation();

  const [openDialog, setOpenDialog] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  const [todos, setTodos] = useState([
    { id: 1, text: "Buy groceries" },
    { id: 2, text: "Walk the dog" },
    { id: 3, text: "Clean the house" },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedTodos = getStoredTodos();
    if (storedTodos) {
      setTodos(storedTodos);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveTodos(todos);
    }
  }, [todos, isLoading]);
 
  const getStoredTodos = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedTodos = localStorage.getItem("todos");
      console.log("getsortedtodo",getStoredTodos);
      return storedTodos ? JSON.parse(storedTodos) : null;
      
    }
    return [];
  };

  const saveTodos = (todosToSave) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("todos", JSON.stringify(todosToSave));
    }
    console.log("localstorage", localStorage.getItem("todos"));
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditTodoId(id);
    setEditTodoText(todoToEdit.text);
    setOpenDialog(true);
  };

  const handleEditTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editTodoId) {
        return { ...todo, text: editTodoText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditTodoText("");
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleCreateTodo = () => {
    const newTodo = {
      id: uuidv4(),
      text: newTodoText,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setNewTodoText("");
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditTodoText(null),
    setEditTodoId(null)
  };

  const handleTodoTextChange = (event) => {
    setNewTodoText(event.target.value);
  };

  const handleEditTodoTextChange = (event) => {
    setEditTodoText(event.target.value);
  };

  return (
    <div>
      <Stack
        sx={{
          minWidth: "350px",
          backgroundColor: "#f2f2f2",
          borderRadius: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box sx={{ backgroundColor: "#b7b7b7" }}>
          <Typography variant="h4">{t('Todos')}</Typography>
        </Box>
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              <ListItemText primary={todo.text} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(todo.id)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(todo.id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Stack>
      <IconButton  onClick={handleOpenDialog}>
        <Add />
        Add todo
      </IconButton>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editTodoId ? "Edit Todo" : "Create Todo"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Todo"
            fullWidth
            value={editTodoText || newTodoText}
            onChange={
              editTodoId ? handleEditTodoTextChange : handleTodoTextChange
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {editTodoId ? (
            <Button onClick={handleEditTodo} disabled={!editTodoText}>
              Save
            </Button>
          ) : (
            <Button onClick={handleCreateTodo} disabled={!newTodoText}>
              Create
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoList;
