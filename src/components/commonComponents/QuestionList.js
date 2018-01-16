import React from 'react'
import QuestionItem from './QuestionItem'

const QuestionList = ({ queue, updateQueueOrder, currentUserId, currentQueueOrder, updateQueueStatus }) => {
    return (
      <div className='question-list container'>
        {queue.map((item, index)=>{
              return <QuestionItem key={index+1} id={item.id} count={index+1} currentUserId={currentUserId} questionUserId={item.userid} name={item.firstName} question={item.question} updateQueueOrder={updateQueueOrder} currentQueueOrder={currentQueueOrder}  />
          })}
      </div>


    )
}

export { QuestionList }
