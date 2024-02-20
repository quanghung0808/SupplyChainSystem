import React from 'react'
import { Menu, MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

const LeftMenu = ({ mode }: MenuProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
  return (
    <Menu
      mode={mode}
      disabledOverflow={true}
      defaultSelectedKeys={location.pathname === '/home' ? ['home'] : ['workspace']}
    >
      <Menu.Item key='home' onClick={() => navigate('/home')}>
        Home
      </Menu.Item>
      <Menu.Item key='workspace' onClick={() => navigate('/workspace')}>
        Workspace
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu
