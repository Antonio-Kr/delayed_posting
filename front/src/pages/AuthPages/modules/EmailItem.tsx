import {Form, Input} from "antd";
import React from "react";

export default function EmailItem(props: any) {
    return (
        <Form.Item
            label="Email"
            name="email"
            validateStatus={ props.loginError ? "error" : "success" }
            rules={[{required: true, message: 'Please input your e-mail!'},
                ({getFieldValue}) => ({
                    validator(rule: any, value: string) {
                        const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        if (!value || pattern.test(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject('Your e-mail is wrong!');
                    },
                })
            ]}
        >
            <Input/>
        </Form.Item>
    )
}
