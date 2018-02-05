import React, { Component } from 'react'
import { Footer, QueueItem, QueueListHeader, QuestionList } from './commonComponents'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Navigation from './commonComponents/Navigation'
import Hero from './commonComponents/Hero'

import {
  fetchUser,
  logUserOut,
  updateQueuePosition
} from '../actions/user.actions'

import { fetchQueue } from '../actions/queue.actions'

import { fetchArchive } from '../actions/archive.actions'

const Queue = (props) => {
    return (
        <div>
          <div className='top-section'>
            <Navigation
                navItem={'Archive'}
                navRoute={'/archive'}
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


function mapStateToProps (state) {
  return {
    queue: state.queue,
    archive: state.archive,
    user: state.user,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUser,
    logUserOut,
    fetchQueue,
    updateQueuePosition,
    fetchArchive
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Queue)
