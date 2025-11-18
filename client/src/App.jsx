import { useState } from 'react'
import './App.css'
import { MILESTONES } from './config'

function App() {
  const [count, setCount] = useState(0)
  const [milestones, setMilestones] = useState([])

  setTimeout(() => {
    setCount(count + 1)
    if (MILESTONES[count]) {
      setMilestones([...milestones, MILESTONES[count]])
    }
  }, 1000)

  return (
    <>
      <h1>Client Side Recording</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        {milestones?.length > 0 && (
          <div>
            {milestones.map((milestone, index) => (
              <p key={index}>{milestone}</p>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default App
