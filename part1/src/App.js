const Header = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>
)

const Content = (props) => {
  let partsComponent = []
  props.parts.forEach(part => {
      partsComponent.push(<Part key = {part.name} courseName={part.name} courseNumberOfExercises={part.exercises}/>)
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

const Total = (props) => (
  <div>
    <p>Number of exercises {props.numberOfExercises}</p>
  </div>
)


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts = [part1, part2, part3]
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total numberOfExercises={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}


export default App