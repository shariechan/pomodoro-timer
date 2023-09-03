import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('<App /> tests', () => {

  it('starts the timer and logs the activity when "Start" is clicked', async () => {
    render(<App />);
    const startButton = screen.getByText('Start');

    await act(async () => {
      userEvent.click(startButton);
    });

    expect(screen.getByText('Stop')).toBeInTheDocument();
    expect(screen.getByText(/Starting work session at/)).toBeInTheDocument();
  });

  it('adjusts the session and break lengths', async () => {
    render(<App />);

    const sessionMinusButton = screen.getByTestId('session-decrement');
    const sessionPlusButton = screen.getByTestId('session-increment');

    await act(async () => {
      userEvent.click(sessionPlusButton);
    });

    expect(screen.getByText('Session Length: 26 min')).toBeInTheDocument();

    await act(async () => {
      userEvent.click(sessionMinusButton);
    });

    expect(screen.getByText('Session Length: 25 min')).toBeInTheDocument();
  });

  it('resets the timer when "Reset" is clicked', async () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    const resetButton = screen.getByText('Reset');

    await act(async () => {
      userEvent.click(startButton);
    });

    expect(screen.getByText('Stop')).toBeInTheDocument();

    await act(async () => {
      userEvent.click(resetButton);
    });

    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Session Length: 25 min')).toBeInTheDocument();
  });

  it('adjusts the break length', async () => {
    render(<App />);

    const breakMinusButton = screen.getByTestId('break-decrement');
    const breakPlusButton = screen.getByTestId('break-increment');

    await act(async () => {
      userEvent.click(breakPlusButton);
    });

    expect(screen.getByText('Break Length: 6 min')).toBeInTheDocument();

    await act(async () => {
      userEvent.click(breakMinusButton);
    });

    expect(screen.getByText('Break Length: 5 min')).toBeInTheDocument();
  });


});
