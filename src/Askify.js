import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Queue from './components/Queue'
import QuestionArchive from './components/QuestionArchive'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { signIn, signUp, fetchUser } from './actions/user.actions'
import { fetchQueue } from './actions/queue.actions'


class Askify extends Component {
  constructor(props){
    super(props)
    
  }

  async componentDidMount () {
    const token = await window.localStorage.getItem('askifyToken')
    await this.props.fetchUser(token)
    await this.props.fetchQueue(token)
  }

  render() {
    return (
      <div>
      <Router>
        
          <div className="App">
            <Route exact path='/' component={ (props) => <SignIn {...props} user={this.props.user} /> } />
            <Route exact path='/signup' component={ (props) => <SignUp {...props} user={this.props.user} /> } />
            <Route exact path='/queue' component={ (props) => <Queue {...props} user={this.props.user}
              queue={this.props.queue}
              /> } />

            <Route exact path='/archive' component={ (props) => <QuestionArchive {...props} user={this.props.user}
              questionArchive={this.props.archive}
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
  return bindActionCreators({ fetchUser, signIn, signUp, fetchQueue }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Askify)
