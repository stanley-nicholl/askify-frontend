import React, { Component } from 'react'
import { Footer, QueueItem, QueueListHeader, QuestionList } from './commonComponents'
import Navigation from './commonComponents/Navigation'
import Hero from './commonComponents/Hero'
import { Redirect } from 'react-router-dom'
// import { fetchQueue } from '../actions/queue.actions'
// import { fetchUser, updateQueuePosition } from '../actions/user.actions'


const Queue = (props) => {
    if(!props.user.id) {
        return <Redirect to="/" />
    }
    return (
        <div>
          <div className='top-section'>
            <Navigation
                navItem={'Archived Questions'}
                fname={props.user.fname}
                queueOrder={props.user.queueOrder}
                logout={props.logout}
            />
            <Hero
              userId={props.user.userId}
              inQueue={props.user.inQueue}
              addToQueue={props.addToQueue}
              updateQueueStatus={props.updateQueueStatus}
            />
            <QueueListHeader />
          </div>
          <QuestionList
            queue={props.queue}
            updateQueueOrder={props.updateQueueOrder}
            currentUserId={props.user.id}
            currentQueueOrder={props.user.queueOrder}
          />
          <Footer />
        </div>
    )
}


export default Queue
