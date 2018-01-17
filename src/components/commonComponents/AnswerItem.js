import React from 'react'

const AnswerItem = ({ id, name, answer }) => {
  return (

    <div className='d-flex row py-3'>
      <div className="col-1 d-flex justify-content-center align-items-center">
        <p className="element queueNum">{id}</p>
      </div>
      <div className="col-3 d-flex align-items-center">
        <p className="element name">{name}</p>
      </div>
      <div className="col-3 d-flex align-items-center">
        <p className="element name">{answer}</p>
      </div>
    </div>

  )
}

export default AnswerItem
