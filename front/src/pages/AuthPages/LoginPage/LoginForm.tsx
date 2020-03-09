import {Button, Form, Input} from "antd";
import EmailItem from "../modules/EmailItem";
import {NavLink} from "react-router-dom";
import React from "react";
import {layout, tailLayout} from "./index";
import {sendRegistrationData} from "../../../redux/sagas/autorization";
import {IAuth, IUser} from "../../../types";
import {AuthActions} from "../../../redux/actions";

const LoginForm = (props: any) => {
    const [loginform] = Form.useForm();

    const onFinish = (values: any) => {
        // const user: IUser = {
        //     email: values.email,
        //     password: values.password
        // }
        const {email, password} = values;
        console.log('Success:', values);
        console.log(props);
        // sendRegistrationData(values);
        const user: IUser = {
            email, password
        }
        const auth: IAuth = {
            isLogin: false,
            inRegisterProcess: true
        }
        props.sendAuthData(auth);
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
                <Button type="primary" htmlType="submit"
                        loading={props.inRegisterProcess}
                >
                    Log In Now
                </Button>
                <Button type={'link'}>
                    <NavLink to={'/recoverypass'}>Forgot your password?</NavLink>
                </Button>
            </Form.Item>
        </Form>
    );
}
export default LoginForm;