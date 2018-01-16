import React, { Component } from 'react'

class QuestionItem extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      styling: 'd-flex row question-item py-3',
      editing: false,
      disabled: 'false'
    }
  }

  editQuestion = (e) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      editing: !this.state.editing
    })
  }

  buttonId = (role) => {
    return this.props.id + "-" + role
  }

  renderQuestionText = () => {
    if (this.state.editing) {
      return (
        <div className="col-6 d-flex align-items-center">
          <input type="text" className="element topic" id="${id}-question" value={this.props.question} />
        </div>
      )
    } else return (
      <div className="col-6 d-flex align-items-center">
        <p className="element topic" id="${id}-question">{this.props.question}</p>
      </div>
    )
  }

  render() { 
    return (
      <div className={this.state.styling}>
        <div className="col-1 d-flex justify-content-center align-items-center">
          <p className="element queueNum">{this.props.count}</p>
        </div>
        <div className="col-3 d-flex align-items-center">
          <p className="element name">{this.props.name}</p>
        </div>
        { this.renderQuestionText() }
        <div className="col-2 d-flex flex-column align-items-center justify-content-center">
          <button type="button" id={this.buttonId('edit')} className='btn btn-warning waves-effect btn-sm item-button mt-2' onClick={e => this.editQuestion(e)}>Edit</button>
          <button type="button" id={this.buttonId('answered')} className='btn waves-effect btn-sm item-button mt-2 answered-btn' disabled={this.state.disabled}>Answered</button>
        </div>
      </div>
    )
  }
}
 
export default QuestionItem
