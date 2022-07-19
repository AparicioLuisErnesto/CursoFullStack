const Header = (props) => (
  <div>
    <h1>{props.course.name}</h1>
  </div>
)

const Content = (props) => {
  let partsComponent = []
  props.course.parts.forEach(part => {
    partsComponent.push(<Part key={part.name} courseName={part.name} courseNumberOfExercises={part.exercises} />)
  })
  return (
    <div>
      {partsComponent}
    </div>
  )
}
const Part = (props) => {
  return (
    <div>
      <p>{props.courseName} {props.courseNumberOfExercises}</p>
    </div>
  )

}

const Total = (props) => {
  let total = 0
  props.course.parts.forEach(part => {
      total += part.exercises
  })  
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}


export default App