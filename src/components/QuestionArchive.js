import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Footer, ArchiveList, QueueListHeader } from './commonComponents'
import Navigation from './commonComponents/Navigation'

const QuestionArchive = (props) => {
  if(!props.user.id) {
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

export default QuestionArchive
