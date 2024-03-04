import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const TaskCard = ({ task, onStateChange, onEditClick, onDeleteClick }) => {
  const handleStateChange = (event) => {
    const newState = event.target.value;
    onStateChange(task.id, newState);
  };

  return (
    <Card style={{ maxWidth: '400px', margin: 'auto' }}>
      <CardContent style={{ position: 'relative' }}>
        <Typography variant="h6">{task.text}</Typography>
        <Typography>{task.description}</Typography>
        <Typography>{task.deadline}</Typography>
        <FormControl style={{ position: 'absolute', bottom: '8px', right: '8px', minWidth: 'max-content' }}>
          <Select
            labelId={`state-label-${task.id}`}
            id={`state-select-${task.id}`}
            value={task.state}
            onChange={handleStateChange}
            defaultValue="TODO"
          >
            <MenuItem value="TODO">TODO</MenuItem>
            <MenuItem value="INPROGRESS">INPROGRESS</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={() => onEditClick(task)}>Edit</Button>
        <Button onClick={() => onDeleteClick(task.id)}>Delete</Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
