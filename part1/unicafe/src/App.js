import { useState } from 'react'


const Button = (props) => {
  const clickHandler = props.clickHandler
  return (
    <button onClick={clickHandler}>{props.buttonText}</button>
  )
}

const Statistics = (props) => {
  const renderStatistics = []
  props.statistics.forEach((statistic) => {
    renderStatistics.push(<Statistic key={statistic.name} name={statistic.name} value={statistic.value} />);
  })
  if (props.clicks > 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          {renderStatistics}
        </table>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <p>No feedback given</p>
    </div>
  )
}

const Statistic = (props) => (
  <tr><td>{props.name}</td><td>{props.value}</td></tr>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const buttonGoodFeedback = () => {
    setGood(good + 1)
  }
  const buttonNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }
  const buttonBadFeedback = () => {
    setBad(bad + 1)
  }
  const all = good + neutral + bad
  const average = (good > 0 || bad > 0) ? (good - bad) / all : 0
  const positive = good > 0 ? good * 100 / all + "%" : (0)
  const statistics = [
    {
      name: "Good",
      value: good
    },
    {
      name: "Neutral",
      value: neutral
    },
    {
      name: "Bad",
      value: bad
    },
    {
      name: "All",
      value: all
    },
    {
      name: "Average",
      value: average
    },
    {
      name: "Positive",
      value: positive
    }

  ]

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={buttonGoodFeedback} buttonText="Good"></Button>
      <Button clickHandler={buttonNeutralFeedback} buttonText="Neutral"></Button>
      <Button clickHandler={buttonBadFeedback} buttonText="Bad"></Button>
      <Statistics statistics={statistics} clicks={all} />
    </div>
  )
}

export default App