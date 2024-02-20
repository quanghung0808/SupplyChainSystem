import { Button, Form, FormInstance, Input, Modal, Select, notification } from 'antd'
import { useRef } from 'react'
import { useAppSelector } from '../../redux/configStore'
import { CreateWorkspaceForm } from 'common/@type'
import { getWorkspacesByProductId, postWorkspace } from 'apis/api'
interface CreateWorkspaceProps {
  setOpen: (open: boolean) => void
  setWorkspaces: (workspace: any) => void
  open: boolean
  setLoading: (loading: boolean) => void
  productId: number
}
const { Option } = Select

const CreateWorkspace = ({ open, setOpen, setLoading, setWorkspaces, productId }: CreateWorkspaceProps) => {
  const [api, contextHolder] = notification.useNotification()
  const formRef = useRef<FormInstance>(null)
  const { products } = useAppSelector((state) => state.product)

  const handleCreate = async (values: CreateWorkspaceForm) => {
    const response = await postWorkspace(values)
    console.log(response)
    if (response) {
      api['success']({
        message: 'Create Successfully!',
        placement: 'bottomRight'
      })
      const res = await getWorkspacesByProductId(productId)
      setWorkspaces(res)
      setLoading(false)
      setOpen(false)
      formRef.current?.resetFields()
    } else
      api['error']({
        message: 'Duplicate name!',
        placement: 'bottomRight'
      })
  }

  return (
    <Modal title='Basic Modal' open={open} onCancel={() => setOpen(false)}>
      {contextHolder}

      <Form
        ref={formRef}
        initialValues={{
          remember: true
        }}
        onFinish={handleCreate}
      >
        <Form.Item
          name='product_id'
          label='Select Product'
          hasFeedback
          rules={[{ required: true, message: 'Please select a product!' }]}
        >
          <Select placeholder='Please select a product'>
            {products.map((item: any) => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='name'
          label='Input workspace name'
          rules={[{ required: true, message: 'Please input workspace name!' }]}
        >
          <Input type='text' maxLength={100} />
        </Form.Item>
        <Form.Item>
          <Button size={'large'} type='primary' htmlType='submit' className='w-full bg-blue-500'>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateWorkspace
