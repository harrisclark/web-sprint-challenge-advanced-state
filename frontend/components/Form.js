import React from 'react'
import { connect } from 'react-redux'
import { inputChange, resetForm, postQuiz, setMessage } from '../state/action-creators'

export function Form(props) {
  const {newQuestion, newTrueAnswer, newFalseAnswer} = props.form;

  const onChange = evt => {
    props.inputChange(evt.target.id, evt.target.value)

  }

  const quiz = {
    question_text: newQuestion,
    true_answer_text: newTrueAnswer,
    false_answer_text: newFalseAnswer
  }

  const onSubmit = evt => {
    evt.preventDefault()
    //props.setMessage(`Congrats: "${newQuestion}" is a great question!`)
    props.postQuiz(quiz)
  }

  const isDisabled = (newQuestion.trim() && newTrueAnswer.trim() && newFalseAnswer.trim())

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input value={newQuestion} maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input value={newTrueAnswer} maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={newFalseAnswer} maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button disabled={!isDisabled} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, {inputChange, resetForm, postQuiz, setMessage })(Form)
