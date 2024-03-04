import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, Button } from '@mui/material'; // Ensure DialogActions is imported

const TaskList = ({ tasks, onDeleteTask, setTasks }) => {
  const [editTask, setEditTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');
  const [editedTaskDescription, setEditedTaskDescription] = useState('');
  const [editedTaskDeadline, setEditedTaskDeadline] = useState('');

  const handleEditClick = (task) => {
    setEditTask(task);
    setEditedTaskName(task.text);
    setEditedTaskDescription(task.description);
    setEditedTaskDeadline(task.deadline);
  };

  const handleEditSave = () => {
    if (editTask) {
      const editedTaskIndex = tasks.findIndex((task) => task.id === editTask.id);

      if (editedTaskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editedTaskIndex] = {
          ...editTask,
          text: editedTaskName,
          description: editedTaskDescription,
          deadline: editedTaskDeadline,
        };

        setEditTask(null);
        setEditedTaskName('');
        setEditedTaskDescription('');
        setEditedTaskDeadline('');
        setTasks(updatedTasks);
      }
    }
  };

  const handleEditCancel = () => {
    setEditTask(null);
  };

  const handleStateChange = (taskId, newState) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, state: newState } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteClick = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={{ position: 'relative', marginBottom: '16px' }}>
          <TaskCard
            task={task}
            onStateChange={handleStateChange}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      ))}
      <Dialog open={Boolean(editTask)} onClose={handleEditCancel}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name of Task"
                fullWidth
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                value={editedTaskDescription}
                onChange={(e) => setEditedTaskDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Deadline Date (dd-mm-yyyy)"
                fullWidth
                value={editedTaskDeadline}
                onChange={(e) => setEditedTaskDeadline(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditSave}>Save</Button>
          <Button onClick={handleEditCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskList;
