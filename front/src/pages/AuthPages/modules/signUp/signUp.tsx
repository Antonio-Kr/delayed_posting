import classes from './signUp.module.scss'
import {NavLink} from 'react-router-dom'
import React from 'react'

export type signType = {
    message: string
    path: string
    linkName: string
}
export default function SignUpLoginPage(props: signType) {
    return (
        <div className={classes.signUp}>
            <p>
                {props.message}
                <NavLink to={props.path} className={classes.signUp_link}>
                    {props.linkName}
                </NavLink>
            </p>
        </div>
    )
}
