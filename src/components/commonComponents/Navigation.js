import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  logUserOut
} from '../../actions/user.actions'

const Navigation = ({ navItem, logout, user, navRoute, logUserOut }) => {
  return (
      <nav className="navbar py-2 navigation">
          <a className="navbar-brand" href="https://askify.surge.sh">
              <h1 className="d-inline-block align-middle" alt="">
               ASKIFY<small className='powered-by text-white'>powered by galvanize</small>
             </h1>
          </a>
          <div className="right-side d-flex align-items-center">
              <p className="mr-3 mb-0 text-white" id="greeting">Hello{user.fname && `, ${user.fname}`}</p>
              <div id="queueSpot" className="spot text-center mr-3 d-flex align-items-center justify-content-center">
                  <p className=' text-white font-weight-bold my-0'>{user.order}</p>
              </div>
              <Link to={navRoute} className='nav-item mb-0 mr-4 text-white'>
                {navItem}
              </Link>
              <p className="mb-0 mr-4 text-white nav-item log-out" onClick={e => logUserOut()}>Log out</p>
          </div>
      </nav>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ logUserOut }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
