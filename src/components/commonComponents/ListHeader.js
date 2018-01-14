import React from 'react'

const ListHeader = () => {
    return (
        <div className="list-head stick-top">
            <div className="container">
                <div className="header row mt-0 py-3">
                    <div className="col-1 d-flex justify-content-center">
                        <h3>#</h3>
                    </div>
                    <div className="col-3">
                        <h3>Name</h3>
                    </div>
                    <div className="col-6">
                        <h3>Topic</h3>
                    </div>
                    <div className="col-2 d-flex justify-content-center">
                        <h3>Actions</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ListHeader }
