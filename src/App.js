import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Queue from './components/Queue'
import QuestionArchive from './components/QuestionArchive'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
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

  componentDidMount = async () => {
    const token = localStorage.getItem('askifyToken')
    // if(!token) {
    //   // this.history.push('/')
    //   return null
    // }
    console.log(token);
    await this.fetchQueueData(token)
    await this.fetchUserData(token)
  }

  //RETRIEVES USER INFORMATION IN THE EVENT THEIR TOKEN IS STILL VALID AND DID NOT 'ENTER' THE SITE THROUGH SIGNIN/SIGNUP PAGES

  fetchUserData = async (userToken) => {
    const userDataResponse = await fetch(`https://askify-api.herokuapp.com/api/user`, {
      headers: {
        'authorization': `Bearer ${userToken}`
      }
    })

    const user = await userDataResponse.json()
    if(!user) return null
    await this.setUserDataToState(user)
  }

  //GRABS EXISTING QUESTIONS IN QUEUE AND ARCHIVE

  fetchQueueData = async (userToken) => {
    const queueDataResponse = await fetch(`https://askify-api.herokuapp.com/api/queue`, {
      headers: {
        'authorization': `Bearer ${userToken}`
      }
    })

    const queueDataJSON = await queueDataResponse.json()

    const archiveDataResponse = await fetch(`https://askify-api.herokuapp.com/api/archive`, {
      headers: {
        'authorization': `Bearer ${userToken}`
      }
    })

    const archiveDataJSON = await archiveDataResponse.json()
    if(!archiveDataJSON || !queueDataJSON) return null
    await this.setState({ queue: queueDataJSON, archive: archiveDataJSON})
  }

  //SETS USER DATA TO LOCAL STATE FOR SIGNIN, SIGNUP, AND RETURNING USER WITH TOKEN

  setUserDataToState = async (user) => {
    const { fname, email, cohort } = user
    const userToken = user.token
    const userId = user.id

    // localStorage.setItem('askifyToken', userToken)

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
        'Accept': 'application/json'
      }
    })
    await this.fetchQueueData()
  }

  //UPDATES USER'S QUEUE STATUS AS THEY CANNOT SUBMIT MULTIPLE QUESTIONS INTO THE QUEUE AT ONCE

  updateQueueStatus = (status) => {
    this.setState({ inQueue: status })
  }

  //UPDATES USERS'S QUEUE ORDER SHOWING WHERE THEY ARE 'IN LINE'

  updateQueueOrder = (order) => {
    this.setState({ queueOrder: order})
  }


  render() {
    return (
      <Router>
        <div className="App">

          <Route exact path='/' component={ (props) => <SignIn {...props} setUserDataToState={this.setUserDataToState} /> } />

          <Route exact path='/signup' component={ (props) => <SignUp {...props} setUserDataToState={this.setUserDataToState} /> } />

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
            /> } />

          <Route exact path='/archive' component={ (props) => <QuestionArchive {...props} user={{
            userId: this.state.userId,
            fname: this.state.fname,
            inQueue: this.state.inQueue,
            queueOrder: this.state.queueOrder,
            }}
            questionArchive={this.state.archive}
            /> } />

        </div>
      </Router>
    );
  }
}

export default App;


