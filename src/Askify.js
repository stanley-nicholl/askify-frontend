import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Queue from './components/Queue'
import QuestionArchive from './components/QuestionArchive'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  signIn,
  signUp,
  fetchUser,
  updateQueuePosition
} from './actions/user.actions'

import { fetchQueue } from './actions/queue.actions'

import { fetchArchive } from './actions/archive.actions'


const isPrivate = ({ id }, Component) => {
  console.log(id);
  return (props) => id ? <Component {...props} /> : <Redirect to="/"/>
}

class Askify extends Component {
  constructor(props){
    super(props)
  }

  shouldComponentUpdate() {
    const position = this.props.queue.findIndex((item => {
      return item.userid === this.props.user.id
    }))
    if (position !== this.props.user.order) {
      return true
    } else {
      return false
    }
  }

  async componentDidMount () {
    const token = await window.localStorage.getItem('askifyToken')
    if(token) {
      const user = await this.props.fetchUser(token)
      const queue = await this.props.fetchQueue(token)
      const archive = await this.props.fetchArchive(token)
      this.props.updateQueuePosition(this.props.user, this.props.queue)
    }
  }

  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Route exact path='/' component={() => this.props.user.id ?
              <Redirect to="/queue"/> : <SignIn />} />
            <Route path='/signup' component={() => this.props.user.id ?
              <Redirect to="/queue"/> : <SignUp />} />
            <Route path='/queue' component={ isPrivate(this.props.user, Queue) } />
            <Route path='/archive' component={ isPrivate(this.props.user, QuestionArchive) } />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    queue: state.queue,
    archive: state.archive,
    user: state.user,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUser,
    signIn,
    signUp,
    fetchQueue,
    updateQueuePosition,
    fetchArchive
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Askify)
