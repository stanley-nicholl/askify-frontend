import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Hero, Footer, Navigation, QueueItem, QueueListHeader, QuestionList } from './commonComponents'
import { Redirect } from 'react-router-dom'


class Queue extends Component{
    constructor(props){
        super(props)
        console.log('queue constructor')
    }

    render(){
        if(!this.props.user.id) {
            return <Redirect to="/" />
        }
        return (
            <div>
              <div className='top-section'>
                <Navigation
                    navItem={'Archived Questions'}
                    fname={this.props.user.fname}
                    queueOrder={this.props.user.queueOrder}
                    logout={this.props.logout}
                />
                <Hero
                  userId={this.props.user.userId}
                  inQueue={this.props.user.inQueue}
                  addToQueue={this.props.addToQueue}
                  updateQueueStatus={this.props.updateQueueStatus}
                />
                <QueueListHeader />
              </div>
              <QuestionList
                queue={this.props.queue}
                updateQueueOrder={this.props.updateQueueOrder}
                currentUserId={this.props.user.userId}
                currentQueueOrder={this.props.user.queueOrder}
              />
              <Footer />
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ fetchQueue }, dispatch)
// }

export default Queue
