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
                <Hero />
                <ListHeader />
              </div>
              <QuestionList queue={this.props.queue} />
              <Footer />
            </div>
        )
    }
}

export default Queue