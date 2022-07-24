// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios'

import { 
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from './action-types'


export function moveClockwise(int) {
  return({ type: MOVE_CLOCKWISE, payload: int })
}

export function moveCounterClockwise(int) {
  return({ type: MOVE_COUNTERCLOCKWISE, payload: int })
}

export function selectAnswer(answerID) {
  return({ type: SET_SELECTED_ANSWER, payload: answerID})
}

export function setMessage(message) {
  return({type: SET_INFO_MESSAGE, payload: message})
}

export function setQuiz(type, payload) {
  return({ type, payload })
}

export function inputChange(id, value) {
  return({type: INPUT_CHANGE, payload: {id, value}})
}

export function resetForm() {
  return({ type: RESET_FORM })
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(SET_QUIZ_INTO_STATE,null))
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        console.log('fetch quiz',res)
        dispatch(setQuiz(SET_QUIZ_INTO_STATE, res.data))
      })
      .catch(err => console.log(err))
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(answer) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', answer)
      .then(res => {
        console.log('answer response', res.data.message)
        dispatch(setMessage(res.data.message))
        dispatch(fetchQuiz())
      })
    
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(quiz) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', quiz)
      .then(res => {
        console.log('post quiz response:', res)
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
        dispatch(resetForm())
      })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
