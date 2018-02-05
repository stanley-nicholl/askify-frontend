import React, { Component } from 'react'
import {Collapse} from 'react-collapse'
import AnswerItem from './AnswerItem'

class ArchiveItem extends Component{
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  // ({ id, name, question, answers }) => {

  toggleCollapse = () => {
    this.setState({ ...this.state, collapsed: !this.state.collapsed })
  }

  render() {
    // console.log(this.props.answers);
    return (
      <div className='d-flex row question-item py-3'>
        <div className="col-1 d-flex justify-content-center align-items-center">
          <p className="element queueNum mt-3">{this.props.id}</p>
        </div>
        <div className="col-3 d-flex align-items-center">
          <p className="element name mt-3">{this.props.name}</p>
        </div>
        <div className="col-6 d-flex align-items-center">
          <p className="element topic mt-3" id="${id}-question">{this.props.question}</p>
        </div>
        <div className="col-2 d-flex flex-column align-items-center justify-content-center">
          <button type="button" id="${id}-answered" className='btn waves-effect btn-sm item-button answered-btn' onClick={this.toggleCollapse}>Show Answer</button>
        </div>
        <div className='d-flex answer-row'>
          <Collapse isOpened={this.state.collapsed}>
            <AnswerItem id={this.props.answers[0].id} name={this.props.answers[0].fname} answer={this.props.answers[0].answer} />
          </Collapse>
        </div>
      </div>

    )
  }

}



export default ArchiveItem
