import React from 'react'
import classes from './style.module.scss'
import Nav from "./modules/nav";
import Main from './modules/main';
import Agenda from "./modules/agenda";

export default function Home() {

    return <h1 className={classes.home}>
        <Nav/>
        <Main/>
        <Agenda/>
    </h1>
}
