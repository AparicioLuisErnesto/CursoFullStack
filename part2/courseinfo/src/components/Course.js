import React from 'react'

const Course = (props) => {

    const htmlForCourses = props.course.map(course => {
        const htmlForParts = course.parts.map(courseParts => {
            return <p key={"coursePart" + course.id + courseParts.id}> {courseParts.name} {courseParts.exercises} </p>
        })
        const amountOfExercises = course.parts.reduce((sumOfExercises, part) => {
            return sumOfExercises += part.exercises
        }, 0)
        return (
            <div key={"divCourse" + course.id}>
                <h2 key={"courseName" + course.id}>{course.name}</h2>
                {htmlForParts}
                <b key={"total" + course.id}>total of {amountOfExercises} exercises</b>
            </div>
        )
    })

    return (
        <div>
            <h1>Web development curriculum</h1>
            {htmlForCourses}
        </div>
    )
}

export default Course