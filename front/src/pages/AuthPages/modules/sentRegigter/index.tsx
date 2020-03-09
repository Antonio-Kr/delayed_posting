import React from "react";
import {CheckOutlined} from '@ant-design/icons';
import {Button} from "antd";
import classes from './style.module.scss';
import {NavLink} from "react-router-dom";


export const SentRegister = (props: any) => {
    return (
        <div className={classes.sentRegister}>
            <h3><CheckOutlined/> Check your email and confirm registration.</h3>
            <Button
                onClick={props.history.goBack}
                size={'large'}
            >Back</Button>
            <NavLink to={'/'}><Button type={"link"}>HOME</Button></NavLink>
        </div>
    )
}