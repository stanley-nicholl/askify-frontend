import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Queue from './components/Queue'
import QuestionArchive from './components/QuestionArchive'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { signIn, signUp } from './actions/user.actions'
import { fetchQueue } from './actions/queue.actions'

class Askify extends Component {
  constructor(props){
    super(props)
    // this.state = {
    //   loggedIn: false,
    //   userToken : localStorage.getItem('askifyToken'),
    //   userId : null,
    //   fname : null,
    //   email: null,
    //   cohort : null,
    //   queueOrder : 0,
    //   currentQuestion : null,
    //   inQueue : false,
    //   queue : [],
    //   archive : []
    // }
  }

  //WARNING WARNING WARNING - REMEMBER TO CHANGE TOKEN TO GRAB LOCAL STORAGE

  componentDidMount = () => {
    const token = window.localStorage.getItem('askifyToken')
    this.props.fetchQueue(token)
  }

  //RETRIEVES USER INFORMATION IN THE EVENT THEIR TOKEN IS STILL VALID AND DID NOT 'ENTER' THE SITE THROUGH SIGNIN/SIGNUP PAGES

  fetchUserData = async (userToken) => {
    console.log('fetch user data')
    const headers = {
      'Authorization': `Bearer ${userToken}`,
      'cors': true,
    }
    console.log(headers)
    const userDataResponse = await fetch(`https://askify-api.herokuapp.com/api/user`, {
      headers
    })

    const user = await userDataResponse.json()
    console.log('user', user)
    if(!user) {
      console.log('no user found yo')
      return
    }
    console.log('user', user)
    await this.setUserDataToState(user)
  }

  //GRABS EXISTING QUESTIONS IN QUEUE AND ARCHIVE

  fetchQueueData = async (userToken) => {
    console.log('fetch queue data')
    const queueDataResponse = await fetch(`https://askify-api.herokuapp.com/api/queue`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'cors': true
      }
    })
    console.log('qdr', queueDataResponse)
    const queueDataJSON = await queueDataResponse.json()
    console.log(queueDataJSON)

    const archiveDataResponse = await fetch(`https://askify-api.herokuapp.com/api/archive`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'cors': true
      }
    })

    console.log('adr', archiveDataResponse)
    const archiveDataJSON = await archiveDataResponse.json()
    console.log(archiveDataJSON)

    if(!archiveDataJSON || !queueDataJSON) return null
    // await this.setState({ ...this.state, queue: queueDataJSON, archive: archiveDataJSON})

    console.log('fetch queue data finished')
  }

  //ADDS A Q TO THE EXISTING QUEUE AND RERENDERS

  addToQueue = async (userId, question) => {

    // do we need to attach userId somewhere to know who to attach it to?
    const newQuestion = await fetch(`https://askify-api.herokuapp.com/api/questions/`, {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'authorization': `Bearer ${this.userToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'cors': true
      }
    })
    await this.fetchQueueData()
  }

  //UPDATES USER'S QUEUE STATUS AS THEY CANNOT SUBMIT MULTIPLE QUESTIONS INTO THE QUEUE AT ONCE

  updateQueueStatus = (status) => {
    // this.setState({ ...this.state, inQueue: status })
  }

  //UPDATES USERS'S QUEUE ORDER SHOWING WHERE THEY ARE 'IN LINE'

  updateQueueOrder = (order) => {
    // this.setState({ ...this.state, queueOrder: order})
  }


  render() {
    return (
      <div>
      <Router>
        
          <div className="App">

            <Route exact path='/' component={ (props) => <SignIn {...props} user={this.props.user} /> } />

            <Route exact path='/signup' component={ (props) => <SignUp {...props} user={this.props.user} /> } />

            <Route exact path='/queue' component={ (props) => <Queue {...props} user={{
                userId: this.props.userId,
                fname: this.props.fname,
                inQueue: this.props.inQueue,
                queueOrder: this.props.queueOrder,
              }}
              addToQueue={this.addToQueue}
              queue={this.props.queue}
              updateQueueOrder={this.updateQueueOrder}
              updateQueueStatus={this.updateQueueStatus}
              /> } />

            <Route exact path='/archive' component={ (props) => <QuestionArchive {...props} user={{
                userId: this.props.userId,
                fname: this.props.fname,
                inQueue: this.props.inQueue,
                queueOrder: this.props.queueOrder,
              }}
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
  return bindActionCreators({ fetchQueue }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Askify)
