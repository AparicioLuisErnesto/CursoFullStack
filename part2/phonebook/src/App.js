import { useState, useEffect } from 'react'
import phonebook from './services/phonebook'

const Notification = (props) => {
  const notificationClassType = 'notification' + props.type
  return (
    <div className={notificationClassType}>
      <p>{props.message}</p>
    </div>
  )
}

const Filters = (props) => {
  return (
    <div>
      filter shown with <input value={props.searchKeyWord} onChange={props.handler} />
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

const ListOfNames = (props) => {
  const buttonHandlerDelete = (e) => {
    if (window.confirm('Do you really want to delete the record?')) {
      phonebook
        .deleteData(e.target.id)
        .then(deleteData => {
          phonebook.getAll()
            .then(persons => {
              props.personStateHandler(persons)
            })
        })
    }
  }

  const filteredPersons = props.listOfNames.filter(person => person.name.toUpperCase().includes(props.filter.toUpperCase()))
  const htmllistOfNames = filteredPersons.map(person => {
    return (
      <div key={"person" + person.id}>
        {person.name} {person.number} <button key={person.id} onClick={buttonHandlerDelete} id={person.id}>delete</button>
      </div>
    )
  })
  return htmllistOfNames
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('Ok')

  const handleSubmit = (e) => {
    e.preventDefault()


    const personsControl = persons.filter(person => person.name === newName)
    if (personsControl.length > 0) {
      if (personsControl[0].number === newPhoneNumber) {
        alert(`${newName} is already added to phonebook`)
      } else {
        if (window.confirm(`${personsControl[0].name} is already added to phonebook, replace the old number with a new one?`)) {
          const newData = { ...personsControl[0], number: newPhoneNumber }
          phonebook
            .updateData(personsControl[0].id, newData)
            .then(response => {
              setPersons(persons.map(person => {
                if (person.id === personsControl[0].id) {
                  return newData
                } else {
                  return person
                }
              }))
              setNotificationType('Ok')
              setErrorMessage(`${newName} was updated`)               
              setNewName('')
              setNewPhoneNumber('')
              setTimeout(() => {
                setErrorMessage(null)
              },5000)
            })
            .catch(err => {
              setNotificationType('Error')
              setErrorMessage('The person no longer exist in the database')
            })
        }
      }
    } else {
      const newData = { name: newName, number: newPhoneNumber }
      phonebook
        .addData(newData)
        .then(response => {
          setPersons(persons.concat(response))
          setNotificationType('Ok')          
          setErrorMessage(`${newName} was added`) 
          setNewName('')
          setNewPhoneNumber('')
          setTimeout(() => {
            setErrorMessage(null)
          },5000)
        })
    }
  }
  useEffect(() => {
    phonebook
      .getAll()
      .then(personas => setPersons(personas))
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
      <Notification message={errorMessage} type={notificationType}/>
      <Filters searchKeyWord={searchKeyWord} handler={handleInputFilter} />
      <h2>add a new</h2>
      <AddForm handleSubmit={handleSubmit} newName={newName} handleInputName={handleInputName} newPhoneNumber={newPhoneNumber} handleInputPhone={handleInputPhone} />
      <h2>Numbers</h2>
      <ListOfNames listOfNames={persons} filter={searchKeyWord} personStateHandler={setPersons} />
    </div>
  )
}

export default App