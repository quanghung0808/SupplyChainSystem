import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/configStore'
import { useEffect, useState } from 'react'
import { getProducts } from '../../redux/product/productSlice'
import Report from 'components/Form/Report'
import Forecast from 'components/Forecast/Forecast'
import { Col, Row, Spin } from 'antd'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [visible, setVisible] = useState<boolean>(false)
  // const [loading, setLoading] = useState<boolean>(false)
  const { isLoading, forecast } = useAppSelector((state) => state.forecast)
  console.log(forecast)
  useEffect(() => {
    dispatch(getProducts(navigate))
  }, [])

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Report setVisible={setVisible} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {forecast.length === 0 && visible ? (
            <div className='block text-center mt-20'>
              <Spin size='large' />
            </div>
          ) : visible ? (
            <Forecast forecast={forecast} />
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default Home
