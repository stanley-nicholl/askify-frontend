import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { signIn } from '../actions/user.actions'

const SignIn = ({ setUserDataToState, history, ...props }) => {

  const signInPrep = (e) => {
    e.preventDefault()
    const payload={
      email: e.target.email.value,
      password: e.target.password.value,
    }

    props.signIn(payload)
  }

  return (
      <div>

        <div className="signin-homepage-video-section">
          <div className="video-background hidden-sm hidden-xs">
            <video preload="true" autoPlay="true" loop="true" className="video" poster="https://s3-us-west-2.amazonaws.com/dotcom-files/video_hero_bg_poster.png">
              <source src="https://s3-us-west-2.amazonaws.com/dotcom-files/hero_video.mp4" type="video/mp4" />
            </video>
            <div className="signin-overlay"></div>
          </div>

        </div>
        <div className="signin-container d-flex align-items-center justify-content-between">
          <div className='d-flex flex-column justify-content-center'>
            <div className='d-flex align-items-end'>
              <h1 className='title mb-0'>ASKIFY</h1>
              <small className='powered-by text-white mb-3'>powered by galvanize</small>
            </div>

            <h2 className="headline">a place to get & give help</h2>
            <h3 className="sub-headline">Learn. Work. Grow.</h3>
          </div>
          <form className="signin form-elegant" onSubmit={e => signInPrep(e)}>

            {/* <!--Form without header--> */}
            <div className="card">

                <div className="card-body mx-4">

                    {/* <!--Header--> */}
                    <div className="text-center">
                        <h3 className="dark-grey-text mb-5 form-title"><strong>Sign In</strong></h3>
                    </div>

                    {/* <!--Body--> */}
                    <div className="md-form">
                        <input type="text" id="Form-email1" name='email' className="form-control" required/>
                        <label htmlFor="Form-email1">Your email</label>
                    </div>

                    <div className="md-form pb-1">
                        <input type="password" id="Form-pass1" name='password' className="form-control" required/>
                        <label htmlFor="Form-pass1">Your password</label>
                    </div>

                    <div className='d-flex justify-content-center mt-0 mb-4'>
                      <small id='signinError'></small>
                    </div>

                    <div className="text-center mb-3">
                        <button type="submit" className="btn btn-block btn-rounded z-depth-1a signin-btn">Sign in</button>
                    </div>
                    <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> (coming soon) or Sign in with:</p>

                        <div className="row my-3 d-flex justify-content-center">
                            {/* <!--Facebook--> */}
                            <button type="button" className="btn btn-white btn-rounded mr-md-3 z-depth-1a" disabled><i className="fa fa-github text-center"></i></button>
                            {/* <!--Twitter--> */}
                            <button type="button" className="btn btn-white btn-rounded mr-md-3 z-depth-1a" disabled><i className="fa fa-twitter"></i></button>
                            {/* <!--Google +--> */}
                            <button type="button" className="btn btn-white btn-rounded z-depth-1a"><i className="fa fa-google-plus" disabled></i></button>
                        </div>

                </div>

                {/* <!--Footer--> */}
                <div className="modal-footer mx-5 pt-3 mb-1">
                    <p className="font-small grey-text d-flex justify-content-end">Not a member?
                      <Link to={'/signup'}>
                        <span className="ml-1 link"> Sign Up</span>
                      </Link>
                    </p>
                </div>

            </div>
            {/* <!--/Form without header--> */}

        </form>
        </div>

      </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({signIn}, dispatch)
}

export default connect(null, mapDispatchToProps)(SignIn)
