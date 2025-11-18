import { useState, useEffect, useEffectEvent } from "react";
import "./App.css";
import { MILESTONES } from "./config";

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [count, setCount] = useState(0);
  const [milestones, setMilestones] = useState([]);

  const handleStartRecording = useEffectEvent((isRecording, count) => {
    if (isRecording) {
      // timer
      const timeout = setTimeout(() => {
        setCount(count + 1);
        if (MILESTONES[count]) {
          setMilestones([...milestones, MILESTONES[count]]);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  });

  useEffect(() => {
    handleStartRecording(isRecording, count);
  }, [isRecording, count]);

  return (
    <>
      <h1>Client Side Recording</h1>
      <div className="card">
        <button
          onClick={() => {
            setIsRecording((isRecording) => !isRecording);
            fetch("http://localhost:3000/client-side-record/123");
          }}
        >
          {isRecording
            ? "Stop Client Side Recording"
            : "Start Client Side Recording"}
        </button>
        <div className="count-container">
          <p>Count is {count}</p>
        </div>
        {milestones?.length > 0 && (
          <div className="milestones-container">
            {milestones.map((milestone, index) => (
              <p key={index}>{milestone}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
