/* eslint-disable react/prop-types */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, notification } from 'antd'
import { LoginForm } from 'common/@type'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/configStore'
import { login } from '../../redux/auth/authSlice'
import { FC } from 'react'

const Login: FC = () => {
  const [api, contextHolder] = notification.useNotification()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isSuccess, message } = useAppSelector((state) => state.auth)

  const handleLogin = async (values: LoginForm) => {
    console.log(values)
    const res = await dispatch(login(values))
    console.log(isSuccess)
    if (isSuccess === false) {
      console.log(message)
      api['error']({
        message: message
      })
    }
    if (res.type === 'auth/login/fulfilled') navigate('/home')
  }

  return (
    <Form
      initialValues={{
        remember: true
      }}
      onFinish={handleLogin}
    >
      {contextHolder}

      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên đăng nhập !'
          }
        ]}
      >
        <Input
          style={{ height: '3rem' }}
          prefix={<UserOutlined className='site-form-item-icon p-2' />}
          placeholder='Tên đăng nhập'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu !'
          }
        ]}
      >
        <Input
          style={{ height: '3rem' }}
          prefix={<LockOutlined className='site-form-item-icon p-2' />}
          type='password'
          placeholder='Mật khẩu'
        />
      </Form.Item>
      <Form.Item>
        <Button size={'large'} type='primary' htmlType='submit' className='w-full bg-blue-500'>
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
