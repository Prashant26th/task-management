import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  TextareaAutosize,
  Button as DialogButton,
  Grid,
} from '@mui/material';
import TaskList from './TaskList/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []); 

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); 


  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const isDateValid = (date) => {
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    return dateRegex.test(date);
  };

  const handleModalAddTask = () => {
    if (newTask.trim() !== '' && newTaskDescription.trim() !== '' && isDateValid(newTaskDeadline)) {
      setTasks([...tasks, { id: Date.now(), text: newTask, description: newTaskDescription, deadline: newTaskDeadline }]);
      setNewTask('');
      setNewTaskDescription('');
      setNewTaskDeadline('');
      setIsModalOpen(false);
    }
  };

  const handleCancelAddTask = () => {
    setNewTask('');
    setNewTaskDescription('');
    setNewTaskDeadline('');
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management App
          </Typography>
          <Button color="inherit" sx={{ backgroundColor: 'blue' }} onClick={handleAddTask}>
            Add Task
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <div>
          <Dialog open={isModalOpen} onClose={handleCancelAddTask}>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name of Task"
                    fullWidth
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    multiline
                    rows={3}
                    fullWidth
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Deadline Date (dd-mm-yyyy)"
                    fullWidth
                    value={newTaskDeadline}
                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogButton onClick={handleModalAddTask}>Add</DialogButton>
            <DialogButton onClick={handleCancelAddTask}>Cancel</DialogButton>
          </Dialog>
        </div>
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} setTasks={setTasks}/>
      </Container>
    </div>
  );
};

export default App;
