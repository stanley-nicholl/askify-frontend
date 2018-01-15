import React, { Component } from 'react';
import { Hero, Footer, Navigation, QueueItem, QueueListHeader, QuestionList } from './commonComponents'
import { Redirect } from 'react-router-dom'

class Queue extends Component{
    constructor(props){
        super(props)
    }

    render(){
        if (!this.props.loggedIn) {
            return (
                <Redirect to='/' />
            )
        } else 

        return (
            <div>
              <div className='top-section'>
                <Navigation
                    navItem={'Archived Questions'}
                    fname={this.props.user.fname}
                    queueOrder={this.props.user.queueOrder}
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

export default Queue
