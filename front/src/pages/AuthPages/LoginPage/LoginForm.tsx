import React from "react";
import {Button, Form, Input, Typography, Row, Col} from "antd";
import EmailItem from "../modules/EmailItem";
import {NavLink} from "react-router-dom";
import {layout, tailLayout} from "./index";


const {Text} = Typography;

const LoginForm = (props: any) => {
    const [loginform] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(props);
        const {email, password} = values;
        console.log('Success:', values);

        // sendRegistrationData(values);
        props.sendAuthData({email, password});
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
            {
                props.loginError &&
                <Row justify={"center"}>
                    <Col>
                        <Text type="danger">Incorrect e-mail or password</Text>
                    </Col>
                </Row>
            }
            <EmailItem loginError={props.loginError}/>
            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
                validateStatus={props.loginError ? "error" : "success"}

            >
                <Input.Password/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit"
                        loading={props.isLoginFetching}
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