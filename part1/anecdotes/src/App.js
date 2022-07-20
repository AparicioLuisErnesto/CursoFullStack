import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.buttonHandler}>{props.buttonName}</button>
  )
}

const MostVotedAnecdote = (props) => {
  let votes = -1;
  let mostVotedAnecdote
  props.anecdotes.forEach(anecdote => {
    if (anecdote.votes > votes) {
      votes = anecdote.votes
      mostVotedAnecdote = anecdote.anecdote
    }
  })
  return (
    <p>{mostVotedAnecdote}</p>
  )
}

const App = () => {
  const anecdotes = [
    {
      anecdote: 'If it hurts, do it more often.',
      votes: 0
    },
    {
      anecdote: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      anecdote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      anecdote: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
    {
      anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      votes: 0
    }
  ]
  const [selected, setSelected] = useState(0)
  const [anecdote, setAnecdote] = useState(anecdotes)
  let anecdoteMostVoted = anecdotes[selected].anecdote

  let index = 0;

  const getRandomAnecdote = () => {
    index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }

  const voteAnecdote = () => {
    const newAnecdotes = anecdote.map((anecdote, item) => {
      if (item == selected) {
        return { ...anecdote, votes: anecdote.votes + 1 }
      }
      return { ...anecdote }
    })
    setAnecdote(newAnecdotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote[selected].anecdote}</p>
      <p>has {anecdote[selected].votes} votes</p>
      <br></br>
      <Button buttonHandler={voteAnecdote} buttonName="vote" />
      <Button buttonHandler={getRandomAnecdote} buttonName="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <MostVotedAnecdote anecdotes={anecdote}/>
    </div>
  )
}

export default App