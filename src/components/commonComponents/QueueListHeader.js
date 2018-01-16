import React from 'react'

const QueueListHeader = () => {
    return (
        <div className="list-head stick-top">
            <div className="container">
                <div className="header row mt-0 pt-2">
                    <div className="col-1 d-flex justify-content-center">
                        <h5>#</h5>
                    </div>
                    <div className="col-3">
                        <h5>Name</h5>
                    </div>
                    <div className="col-6">
                        <h5>Question</h5>
                    </div>
                    <div className="col-2 d-flex justify-content-center">
                        <h5>Actions</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { QueueListHeader }
