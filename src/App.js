import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Queue from './components/Queue'
import QuestionArchive from './components/QuestionArchive'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTU5NjAzOTksImp0aSI6Ilx1MDAwMCJ9.52Rr5kGCXvwlBmB6FOVNUYqImJs6B12wUuUNaXEzuLg'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      userToken : localStorage.getItem('askifyUserToken'),
      userId : null,
      userInQueue: false,
      firstName : null,
      lastName : null,
      queueOrder : 0,
      programType : null,
      cohort : null,
      currentQuestion : null,
      inQueue : false,
      queue : []
    }
  }

  componentWillMount = async () => {
    // this.fetchUserData(token)
    console.log(token);
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
    const queueDataResponse = await fetch(`https://askify-api.herokuapp.com/api/questions/queue`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })

    const queueDataJSON = await queueDataResponse.json()

    console.log(queueDataJSON);
  }


  render() {
    return (
      <Router>
        <div className="App">

          <Route path='/signin' component={ SignIn } />

          <Route path='/signup' component={ SignUp } />

          <Route path='/' component={ (props) => <Queue {...props} user={{
            userId: this.state.userId,
            firstName: this.state.firstName,
            inQueue: this.state.inQueue,
            queueOrder: this.state.queueOrder,
            cohort: this.state.cohort
            }} queue={this.state.queue}/> } />

          <Route path='/archive' component={ QuestionArchive } />

        </div>
      </ Router>
    );
  }
}

export default App;


/**/
