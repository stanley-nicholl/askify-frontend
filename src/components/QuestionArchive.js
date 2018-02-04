import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Footer, ArchiveList, QueueListHeader } from './commonComponents'
import Navigation from './commonComponents/Navigation'

import {
  fetchUser,
  logUserOut,
  updateQueuePosition
} from '../actions/user.actions'

import { fetchQueue } from '../actions/queue.actions'

import { fetchArchive } from '../actions/archive.actions'

const QuestionArchive = (props) => {
  if(!localStorage.getItem('askifyToken')) {
    console.log('no user')
      return <Redirect to="/" />
  }
  return (
      <div>
        <Navigation
            navItem={'Queue'}
            navRoute={'/queue'}
            fname={props.user.fname}
            queueOrder={props.user.order}
            logout={props.logout}
        />
        <QueueListHeader />
        <ArchiveList archive={props.archive} />
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionArchive)
