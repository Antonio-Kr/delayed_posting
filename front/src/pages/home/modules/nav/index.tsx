import React from "react";
import classes from './style.module.scss';
import {NavLink} from "react-router-dom";
import {Button} from 'antd'

export default function Nav() {
    return (
        <div className={classes.nav}>
            <NavLink className={classes.nav__link} to={'/:posts'}>Posts</NavLink>
            <NavLink className={classes.nav__link} to={'/:calendar'}>Calendar</NavLink>
            <NavLink className={classes.nav__link} to={'/:statistics'}>Statistics</NavLink>
            <NavLink className={classes.nav__link} to={'/:archive'}>Archive</NavLink>
        </div>
    )
}