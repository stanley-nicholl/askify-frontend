import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { postQuestion } from '../../actions/queue.actions'

const Hero = ({ postQuestion, user }) => {
    let error

    const canSubmit = () => {
      if(!user.order) {
        return (
          <button
            type="submit"
            className="btn btn-warning px-5 py-4 mb-0 question-btn"
            id="add-request"
          >
              ASKIFY!
          </button>
        )
      }else{
        return (
          <button
            type="submit"
            className="btn btn-blue-grey px-5 py-4 mb-0 question-btn"
            id="add-request"
            disabled
          >
              ASKIFY!
          </button>
        )
      }
    }

    const prepareQuestion = (e) => {
      e.preventDefault()
      const { userId, inQueue, fname, cohort } = user

      if(inQueue === true) {
        error = 'Users can only have one question in queue at a time'
        document.getElementById('error').innerHTML = error
        return null
      }
      document.getElementById('error').innerHTML = ''

      const token = localStorage.getItem('askifyToken')

      const question = e.target.questionText.value
      e.target.reset()
      postQuestion({ question, fname, cohort }, token)
    }

    return (
        <div className='jumbotron-fluid'>
            <form onSubmit={e => prepareQuestion(e)} className="d-flex justify-content-between form-group container align-items-end">
                <input className="form-control form-control-lg mr-5 pt-4 px-2 mb-0 pb-2 text-white flex-stretch question"
                    type="text" placeholder="What's got you blocked?"
                    name="questionText"
                    required
                />
            {canSubmit()}
            </form>
            <div className='d-flex justify-content-center'>
              <small id='error' className='error text-white mr-5'></small>
            </div>
        </div>
    )
}

function mapStateToProps (state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ postQuestion }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Hero)
