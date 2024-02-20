import { Menu, Avatar, MenuProps } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../redux/configStore'
import { logout } from '../../redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const RightMenu = ({ mode }: MenuProps) => {
  const { userAuth } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await dispatch(logout(navigate))
    navigate('/login')
  }
  return (
    <Menu mode={mode} disabledOverflow={true}>
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className='username mr-2 font-semibold'>Hello {userAuth.username}</span>
          </>
        }
      >
        <Menu.Item key='log-out' onClick={() => handleLogout()}>
          <LogoutOutlined /> Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export default RightMenu
