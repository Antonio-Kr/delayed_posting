import React, {useEffect} from 'react'
import classes from '../style.module.scss'
import SignUpLoginPage, {signType} from '../modules/signUp/signUp'
import {connect} from 'react-redux'
import {SignUpForm} from "./SignUpForm";
import {UserActions} from "../../../redux/actions";
import {IUser} from '../../../types';
import {StateType} from "typesafe-actions";
import {SentRegister} from "../modules/sentRegigter";

function SignUpPage(props: any) {
    const signName: signType = {
        message: 'Already have an account',
        linkName: 'Log In',
        path: '/login',
    }
    return (
        <div className={classes.sign}>
            {props.user !== null
                ? <SentRegister history={props.history}/>
                : <>
                    <SignUpLoginPage {...signName} />
                    <div className={classes.sign__form}>
                        <h2 className={classes.sign__form_title}>Log in</h2>
                        <SignUpForm setUser={props.setUser}/>
                    </div>
                </>
            }
        </div>
    )
}

const mapStateToProps = (state: StateType<any>) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = {
    setUser: (user: IUser) => (UserActions.setUser(user))
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)