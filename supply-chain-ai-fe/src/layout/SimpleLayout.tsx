import { Layout } from 'antd'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
const { Footer } = Layout

export const SimpleLayout: FC = () => {
  return (
    <Layout>
      <Layout.Header className='nav-header'>
        <div className='logo mt-2'>
          <img src='./logo.svg' alt='logo' />
        </div>
      </Layout.Header>
      <Outlet />
      <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  )
}
