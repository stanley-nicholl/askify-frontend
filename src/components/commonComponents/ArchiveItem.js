import React from 'react'

const ArchiveItem = ({ id, name, question }) => {
  return (
    <div className='d-flex row question-item py-3'>
      <div className="col-1 d-flex justify-content-center align-items-center">
        <p className="element queueNum">{id}</p>
      </div>
      <div className="col-3 d-flex align-items-center">
        <p className="element name">{name}</p>
      </div>
      <div className="col-6 d-flex align-items-center">
        <p className="element topic" id="${id}-question">{question}</p>
      </div>
      <div className="col-2 d-flex flex-column align-items-center justify-content-center">
        <button type="button" id="${id}-edit" className='btn btn-warning waves-effect btn-sm item-button mt-2'>Edit</button>
        <button type="button" id="${id}-answered" className='btn waves-effect btn-sm item-button mt-2 answered-btn'>Answered</button>
      </div>
    </div>
  )
}

export { ArchiveItem }
