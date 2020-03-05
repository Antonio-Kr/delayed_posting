import React from 'react'
import classes from '../style.module.scss'
import SignUpLoginPage, {signType} from '../modules/signUp/signUp'
import {Form, Button, Input} from 'antd'
import SocialAuthButtons from '../modules/SocialAuthButtons/SocialAuthButtons'
import {layout, tailLayout} from '../LoginPage'
import EmailItem from "../modules/EmailItem";

export default function SignUpPage(props: any) {
    const signName: signType = {
        message: 'Already have an account',
        linkName: 'Log In',
        path: '/login',
    }
    return (
        <div className={classes.sign}>
            <SignUpLoginPage {...signName} />
            <div className={classes.sign__form}>
                <h2 className={classes.sign__form_title}>Log in</h2>
                <Form
                    {...layout}
                    name="signUpForm"
                    initialValues={{remember: true}}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please input your e-mail!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <EmailItem/>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label="Confirm password"
                        name="passwordConfirm"
                        rules={[
                            {required: true, message: 'Please repeat your password!'},
                            ({getFieldValue}) => ({
                                validator(rule: any, value: string) {

                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(`Your passwords don't match!`);
                                }
                            })
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <div className={classes.socials_justify}>
                            <Button type="primary" htmlType="submit">
                                Sign Up Now
                            </Button>
                            <span>or</span>
                            <SocialAuthButtons/>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
