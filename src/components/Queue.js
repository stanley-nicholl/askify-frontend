import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Footer, QueueItem, QueueListHeader, QuestionList } from './commonComponents'
import Navigation from './commonComponents/Navigation'
import Hero from './commonComponents/Hero'
import { Redirect } from 'react-router-dom'
// import { fetchQueue } from '../actions/queue.actions'
// import { fetchUser, updateQueuePosition } from '../actions/user.actions'



class Queue extends Component{
    constructor(props){
        super(props)
    }

    // async componentDidMount () {
    //   const token = await window.localStorage.getItem('askifyToken')
    //   if(token){
    //     // const queue = await this.props.fetchQueue(token)
    //     // this.props.updateQueuePosition(this.props.user, this.props.queue)
    //   }
    // }

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
                currentUserId={this.props.user.id}
                currentQueueOrder={this.props.user.queueOrder}
              />
              <Footer />
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ fetchQueue, updateQueuePosition, fetchUser }, dispatch)
// }

export default Queue
