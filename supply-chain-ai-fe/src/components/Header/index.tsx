import React, { useEffect, useState } from 'react'
import { Layout, Button, Drawer } from 'antd'
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import { MenuOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import './style.css'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(!visible)
  }

  // If you do not want to auto-close the mobile drawer when a path is selected
  // Delete or comment out the code block below
  // From here
  let { pathname: location } = useLocation()
  useEffect(() => {
    setVisible(false)
  }, [location])
  // Upto here

  return (
    <nav className='navbar'>
      <Layout>
        <Layout.Header className='nav-header'>
          <div className='logo mt-2'>
            <img src='./logo.svg' alt='logo' />
          </div>
          <div className='navbar-menu lg:justify-between lg:flex'>
            <div className='leftMenu'>
              <LeftMenu mode={'horizontal'} />
            </div>
            <Button className='menuButton' type='text' onClick={showDrawer}>
              <MenuOutlined className='transition delay-150 hover:scale-105 rounded-sm p-2 hover:bg-slate-200 duration-300' />
            </Button>
            <div className='rightMenu'>
              <RightMenu mode={'horizontal'} />
            </div>

            <Drawer
              title={'Brand Here'}
              placement='right'
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            >
              <LeftMenu mode={'inline'} />
              {/* <RightMenu mode={'inline'} /> */}
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  )
}

export default Navbar
