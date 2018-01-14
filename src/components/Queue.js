import React, { Component } from 'react';
import { Hero, Footer, Navigation, QueueItem, ListHeader, QuestionList } from './commonComponents'

class Queue extends Component{
    constructor(props){
        super(props)
    }

    render(){

        return (
            <div>
              <div className='top-section'>
                <Navigation
                    navItem={'Archived Questions'}
                    firstName={this.props.user.firstName}
                    queueOrder={this.props.user.queueOrder}
                />
                <Hero
                  userId={this.props.user.userId}
                  inQueue={this.props.user.inQueue}
                  addToQueue={this.props.addToQueue}
                  updateQueueStatus={this.props.updateQueueStatus}
                />
                <ListHeader />
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
