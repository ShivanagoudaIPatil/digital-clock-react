import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())
  const [format, setFormat] = useState('24h') // '24h' or '12h'

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getFormattedTime = () => {
    let hours = time.getHours()
    const minutes = String(time.getMinutes()).padStart(2, '0')
    const seconds = String(time.getSeconds()).padStart(2, '0')
    let period = ''

    if (format === '12h') {
      period = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12 || 12
    }

    hours = String(hours).padStart(2, '0')
    return { hours, minutes, seconds, period }
  }

  const getDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    const day = days[time.getDay()]
    const date = time.getDate()
    const month = months[time.getMonth()]
    const year = time.getFullYear()

    return `${day}, ${month} ${date}, ${year}`
  }

  const { hours, minutes, seconds, period } = getFormattedTime()

  return (
    <div className="app">
      <div className="clock-container">
        <h1 className="title">Digital Clock</h1>
        
        <div className="date-section">
          <p className="date">{getDate()}</p>
        </div>

        <div className="time-display">
          <div className="time-block">
            <span className="time-digit">{hours}</span>
            <span className="time-separator">:</span>
            <span className="time-digit">{minutes}</span>
            <span className="time-separator">:</span>
            <span className="time-digit">{seconds}</span>
            {format === '12h' && <span className="period">{period}</span>}
          </div>
        </div>

        <div className="button-group">
          <button 
            className={`format-btn ${format === '24h' ? 'active' : ''}`}
            onClick={() => setFormat('24h')}
          >
            24 Hour
          </button>
          <button 
            className={`format-btn ${format === '12h' ? 'active' : ''}`}
            onClick={() => setFormat('12h')}
          >
            12 Hour
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
