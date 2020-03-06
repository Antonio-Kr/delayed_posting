import React from "react";
import {layout, tailLayout} from "../LoginPage";
import {Button, Form, Input} from "antd";
import EmailItem from "../modules/EmailItem";
import classes from "../style.module.scss";
import SocialAuthButtons from "../modules/SocialAuthButtons/SocialAuthButtons";


export const SignUpForm = (props: any) => {

    interface ValuesType {
        name: string
        email: string
        password: string
        passwordConfirm: string
    }

    const onFinish = (values: any) => {
        const {name, email, password} = values; //
        const user = {
            name,
            email,
            password
        }
        // TODO: send user to server
        //    if ( ok ) => store add user
        //    error => show error

    }

    return (
        <Form
            {...layout}
            name="signUpForm"
            initialValues={{remember: true}}
            onFinish={onFinish}
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
                // name="passwordConfirm"
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
    )
}