import React from 'react'
import classes from '../style.module.scss'
import SignUpLoginPage, {signType} from '../modules/signUp/signUp'
import SocialAuthButtons from '../modules/SocialAuthButtons/SocialAuthButtons'
import {StateType} from "typesafe-actions";
import {connect} from "react-redux";
import {IAuth} from "../../../types";
import {AuthActions} from "../../../redux/actions";
import LoginForm from './LoginForm'

export const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
}
export const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
}

export type LoginFormValueType = {
    email: string
    password: string
}

function LoginPage(props: any) {

    const signName: signType = {
        message: "Don't have an account",
        linkName: 'Sign Up',
        path: '/signup',
    }
    // UserApi.getUserData().then(console.log)
    return (
        <div className={classes.sign}>
            <SignUpLoginPage {...signName} />
            <div className={classes.sign__form}>
                <h2 className={classes.sign__form_title}>Log in</h2>
                <LoginForm
                    isFetching={props.isFetching}
                    inRegisterProcess={props.inRegisterProcess}
                    sendAuthData={props.sendAuthData}
                />
                <div className={classes.textCenter}>
                    or
                    <div className={classes.socials}>
                        Log In with:
                        <SocialAuthButtons/>
                    </div>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        isFetching: state.user.isFetching,
        inRegisterProcess: state.auth.inRegisterProcess
    }
}

const mapDispatchToProps = {
    sendAuthData: (payload: IAuth) => (AuthActions.authenticationInProgress(payload))
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)