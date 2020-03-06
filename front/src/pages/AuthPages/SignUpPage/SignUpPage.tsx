import React from 'react'
import classes from '../style.module.scss'
import SignUpLoginPage, {signType} from '../modules/signUp/signUp'
import {connect} from 'react-redux'
import {SignUpForm} from "./SignUpForm";
import {UserActions} from "../../../redux/actions";

function SignUpPage(props: any) {
    const signName: signType = {
        message: 'Already have an account',
        linkName: 'Log In',
        path: '/login',
    }

    return (
        <div className={classes.sign}>
            <SignUpLoginPage {...signName} />
            <div className={classes.sign__form}>
                <h2 className={classes.sign__form_title}>Log in</h2>
                <SignUpForm />
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: any) => {
}

export default connect(null, mapDispatchToProps)(SignUpPage)