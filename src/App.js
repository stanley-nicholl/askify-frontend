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
      userId : 2,
      firstName : 'Kat',
      queueOrder : 0,
      programType : null,
      cohort : null,
      currentQuestion : null,
      inQueue : true,
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
        'Authorization': `Bearer ${token}`
      }
    })

    const queueDataJSON = await queueDataResponse.json()

    console.log(queueDataJSON);
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

          <Route path='/signin' component={ SignIn } />

          <Route path='/signup' component={ SignUp } />

          <Route path='/' component={ (props) => <Queue {...props} user={{
            userId: this.state.userId,
            firstName: this.state.firstName,
            inQueue: this.state.inQueue,
            queueOrder: this.state.queueOrder,
            cohort: this.state.cohort
            }}
            addToQueue={this.addToQueue}
            queue={this.state.queue}
            updateQueueOrder={this.updateQueueOrder}
            updateQueueStatus={this.updateQueueStatus}
            /> } />

          <Route path='/archive' component={ QuestionArchive } />

        </div>
      </Router>
    );
  }
}

export default App;


