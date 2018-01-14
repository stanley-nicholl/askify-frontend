import React from 'react'

const Hero = () => {

    const submitQuestion = (e) => {
        e.preventDefault()
        const question = e.target.questionText.value
        
    }

    return (
        <div className='jumbotron-fluid'>
            <form onSubmit={e => submitQuestion(e)} class="d-flex justify-content-between form-group container align-items-end">
                <input className="form-control form-control-lg mr-5 pt-4 px-2 mb-0 pb-2 text-white flex-stretch question"
                    type="text" placeholder="What's got you blocked?"
                    name="questionText"
                    required
                />
                <button type="submit"
                    className="btn btn-warning btn-rounded px-5 py-4 mb-0 question-btn"
                    id="add-request"
                >
                    ASKIFY!
                </button>
            </form>
        </div>
    )
}

export { Hero }