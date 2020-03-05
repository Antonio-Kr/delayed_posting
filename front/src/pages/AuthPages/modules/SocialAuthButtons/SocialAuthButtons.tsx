import React from "react";
import classes from "./style.module.scss";
import {Button} from 'antd';

export default function SocialAuthButtons() {


    return (
        <div className={classes.socials__items}>
            <Button shape={"circle"} size={"large"} className={classes.socials__items_item}>F</Button>
            <Button shape={"circle"} size={"large"} className={classes.socials__items_item}>G</Button>
        </div>
    );
}