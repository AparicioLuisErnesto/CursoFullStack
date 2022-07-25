import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const addData = (newPerson) => {
    const post = axios.post(baseURL, newPerson)
    return post.then(response => response.data)
}

const getAll = () => {    
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const deleteData = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const updateData = (id, newData) => {
    const request = axios.put(`${baseURL}/${id}`, newData)
    return request.then(response => response.data)
}

export default { addData, getAll, deleteData, updateData}