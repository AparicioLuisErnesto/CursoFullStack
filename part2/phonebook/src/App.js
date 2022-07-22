import { useState, useEffect } from 'react'
import axios from 'axios'

const Filters = (props) => {
  return (
    <div>
      <p>filter shown with</p>
      <input value={props.searchKeyWord} onChange={props.handler} />
    </div>
  )
}

const AddForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>name: <input value={props.newName} onChange={props.handleInputName} /></div>
      <div>number: <input value={props.newPhoneNumber} onChange={props.handleInputPhone} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = (props) => (<p key={props.name}>{props.name} {props.phone}</p>)

const ListOfNames = (props) => {
  const filteredPersons = props.listOfNames.filter(person => person.name.toUpperCase().includes(props.filter.toUpperCase()))
  const htmllistOfNames = filteredPersons.map(person => {
    return <Person key={person.name} name={person.name} phone={person.phone} />
  })
  return htmllistOfNames
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchKeyWord, setSearchKeyWord] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const personsControl = persons.filter(person => person.name === newName)
    if (personsControl.length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, phone: newPhoneNumber, id: persons.length + 1 }))
    }
  }
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const handleInputName = (e) => {
    setNewName(e.target.value)
  }

  const handleInputPhone = (e) => {
    setNewPhoneNumber(e.target.value)
  }

  const handleInputFilter = (e) => {
    setSearchKeyWord(e.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filters searchKeyWord={searchKeyWord} handler={handleInputFilter} />
      <h2>add a new</h2>
      <AddForm handleSubmit={handleSubmit} newName={newName} handleInputName={handleInputName} newPhoneNumber={newPhoneNumber} handleInputPhone={handleInputPhone} />
      <h2>Numbers</h2>
      <ListOfNames listOfNames={persons} filter={searchKeyWord} />
    </div>
  )
}

export default App