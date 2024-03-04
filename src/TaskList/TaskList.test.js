import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from './TaskList';

const mockTasks = [
  { id: 1, text: 'Task 1', description: 'Description 1', deadline: '01-01-2023', state: 'TODO' },
  { id: 2, text: 'Task 2', description: 'Description 2', deadline: '02-02-2023', state: 'INPROGRESS' },
  { id: 3, text: 'Task 3', description: 'Description 3', deadline: '03-03-2023', state: 'DONE' },
];

const mockDeleteTask = jest.fn();
const mockSetTasks = jest.fn();

describe('TaskList Component', () => {
  it('renders task cards correctly', () => {
    render(<TaskList tasks={mockTasks} onDeleteTask={mockDeleteTask} setTasks={mockSetTasks} />);
    mockTasks.forEach((task) => {
      expect(screen.getByTestId(`task-card-${task.id}`)).toBeInTheDocument();
    });
  });

  it('opens edit modal when edit button is clicked', () => {
    render(<TaskList tasks={mockTasks} onDeleteTask={mockDeleteTask} setTasks={mockSetTasks} />);
    fireEvent.click(screen.getAllByTestId('edit-button')[0]);
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
  });

});
