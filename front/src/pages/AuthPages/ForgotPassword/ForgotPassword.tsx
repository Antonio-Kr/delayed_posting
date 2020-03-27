import React from 'react'
import classes from './../style.module.scss'
import { Button, Form, Input } from 'antd'
import { layout, tailLayout } from '../LoginPage'

export default function(props: any) {
  return (
    <div className={classes.sign}>
      <div className={classes.sign__form}>
        <h2 className={classes.sign__form_title}>Forgot Your Password?</h2>
        <Form
          {...layout}
          name="signUpForm"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your e-mail!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <div className={classes.socials_justify}>
              <Button size={'large'} type="primary" htmlType="submit">
                Reset
              </Button>
              <Button size={'large'}>Back</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
