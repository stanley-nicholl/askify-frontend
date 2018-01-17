import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const Navigation = ({ navItem, logout, user, navRoute }) => {
  return (
      <nav className="navbar py-2 navigation">
          <a className="navbar-brand " href="#">
              <img src="styles/images/goose.jpeg" width="40" height="40" className="d-inline-block align-middle" alt="" />
               ASKIFY<small className='powered-by text-white'>powered by galvanize</small>
          </a>
          <div className="right-side d-flex align-items-center">
              <p className="mr-3 mb-0 text-white" id="greeting">Hello{user.fname && `, ${user.fname}`}</p>
              <div id="queueSpot" className="spot text-center mr-3 d-flex align-items-center justify-content-center">
                  <p className=' text-white font-weight-bold my-0'>{user.order}</p>
              </div>
              <a className="archived mb-0 mr-4 text-white nav-item" href={navRoute}>{navItem}</a>
              <span className="archived mb-0 mr-4 text-white nav-item log-out" onClick={ logout }>Log out</span>
          </div>
      </nav>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Navigation)
