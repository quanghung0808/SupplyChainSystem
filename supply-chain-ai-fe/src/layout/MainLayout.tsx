import { Breadcrumb, Layout, theme } from 'antd'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Header'
const { Content, Footer } = Layout

export const MainLayout: FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: '100vh',
            padding: 24,
            borderRadius: borderRadiusLG
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  )
}
