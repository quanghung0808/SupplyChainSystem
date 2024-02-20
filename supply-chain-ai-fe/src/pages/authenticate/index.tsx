import { Content } from 'antd/es/layout/layout'
import Login from 'components/Form/Login'
import Image from '../../assets/images/backgroundLogin.png'
import { useNavigate } from 'react-router-dom'

const Authenticate = () => {
  const navigate = useNavigate()
  return (
    <Content
      className='min-h-screen'
      style={{
        padding: 24,
        margin: 0,
        background: 'white',
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover'
      }}
    >
      <div className='my-16 mx-10'>
        <div className='h-40 max-w-screen-sm flex justify-center'>
          <img src={'./logo.svg'} className='mr-2 h-full w-96 py-1' alt='' />
        </div>
        <div className='items-center max-w-screen-sm'>
          <div className='font-bold text-3xl px-10 pb-5'>Log in</div>
          <div className=''>
            <Login />
          </div>
        </div>
        <div className='text-center max-w-screen-sm'>
          Don't have account?{' '}
          <a className='text-blue-500 font-semibold' onClick={() => navigate('/register')}>
            Register
          </a>
        </div>
      </div>
    </Content>
  )
}

export default Authenticate
