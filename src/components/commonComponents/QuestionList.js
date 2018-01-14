import React from 'react'
import QuestionItem from './QuestionItem'

const QuestionList = ({ queue, updateQueueOrder, currentUserId, currentQueueOrder, updateQueueStatus }) => {
  const queuex = [
    {
        "id": 1,
        "question": "Can anyone help me with Golang?",
        "answered": true,
        "userid": 1,
        "firstName": 'Stan'
    },
    {
        "id": 2,
        "question": "asdfasdfasdf",
        "answered": true,
        "userid": 2,
        "firstName": 'Kat'
    },
    {
        "id": 3,
        "question": "How do I protect from posting bogus questions?",
        "answered": true,
        "userid": 3,
        "firstName": 'Roger'
    },
    {
        "id": 4,
        "question": "What is the air speed velocity of an unladen swallow?",
        "answered": false,
        "userid": 4,
        "firstName": 'Wes'
    },
    {
        "id": 5,
        "question": "What is your name?",
        "answered": false,
        "userid": 5,
        "firstName": 'Ron'
    },
    {
        "id": 6,
        "question": "What is your quest?",
        "answered": false,
        "userid": 6,
        "firstName": 'Matt'
    }
  ]
    return (
      <div className='question-list container'>
        {queuex.map((item, index)=>{
              return <QuestionItem key={index+1} id={item.id} count={index+1} currentUserId={currentUserId} questionUserId={item.userid} name={item.firstName} question={item.question} updateQueueOrder={updateQueueOrder} currentQueueOrder={currentQueueOrder}  />
          })}
      </div>


    )
}

export { QuestionList }
