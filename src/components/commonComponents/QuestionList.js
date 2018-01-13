import React from 'react'
import QuestionItem from './QuestionItem'

const QuestionList = () => {
    return (
        <div className='queue-section container'>
            {this.props.queue.map( item => {
                return <QuestionItem item={item} />
            })}
        </div>
    )
}

export { QuestionList }
