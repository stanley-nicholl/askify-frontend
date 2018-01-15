import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Queue from './components/Queue'
import QuestionArchive from './components/QuestionArchive'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInJvbCI6ZmFsc2UsImV4cCI6MTUxNjA2ODUwNX0.IXkI1VjbnQfThtXkm7mHHdkvtEndTETAaDDYzH727KQ'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      userToken : localStorage.getItem('askifyUserToken'),
      userId : 3,
      fname : 'Kat',
      queueOrder : 0,
      programType : null,
      cohort : null,
      currentQuestion : null,
      inQueue : true,
      queue : [],
      archive : []
    }
  }

  componentWillMount = async () => {
    // this.fetchUserData(token)
    this.fetchQueueData(token)
  }

  // fetchUserData = async (token) => {
  //   const userDataResponse = await fetch(`${xxx}/users`, {
  //     headers: {
  //       'authorization': `Bearer ${token}`
  //     }
  //   })
  // }

  fetchQueueData = async (token) => {
    const queueDataResponse = await fetch(`https://askify-api.herokuapp.com/api/queue`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })

    const queueDataJSON = await queueDataResponse.json()

    const archiveDataResponse = await fetch(`https://askify-api.herokuapp.com/api/archive`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })

    const archiveDataJSON = await archiveDataResponse.json()

    this.setState({ queue: queueDataJSON, archive: archiveDataJSON})
  }

  signUpUser = async (payload) => {
    const newUser = await fetch(`https://askify-api.herokuapp.com/auth/register`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    // this.fetchUserData()
  }

  signInUser = async (payload) => {
    const loggedInUser = await fetch(`https://askify-api.herokuapp.com/auth/login`, {
      method: 'GET',
      body: JSON.stringify(payload)
    })
    // this.fetchUserData()
  }

  addToQueue = async (userId, question) => {

    // do we need to attach userId somewhere to know who to attach it to?
    const newQuestion = await fetch(`https://askify-api.herokuapp.com/api/questions/`, {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    this.fetchQueueData()
  }

  updateQueueStatus = (status) => {
    this.setState({ inQueue: status })
  }

  updateQueueOrder = (order) => {
    this.setState({ queueOrder: order})
  }


  render() {
    return (
      <Router>
        <div className="App">

          <Route path='/signin' component={ (props) => <SignIn {...props} signInUser={this.signInUser} /> } />

          <Route path='/signup' component={ (props) => <SignUp {...props} signUpUser={this.signUpUser} /> } />

          <Route exact path='/askify' component={ (props) => <Queue {...props} user={{
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

          <Route exact path='/' component={ (props) => <QuestionArchive {...props} user={{
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


/**/
