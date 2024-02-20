import { Content } from 'antd/es/layout/layout'
import Image from '../../assets/images/backgroundLogin.png'
import Register from 'components/Form/Register'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
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
          <div className='font-bold text-3xl px-10 pb-5'>Register</div>
          <div className=''>
            <Register />
          </div>
        </div>
        <div className='text-center max-w-screen-sm'>
          Already have account?{' '}
          <a className='text-blue-500 font-semibold' onClick={() => navigate('/login')}>
            Log in
          </a>
        </div>
      </div>
    </Content>
  )
}

export default RegisterPage
