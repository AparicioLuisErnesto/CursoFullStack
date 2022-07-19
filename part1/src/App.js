const Header = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>
)

const Content = (props) => (
  <div>
    <Part courseName={props.course1} courseNumberOfExercises={props.exercises1} />
    <Part courseName={props.course2} courseNumberOfExercises={props.exercises2} />
    <Part courseName={props.course3} courseNumberOfExercises={props.exercises3} />
  </div>
)

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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content course1={part1} exercises1={exercises1} course2={part2} exercises2={exercises2} course3={part3} exercises3={exercises3}/>
      <Total numberOfExercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App