import React, { useState, useEffect, useRef } from 'react';
import { Timer, Log, LogsSection, Container, Button, SessionControlContainer, SessionInfo, ControlButton } from "./styles";
import { Howl } from 'howler';

interface TimerDisplayProps {
  timeLeft: number;
}

interface ControlButtonsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

interface SessionControlProps {
  sessionLength: number;
  setSessionLength: React.Dispatch<React.SetStateAction<number>>;
  breakLength: number;
  setBreakLength: React.Dispatch<React.SetStateAction<number>>;
}

const App: React.FC = () => {
  const [sessionLength, setSessionLength] = useState<number>(25 * 60);
  const [breakLength, setBreakLength] = useState<number>(5 * 60);
  const [timeLeft, setTimeLeft] = useState<number>(sessionLength);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentSession, setCurrentSession] = useState<"work" | "break">("work");
  const [logs, setLogs] = useState<string[]>([]);
  const soundRef = useRef<Howl | null>(null);


  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime > 0) return prevTime - 1;
          if (currentSession === "work") {
            setCurrentSession("break");
            return breakLength;
          } else {
            setCurrentSession("work");
            return sessionLength;
          }
        });
      }, 1000);
    }

    if (timeLeft === 0 && isRunning !== false) {
      soundRef.current?.play();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, sessionLength, breakLength, currentSession, timeLeft, soundRef]);

  return (
    <Container>
      <h1>Pomodoro Timer</h1>
      <TimerDisplay timeLeft={timeLeft} />
      <ControlButtons
        isRunning={isRunning}
        onStart={() => {
          if (!soundRef.current) {
            soundRef.current = new Howl({
              src: ['/pomodoro-bell.wav'],
              volume: 0.5
            });
          }
          setIsRunning(true);
          const logMessage = currentSession === "work"
            ? `Starting work session at ${new Date().toLocaleTimeString()}`
            : `Starting break session at ${new Date().toLocaleTimeString()}`;
          setLogs(prevLogs => [logMessage, ...prevLogs]);
        }}
        onStop={() => setIsRunning(false)}
        onReset={() => {
          setIsRunning(false);
          setTimeLeft(sessionLength);
          setCurrentSession("work");
        }}
      />
      <SessionControl
        sessionLength={sessionLength}
        setSessionLength={setSessionLength}
        breakLength={breakLength}
        setBreakLength={setBreakLength}
      />
      <LogsSection>
        <h2>Activity Logs</h2>
        <ul>
          {logs.map((log, index) => (
            <Log key={index}>{log}</Log>
          ))}
        </ul>
      </LogsSection>

    </Container>
  );
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  return <Timer>{`${minutes}:${seconds}`}</Timer>;
};

const ControlButtons: React.FC<ControlButtonsProps> = ({ isRunning, onStart, onStop, onReset }) => {
  return (
    <div>
      {isRunning ? (
        <Button onClick={onStop}>Stop</Button>
      ) : (
        <Button onClick={onStart}>Start</Button>
      )}
      <Button onClick={onReset}>Reset</Button>
    </div>
  );
};

const SessionControl: React.FC<SessionControlProps> = ({ sessionLength, setSessionLength, breakLength, setBreakLength }) => {
  return (
    <SessionControlContainer>
      <div>
        <ControlButton data-testid="session-decrement" onClick={() => setSessionLength(prevLength => Math.max(60, prevLength - 60))}>-</ControlButton>
        <SessionInfo>Session Length: {sessionLength / 60} min</SessionInfo>
        <ControlButton data-testid="session-increment" onClick={() => setSessionLength(prevLength => prevLength + 60)}>+</ControlButton>
      </div>
      <div>
        <ControlButton data-testid="break-decrement" onClick={() => setBreakLength(prevLength => Math.max(60, prevLength - 60))}>-</ControlButton>
        <SessionInfo>Break Length: {breakLength / 60} min</SessionInfo>
        <ControlButton data-testid="break-increment" onClick={() => setBreakLength(prevLength => prevLength + 60)}>+</ControlButton>
      </div>
    </SessionControlContainer>
  );
};

export default App;
