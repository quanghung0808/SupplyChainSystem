/* eslint-disable react/prop-types */
import { Button, Form, Input, Select, Spin } from 'antd'
import { ReportForm } from 'common/@type'
import { useAppDispatch, useAppSelector } from '../../redux/configStore'
import { useEffect, useState } from 'react'
import { destination, starting_point, vehicle, weather } from 'fake'
import Weather from '../../assets/images/weather.png'
import { forecast, getForecastReport, getWorkspacesByProductId } from 'apis/api'
import { setIsLoading } from '../../redux/forecast/forecastSlice'

const { Option } = Select
interface ReportProps {
  setVisible: (visible: boolean) => void
}
const Report = ({ setVisible }: ReportProps) => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const { products } = useAppSelector((state) => state.product)
  const [workspaces, setWorkspaces] = useState([])
  const [isHidden, setIsHidden] = useState(true)
  const [currentWeather, setCurrentWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const random = Math.floor(Math.random() * weather.length)
    const r_weather = weather[random]
    setCurrentWeather(r_weather)
    form.setFieldsValue({
      weather: r_weather.type
    })
  }, [])
  const handleReport = async (values: ReportForm) => {
    const response = await forecast(values)
    console.log(response)
    dispatch(setIsLoading(true))
    const forecasts = await getForecastReport(response?.id)
    setVisible(true)
    form.resetFields()
  }

  const handleChange = async (value: string | string[]) => {
    setIsHidden(true)
    setLoading(false)
    const response = await getWorkspacesByProductId(value)
    console.log(response.length)
    if (response.length > 0) {
      setIsHidden(false)
      setLoading(true)
      setWorkspaces(response)
    } else setIsHidden(true)
  }
  return (
    <>
      <div className='flex justify-center place-items-center mb-5'>
        <div className='mr-2'>
          <img src={Weather} width={100} alt='weather' />
        </div>
        <div className='ml-2'>
          <div>
            <b>Current weather situation:</b>
          </div>
          <div>
            <b>Type:</b> {currentWeather?.type}
          </div>
          <div>
            <b>Status:</b> {currentWeather?.status}
          </div>
        </div>
      </div>
      <Form
        form={form}
        initialValues={{
          remember: true
        }}
        onFinish={handleReport}
      >
        <Form.Item name='weather' hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item
          name='product_id'
          label='Select Product'
          hasFeedback
          rules={[{ required: true, message: 'Please select product!' }]}
        >
          <Select placeholder='Please select a product' onChange={handleChange}>
            {products.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='weight'
          label='Input weight (tons)'
          hasFeedback
          rules={[{ required: true, message: 'Please input weight!' }]}
        >
          <Input min={0} max={500} step={0.1} type='number' />
        </Form.Item>
        <Form.Item
          name='workspace_id'
          label='Select Workspace'
          hidden={isHidden}
          hasFeedback
          rules={[{ required: true, message: 'Please select workspace!' }]}
        >
          <Select placeholder='Please select a workspace'>
            {workspaces.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {loading === false && isHidden === true ? (
          <div className='block text-center mb-5'>
            <Spin size='default' />
          </div>
        ) : (
          <></>
        )}
        <Form.Item
          name='starting_point'
          label='Select Starting Point'
          hidden={isHidden}
          hasFeedback
          rules={[{ required: true, message: 'Please select a starting point!' }]}
        >
          <Select placeholder='Please select a starting point'>
            {starting_point.map((item: any) => (
              <Option key={item.id} value={item.location}>
                {item.location}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='destination'
          label='Select Destination'
          hidden={isHidden}
          hasFeedback
          rules={[{ required: true, message: 'Please select a destination!' }]}
        >
          <Select placeholder='Please select a destination'>
            {destination.map((item: any) => (
              <Option key={item.id} value={item.location}>
                {item.location}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='vehicle'
          label='Select Vehicle'
          hidden={isHidden}
          hasFeedback
          rules={[{ required: true, message: 'Please select a vehicle!' }]}
        >
          <Select placeholder='Please select a vehicle'>
            {vehicle.map((item: any) => (
              <Option key={item.id} value={item.name}>
                <div className='flex'>
                  <div>{item.name} -</div>
                  <div className=' text-slate-400'> - (Capacity: {item.capacity})</div>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='note' label='Note' hidden={isHidden} initialValue={''}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button size={'large'} type='primary' htmlType='submit' className='w-full bg-blue-500'>
            Forecast
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Report
