import React from 'react';
import classes from './style.module.scss';
import Nav from "./modules/nav";
import Main from './modules/main';
import Agenda from "./modules/agenda";
import {StateType} from "typesafe-actions";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';


function Home(props: StateType<any>) {

    const token = localStorage.getItem('token');
    console.log(props)
    if (props.user.user === null /*|| !token*/) return <Redirect to={'/login'}/>

    return (
        <h1 className={classes.home}>
            <Nav/>
            <Main/>
            <Agenda/>
        </h1>
    )
}

const mapStateToProps = (state: StateType<any>) => {

    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home)