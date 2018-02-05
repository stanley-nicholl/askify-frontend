import React from 'react'

const AnswerItem = ({ id, name, answer }) => {
  return (

    <div className='d-flex row mx-0'>
      <div className="col-1 d-flex justify-content-center align-items-center">

      </div>
      <div className="col-3 d-flex align-items-center">
        <p className="element name"></p>
      </div>
      <div className="col-8 d-flex align-items-center">
        <p className="element name answer">{answer}</p>
      </div>
    </div>

  )
}

export default AnswerItem
