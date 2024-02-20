/* eslint-disable react/prop-types */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { LoginForm } from 'common/@type'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/configStore'
import { register } from '../../redux/auth/authSlice'
import { FC } from 'react'

const Register: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleRegister = async (values: LoginForm) => {
    const res = await dispatch(register(values))

    if (res.type === 'auth/login/fulfilled') navigate('/home')
  }

  return (
    <Form
      initialValues={{
        remember: true
      }}
      onFinish={handleRegister}
    >
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên đăng nhập !'
          },
          {
            min: 6,
            message: 'Tên đăng nhập cần ít nhất 6 kí tự.'
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
          },
          {
            min: 6,
            message: 'Tên đăng nhập cần ít nhất 6 kí tự.'
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
      <Form.Item
        name='confirmPassword'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu !'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Mật khẩu và xác nhận mật khẩu không khớp.'))
            }
          })
        ]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon p-2' />}
          type='password'
          placeholder='Xác nhận mật khẩu'
        />
      </Form.Item>
      <Form.Item>
        <Button size={'large'} type='primary' htmlType='submit' className='w-full bg-blue-500'>
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Register
