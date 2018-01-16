import React, { Component } from 'react'
import {Collapse} from 'react-collapse';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateQuestion, postAnswer } from '../../actions/queue.actions'

class QuestionItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      styling: 'd-flex row py-3',
      editing: false,
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

  editQuestion = (e) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      editing: !this.state.editing
    })
  }

  submitUpdateQuestion = (e) => {
    e.preventDefault()
    const token = window.localStorage.getItem('askifyToken')
    this.props.postQuestion(this.props.id, this.state.question, token)
  }

  submitQuestionAnswer = (e) => {
    e.preventDefault()
    const token = window.localStorage.getItem('askifyToken')
    this.props.postAnswer(this.props.id, this.props.fname, this.props.cohort, this.state.answer, token)
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

  renderButtons() {
    if (this.state.editing) {
      return (
        <div className="col-2 d-flex flex-column align-items-center justify-content-center">
          <button type="button" id={this.buttonId('submit')} className='btn btn-warning waves-effect btn-sm item-button mt-2' onClick={e => this.submitUpdateQuestion(e)}>Submit</button>
          <button type="button" id={this.buttonId('cancel')} className='btn waves-effect btn-sm item-button mt-2 answered-btn' onClick={e => this.cancelEdit(e)}>Cancel</button>
        </div>
      )
    } else
    return (
      <div className="col-2 d-flex flex-column align-items-center justify-content-center">
        <button type="button" id={this.buttonId('edit')} className='btn btn-warning waves-effect btn-sm item-button mt-2' onClick={e => this.editQuestion(e)}>Edit</button>
        <button type="button" id={this.buttonId('answered')} className='btn waves-effect btn-sm item-button mt-2 answered-btn' onClick={this.collapsed}>Answered</button>
      </div>
    )
  }

  collapsed = () => {
    this.setState({ ...this.state, collapsed: !this.state.collapsed })
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
              <input type="text" placeholder='What cleared the roadblock' className="element topic answer-text col-9" id={this.buttonId('answer')} />
              <button type="button" id={this.buttonId('answer-submit')} className='btn waves-effect btn-sm item-button mt-2 answered-btn col-2 mr-0' onChange={this.handleAnswerChange} onClick={e => this.submitQuestionAnswer(e)}>Submit</button>
            </div>
          </Collapse>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ updateQuestion, postAnswer }, dispatch)
}

export default connect(null, mapDispatchToProps)(QuestionItem)
