import React, { Component } from 'react'
import {Collapse} from 'react-collapse';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateQuestion, postAnswer, fetchQueue } from '../../actions/queue.actions'

class QuestionItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      styling: 'd-flex row py-3',
      editing: false,
      answering: false,
      disabled: 'false',
      question: '',
      answer: '',
      collapsed: false
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      question: this.props.question
    })
  }

  handleEditChange = (e) => {
    this.setState({
      ...this.state,
      question: e.target.value
    })
  }

  handleAnswerChange = (e) => {
    this.setState({
      ...this.state,
      answer: e.target.value
    })
  }

  editQuestion = () => {
    this.setState({
      ...this.state,
      editing: !this.state.editing
    })
  }

  answerQuestion = () => {
    this.setState({
      ...this.state,
      answering: !this.state.answering
    })
  }

  submitUpdateQuestion = async (e) => {
    e.preventDefault()
    const token = window.localStorage.getItem('askifyToken')
    await this.props.updateQuestion(this.props.id, this.state.question, token)
    this.props.fetchQueue(token)
    this.editQuestion()
  }

  submitQuestionAnswer = async (e) => {
    e.preventDefault()
    const token = window.localStorage.getItem('askifyToken')
    await this.props.postAnswer(this.props.id, this.props.fname, this.props.cohort, this.state.answer, token)
    this.props.fetchQueue(token)
    this.setState({ collapsed: false, answer: '' })

  }

  buttonId = (role) => {
    return this.props.id + "-" + role
  }

  renderQuestionText = () => {
    if (this.state.editing) {
      return (
        <div className="col-6 d-flex align-items-center">
          <input type="text" className="element topic" id={this.buttonId('question')} value={this.state.question} onChange={this.handleEditChange}/>
        </div>
      )
    } else return (
      <div className="col-6 d-flex align-items-center">
        <p className="element topic" id={this.buttonId('question')}>{this.props.question}</p>
      </div>
    )
  }

  cancelAnswer = () => {
    this.setState({ ...this.state, answer: ''})
    this.toggleCollapse()
  }

  cancelEdit = () => {
    this.setState({ ...this.state, editing: false, question: this.props.question })
  }

  toggleCollapse = () => {
    this.setState({ ...this.state, collapsed: !this.state.collapsed, answering: !this.state.answering })
  }

  renderButtons() {
    if(this.props.currentUserId !== this.props.questionUserId){
      return (
        <div className="col-2 d-flex flex-column align-items-center justify-content-center">
          <button type="button" id={this.buttonId('edit')} className='btn btn-blue-grey waves-effect btn-sm item-button mt-2' disabled>Edit</button>
          <button type="button" id={this.buttonId('answered')} className='btn waves-effect btn-sm item-button mt-2 btn-blue-grey' disabled>Answer</button>
        </div>
      )
    }else if(this.state.editing){
      return (
        <div className="col-2 d-flex flex-column align-items-center justify-content-center">
          <button type="button" id={this.buttonId('submit')} className='btn btn-warning waves-effect btn-sm item-button mt-2' onClick={e => this.submitUpdateQuestion(e)}>Submit</button>
          <button type="button" id={this.buttonId('cancel')} className='btn waves-effect btn-sm btn-danger item-button mt-2' onClick={e => this.cancelEdit(e)}>Cancel</button>
        </div>
      )
    }else if(this.state.answering){
      return (
        <div className="col-2 d-flex flex-column align-items-center justify-content-center">
          <button type="button" id={this.buttonId('submit')} className='btn btn-danger waves-effect btn-sm item-button mt-2' onClick={e => this.cancelAnswer(e)}>Cancel</button>
          <button type="button" id={this.buttonId('cancel')} className='btn waves-effect btn-sm btn-blue-grey item-button mt-2' disabled >Answer</button>
        </div>
      )
    }else{
      return (
        <div className="col-2 d-flex flex-column align-items-center justify-content-center">
          <button type="button" id={this.buttonId('edit')} className='btn btn-warning waves-effect btn-sm item-button mt-2' onClick={e => this.editQuestion(e)}>Edit</button>
          <button type="button" id={this.buttonId('answered')} className='btn waves-effect btn-sm item-button mt-2 answered-btn' onClick={this.toggleCollapse}>Answer</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='question-item'>
        <div className={this.state.styling}>
          <div className="col-1 d-flex justify-content-center align-items-center">
            <p className="element queueNum">{this.props.count}</p>
          </div>
          <div className="col-3 d-flex align-items-center">
            <p className="element name">{this.props.name}</p>
          </div>
          { this.renderQuestionText() }
          { this.renderButtons() }
        </div>
        <div className='d-flex py-3'>
          <Collapse isOpened={this.state.collapsed}>
            <div className='d-flex row justify-content-between answer-section'>
              <input type="text" placeholder='What cleared the roadblock' className="element topic answer-text col-9 answer-input" id={this.buttonId('answer')} onChange={e => this.handleAnswerChange(e)} value={this.state.answer} />
              <button type="button" id={this.buttonId('answer-submit')} className='btn waves-effect btn-sm item-button mt-2 answered-btn col-2 mr-0' onChange={this.handleAnswerChange} onClick={e => this.submitQuestionAnswer(e)}>Submit</button>
            </div>
          </Collapse>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ updateQuestion, postAnswer, fetchQueue }, dispatch)
}

export default connect(null, mapDispatchToProps)(QuestionItem)
