import React, { Component } from 'react';
import { Footer, ArchiveList, QueueListHeader } from './commonComponents'
import Navigation from './commonComponents/Navigation'

class QuestionArchive extends Component{

    render(){
        return (
            <div>
              <Navigation
                  navItem={'Queue'}
                  fname={this.props.user.fname}
                  queueOrder={this.props.user.queueOrder}
              />
              <QueueListHeader />
              <ArchiveList questionArchive={this.props.questionArchive} />
            </div>
        )
    }
}

export default QuestionArchive
