import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const Page403: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
      extra={
        <Button type='primary' className='bg-blue-500' onClick={() => navigate('/login')}>
          Back Login
        </Button>
      }
    />
  )
}

export default Page403
