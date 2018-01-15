import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Queue from './components/Queue'
import QuestionArchive from './components/QuestionArchive'


class Askify extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      userToken : localStorage.getItem('askifyToken'),
      userId : null,
      fname : null,
      email: null,
      queueOrder : 0,
      programType : null,
      cohort : null,
      currentQuestion : null,
      inQueue : false,
      queue : [],
      archive : []
    }
  }

  //WARNING WARNING WARNING - REMEMBER TO CHANGE TOKEN TO GRAB LOCAL STORAGE

  componentDidMount = () => {
    const token = localStorage.getItem('askifyToken')
    if(!token) {
      this.setState({...this.state, loggedIn: false })
      console.log("No token found, you are not logged in")
      return
    } else {
      console.log(token);
      this.setState({...this.state, loggedIn: true})
      this.fetchUserData(token)
      this.fetchQueueData(token)
    }
  }

  //RETRIEVES USER INFORMATION IN THE EVENT THEIR TOKEN IS STILL VALID AND DID NOT 'ENTER' THE SITE THROUGH SIGNIN/SIGNUP PAGES

  fetchUserData = async (userToken) => {
    console.log('fetch user data')
    const headers = {
      'Authorization': `Bearer ${userToken}`,
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
    await this.setState({ ...this.state, queue: queueDataJSON, archive: archiveDataJSON})

    console.log('fetch queue data finished')
  }

  //SETS USER DATA TO LOCAL STATE FOR SIGNIN, SIGNUP, AND RETURNING USER WITH TOKEN

  setUserDataToState = async (user) => {
    console.log('set user data to state function')
    const { fname, email, cohort } = user
    const userToken = user.token
    const userId = user.id

    console.log('update token in localStorage to ', userToken)
    localStorage.setItem('askifyToken', userToken)

    // this.setState({ userToken: userToken, userId: userId })
    await this.setState({ userToken, userId, fname, email, cohort })
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
    this.setState({ ...this.state, inQueue: status })
  }

  //UPDATES USERS'S QUEUE ORDER SHOWING WHERE THEY ARE 'IN LINE'

  updateQueueOrder = (order) => {
    this.setState({ ...this.state, queueOrder: order})
  }


  render() {
    return (
      <div>
      <Router>
        
          <div className="App">

            <Route exact path='/' component={ (props) => <SignIn {...props} setUserDataToState={this.setUserDataToState} userIsLoggedIn={this.state.loggedIn} /> } />

            <Route exact path='/signup' component={ (props) => <SignUp {...props} setUserDataToState={this.setUserDataToState} userIsLoggedIn={this.state.loggedIn} /> } />

            <Route exact path='/queue' component={ (props) => <Queue {...props} user={{
              userId: this.state.userId,
              fname: this.state.fname,
              inQueue: this.state.inQueue,
              queueOrder: this.state.queueOrder,
              }}
              addToQueue={this.addToQueue}
              queue={this.state.queue}
              updateQueueOrder={this.updateQueueOrder}
              updateQueueStatus={this.updateQueueStatus}
              loggedIn={this.state.loggedIn}
              /> } />

            <Route exact path='/archive' component={ (props) => <QuestionArchive {...props} user={{
              userId: this.state.userId,
              fname: this.state.fname,
              inQueue: this.state.inQueue,
              queueOrder: this.state.queueOrder,
              }}
              questionArchive={this.state.archive}
              loggedIn={this.state.loggedIn}
              /> } />

          </div> 
      
        </Router> 
      </div>
    );
  }
}

export default Askify;


