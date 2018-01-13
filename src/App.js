import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Queue from './components/Queue'
import QuestionArchive from './components/QuestionArchive'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      userToken : localStorage.getItem('askifyUserToken'),
      userId : null,
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