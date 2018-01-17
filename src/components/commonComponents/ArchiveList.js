import React from 'react'
import ArchiveItem from './ArchiveItem'

const ArchiveList = ({ archive }) => {
    return (
      <div className='archive-list container'>
        {archive.map((item, index)=>{
          console.log(item);
            return <ArchiveItem key={index+1} id={item.id} count={index+1} name={item.fname} question={item.question} answers={item.answers} />
        })}
      </div>
    )
}

export { ArchiveList }
