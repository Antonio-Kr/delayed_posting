import React from 'react';
import classes from '../style.module.scss';
import SignUpLoginPage, {signType} from '../modules/signUp/signUp';
import SocialAuthButtons from '../modules/SocialAuthButtons/SocialAuthButtons';
import {connect} from "react-redux";
import {IUser} from "../../../types";
import {AuthActions} from "../../../redux/actions";
import LoginForm from './LoginForm';

export const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
}
export const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
}

function LoginPage(props: any) {

    const signName: signType = {
        message: "Don't have an account",
        linkName: 'Sign Up',
        path: '/signup',
    }
    return (
        <div className={classes.sign}>
            <SignUpLoginPage {...signName} />
            <div className={classes.sign__form}>
                <h2 className={classes.sign__form_title}>Log in</h2>
                <LoginForm
                    isFetching={props.isFetching}
                    isLoginFetching={props.isLoginFetching}
                    sendAuthData={props.sendAuthData}
                    loginError={props.loginError}
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
        isLoginFetching: state.auth.isLoginFetching,
        loginError: state.auth.loginError
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        sendAuthData: (user: IUser) => dispatch(AuthActions.login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
