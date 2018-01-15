import React, { Component } from 'react';
import { Footer, Navigation, ArchiveList, QueueListHeader } from './commonComponents'

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
