import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from './TaskCard';

const mockTask = { id: 1, text: 'Task 1', description: 'Description 1', deadline: '2022-12-31' };

test('renders TaskCard component with task details', () => {
  render(<TaskCard task={mockTask} />);
  const taskElement = screen.getByText(/Task 1/i);
  const descriptionElement = screen.getByText(/Description 1/i);
  const deadlineElement = screen.getByText(/2022-12-31/i);

  expect(taskElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
  expect(deadlineElement).toBeInTheDocument();
});

test('calls onEditClick when edit button is clicked', () => {
  const mockOnEditClick = jest.fn();
  render(<TaskCard task={mockTask} onEditClick={mockOnEditClick} />);
  const editButton = screen.getByText(/Edit/i);
  fireEvent.click(editButton);

  expect(mockOnEditClick).toHaveBeenCalledWith(mockTask);
});
