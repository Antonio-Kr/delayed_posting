import React from 'react'
import classes from './../style.module.scss'
import {Button, Form} from 'antd'
import {layout, tailLayout} from '../LoginPage'
import EmailItem from "../modules/EmailItem";

export default function (props: any) {


    return (
        <div className={classes.sign}>
            <div className={classes.sign__form}>
                <h2 className={classes.sign__form_title}>Forgot Your Password?</h2>
                <ForgotPassForm {...props}/>
            </div>
        </div>
    )
}

const ForgotPassForm = (props: any) => {

    const [resetform] = Form.useForm();
    const onFinish = (values: any) => {

        // TODO: send saga's
        console.log(values);
        resetform.resetFields();
    };

    return (
        <Form
            {...layout}
            form={resetform}
            name="signUpForm"
            initialValues={{remember: true}}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
        >
            <EmailItem/>
            <Form.Item {...tailLayout}>
                <div className={classes.socials_justify}>
                    <Button size={'large'} type="primary" htmlType="submit">
                        Reset
                    </Button>
                    <Button
                        onClick={props.history.goBack}
                        size={'large'}
                    >Back</Button>
                </div>
            </Form.Item>
        </Form>
    )
}