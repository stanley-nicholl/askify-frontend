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
  logUserOut,
  updateQueuePosition
} from './actions/user.actions'

import { fetchQueue } from './actions/queue.actions'

import { fetchArchive } from './actions/archive.actions'


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
    console.log('test0');
    const token = await window.localStorage.getItem('askifyToken')
    if(token) {
      // const user = await this.props.fetchUser(token)
      console.log('test1');
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
          <Route exact path='/' component={ (props) => <SignIn {...props} user={this.props.user} /> } />
          <Route exact path='/signup' component={ (props) => <SignUp {...props} user={this.props.user} /> } />
          <Route exact path='/queue'
            component={ (props) => <Queue {...props}
              user={this.props.user}
              queue={this.props.queue}
              logout={this.props.logUserOut}
            /> } />
          <Route exact path='/archive'
            component={ (props) => <QuestionArchive {...props}
              user={this.props.user}
              archive={this.props.archive}
              logout={this.props.logUserOut}
            /> } />
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
    logUserOut,
    fetchQueue,
    updateQueuePosition,
    fetchArchive
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Askify)
