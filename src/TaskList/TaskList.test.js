// src/TaskList.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

test('renders TaskList component with initial tasks', () => {
  jest.spyOn(global.Storage.prototype, 'getItem').mockReturnValue(JSON.stringify([{ id: 1, text: 'Task 1' }]));

  render(<TaskList />);
  const taskElement = screen.getByText(/Task 1/i);
  expect(taskElement).toBeInTheDocument();
});

test('adds a new task on button click', () => {
  render(<TaskList />);
  const addButton = screen.getByText(/Add Task/i);
  fireEvent.click(addButton);

  const newTaskElement = screen.getByText(/New Task/i);
  expect(newTaskElement).toBeInTheDocument();
});
