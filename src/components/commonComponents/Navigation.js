import React from 'react'

const Navigation = ({ navItem, firstName, queueOrder }) => {

    return (
        <nav className="navbar py-2 navigation">
            <a className="navbar-brand " href="#">
                <img src="styles/images/goose.jpeg" width="40" height="40" className="d-inline-block align-middle" alt="" />
                 ASKIFY
            </a>
            <div className="right-side d-flex align-items-center">
                <p className="mr-3 mb-0 text-white" id="greeting">Hello{firstName && `, ${firstName}`}</p>
                <div id="queueSpot" className="spot text-center mr-3 d-flex align-items-center justify-content-center">
                    <p className=' text-white font-weight-bold my-0'>{queueOrder}</p>
                </div>
                <a className="archived mb-0 mr-4 text-white nav-item" href="/archive.html">{navItem}</a>
            </div>
        </nav>
    )
}

export { Navigation }