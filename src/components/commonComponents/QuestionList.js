import React from 'react'
import QuestionItem from './QuestionItem'

const QuestionList = ({ queue }) => {
  const queuex = [
    {id: 1, firstName: 'stan', question: 'hello there'},
    {id: 2, firstName: 'kat', question: 'I am here'},
    {id: 3, firstName: 'ronald', question: 'hello there'},
  ]
    return (
      <div>
        {/* {queue.map((item, index)=>{
              return <QueueItem key={index+1}  name={item.name} question={item.question} />
          })} */}
      </div>


    )
}

export { QuestionList }
