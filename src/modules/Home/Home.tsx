import { useEffect, useState } from 'react'
import mainAxios from '@/src/libs/main-axios'
import { Button, Title } from '@/src/components'
import { Col, Input, Row, Select, SelectProps } from 'antd'
import LaptopItem from './LaptopItem'

const HomePage: React.FC = () => {
  const [laptops, setLaptops] = useState<any[]>()

  useEffect(() => {
    ;(async () => {
      try {
        const res: any = await mainAxios.get('http://localhost:3004/products')
        setLaptops(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div>
      <Row justify={'space-between'} align={'middle'} className="my-4">
        <Col>
          <Title level={4} text="Tất cả sản phẩm" />
        </Col>

        <Col>
          <Row gutter={16} wrap={false}>
            <Col>
              <Input
                className="min-w-[300px] border-0 p-2"
                placeholder="Nhập tên sản phẩm..."
              />
            </Col>

            <Col>
              <Button type="primary" className="h-full" text="Tìm kiếm" />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mt-6">
        {laptops &&
          laptops?.map((item, index) => (
            <Col span={8} key={index}>
              <LaptopItem data={item} />
            </Col>
          ))}
      </Row>
    </div>
  )
}

export default HomePage
