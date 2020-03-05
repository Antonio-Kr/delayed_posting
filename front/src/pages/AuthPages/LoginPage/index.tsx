import React from 'react'
import classes from '../style.module.scss'
import {Form, Input, Button} from 'antd'
import {NavLink} from 'react-router-dom'
import SignUpLoginPage, {signType} from '../modules/signUp/signUp'
import SocialAuthButtons from '../modules/SocialAuthButtons/SocialAuthButtons'
import EmailItem from "../modules/EmailItem";

export const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
}
export const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
}

export type LoginFormValueType = {
    email: string
    password: string
}


export default function LoginPage() {

    const signName: signType = {
        message: "Don't have an account",
        linkName: 'Sign Up',
        path: '/signup',
    }

    return (
        <div className={classes.sign}>
            <SignUpLoginPage {...signName} />
            <div className={classes.sign__form}>
                <h2 className={classes.sign__form_title}>Log in</h2>
                <LoginForm/>
                <div className={classes.textCenter}>
                    or
                    <div className={classes.socials}>
                        Log In with:
                        <SocialAuthButtons/>
                    </div>
                </div>
            </div>
        </div>
    )
}


const LoginForm = () => {
    const [loginform] = Form.useForm();


    const onFinish = (values: any) => {
        console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    const formChange = (formName: string,
                        info: { values: string, forms: string }) => {
        console.log(info.values, info.forms)
    }

    return (

        <Form
            {...layout}
            name="login"
            form={loginform}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <EmailItem/>
            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}

            >
                <Input.Password/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Log In Now
                </Button>
                <Button type={'link'}>
                    <NavLink to={'/recoverypass'}>Forgot your password?</NavLink>
                </Button>
            </Form.Item>
        </Form>
    );
}