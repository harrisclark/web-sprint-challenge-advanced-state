import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer, setMessage } from '../state/action-creators'

function Quiz(props) {

  const { quiz, selectedAnswer } = props;

  
    useEffect(() => {
      !quiz && props.fetchQuiz()
    }, [])
  

  const handleSubmit = () => {
    const answer = {
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer
    }
    console.log('answer',answer)
    props.selectAnswer(null)
    props.postAnswer(answer)
    //props.fetchQuiz()
  }

  const handleSelect = (answerID) => {
    props.setMessage('')
    props.selectAnswer(answerID)
  }

  return (
    <div id="wrapper">
      {
        
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer${selectedAnswer === quiz.answers[0].answer_id ? ' selected':''}`}>
                {quiz.answers[0].text}
                <button onClick={()=>handleSelect(quiz.answers[0].answer_id)}>
                {selectedAnswer === quiz.answers[0].answer_id ? 'SELECTED':'Select'}
                </button>
              </div>

              <div className={`answer${selectedAnswer === quiz.answers[1].answer_id ? ' selected':''}`}>
              {quiz.answers[1].text}
                <button onClick={()=>handleSelect(quiz.answers[1].answer_id)}>
                {selectedAnswer === quiz.answers[1].answer_id?'SELECTED':'Select'}
                </button>
              </div>
            </div>

            <button disabled={!selectedAnswer} onClick={handleSubmit} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapToProps, { fetchQuiz, selectAnswer, postAnswer, setMessage })(Quiz)
