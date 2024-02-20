import { Button, Col, Row, Select, Space, Spin, Table, TableProps } from 'antd'
import { useState } from 'react'
import { useAppSelector } from '../../redux/configStore'
import { Workspace } from 'common/models'
import { deleteWorkspaces, getWorkspacesByProductId } from 'apis/api'
import CreateWorkspace from 'components/Popup/CreateWorkspace'
const { Option } = Select

interface DataType {
  name: string
}

const WorkspacePage = () => {
  const [productId, setProductId] = useState<any>()
  const { products } = useAppSelector((state) => state.product)
  const [workspaces, setWorkspaces] = useState<DataType[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState<boolean>(false)

  console.log(workspaces)

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Workspace name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: any) => (
        <Space size='middle'>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      )
    }
  ]
  const handleDelete = async (value: string | string[]) => {
    setLoading(true)
    const response = await deleteWorkspaces(value)
    const res = await getWorkspacesByProductId(productId)
    setWorkspaces(res)
    setLoading(false)
  }
  const handleChange = async (value: string | string[]) => {
    setProductId(value)
    const res = await getWorkspacesByProductId(value)
    setWorkspaces(res)
    setLoading(false)
    // console.log(response.length)
  }
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={24} className='mb-3 text-end'>
        <Button type='primary' size='middle' className='bg-blue-500' onClick={() => setOpen(true)}>
          + Workspace
        </Button>
        <CreateWorkspace
          open={open}
          setOpen={setOpen}
          setWorkspaces={setWorkspaces}
          setLoading={setLoading}
          productId={productId}
        />
      </Col>
      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
        <div>*Select product to get workspace</div>
        <Select placeholder='Please select a product' className='w-full' onChange={handleChange}>
          {products.map((item: any) => (
            <Option value={item.id}>{item.name}</Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
        {loading ? (
          <div className='block text-center mt-20'>
            <Spin size='large' />
          </div>
        ) : (
          <div className='border'>
            <Table columns={columns} dataSource={workspaces} />
          </div>
        )}
      </Col>
    </Row>
  )
}

export default WorkspacePage
