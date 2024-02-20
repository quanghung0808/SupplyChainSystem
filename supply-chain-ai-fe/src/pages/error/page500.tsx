import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const Page500: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Result
      status='500'
      title='500'
      subTitle='Sorry, something went wrong.'
      extra={
        <Button type='primary' className='bg-blue-500' onClick={() => navigate('home')}>
          Back Home
        </Button>
      }
    />
  )
}

export default Page500
