import { useEffect, useState } from 'react'
import axios from 'axios'

const WeatherInfo = (props) => {
  const api_key = process.env.REACT_APP_API_KEY
  console.log(api_key);
  const URL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + props.lat + '&lon=' + props.lon + '&units=metric&appid=' + api_key
  const [temp, setTemp] = useState('')
  let temperature
  useEffect(() => {
    axios
      .get(URL)
      .then(response => {
        const imgURL = 'http://openweathermap.org/img/wn/' + response.data.weather[0].icon + '@2x.png'
        setTemp(
          <div>
            <p>temperature {response.data.main.temp} Celcius</p>
            <img src={imgURL} />
            <p>wind {response.data.wind.speed} m/s</p>
          </div>
        )
        console.log(response);
      })
  }, [])
  return (
    temp
  )
}

const ShowContry = (props) => {
  return (
    <div>
      <h2>{props.country[0].name.common}</h2>
      <p>capital: {props.country[0].capital}</p>
      <p>area: {props.country[0].area}</p>
      <h3>lenguages</h3>
      <ul>
        {
          Object.entries(props.country[0].languages).map(([key, language]) => {
            return <li key={key}>{language}</li>
          })
        }
      </ul>
      <img src={props.country[0].flags.png} />
      <h2>Weather in {props.country[0].capital}</h2>
      <WeatherInfo lat={props.country[0].latlng[0]} lon={props.country[0].latlng[1]} />
    </div>
  )
}

const ShowCountries = (props) => {
  const filteredCountries = props.countries.filter(country => country.name.common.toUpperCase().includes(props.filter.toUpperCase()))
  const handleClick = (e) => {
    props.setCountryInputFilterValue(e.target.name)
  }
  console.log(filteredCountries)
  let response
  if (filteredCountries.length > 10) {
    response = <b>Too many matches, specify another filter</b>
  } else if ((filteredCountries.length === 1)) {
    response = <ShowContry country={filteredCountries} />
  } else (
    response = filteredCountries.map(country => <p key={country.name.common}>{country.name.common} <button name={country.name.common} onClick={handleClick}>view</button></p>)
  )
  return (
    <div>{response}</div>
  )
}


const Filter = (props) => {
  return (
    <div>
      {props.filterName} <input value={props.countryInputValue} onChange={props.eventHandler} />
    </div>
  )
}




function App() {
  const [countries, setCountries] = useState([])
  const [countryInputFilterValue, setCountryInputFilterValue] = useState('')

  const eventHandlerCountryInput = (e) => {
    setCountryInputFilterValue(e.target.value)
  }
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])
  return (
    <div>
      <Filter filterName="find countries" countryInputValue={countryInputFilterValue} eventHandler={eventHandlerCountryInput} />
      <ShowCountries countries={countries} filter={countryInputFilterValue} setCountryInputFilterValue={setCountryInputFilterValue} />
    </div>
  )
}

export default App;

