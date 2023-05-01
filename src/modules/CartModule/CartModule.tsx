import { Button, Title } from '@/src/components'
import mainAxios from '@/src/libs/main-axios'
import { Col, Row, Select, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface DataType {
  name: string
  unitPrice: string
  quantity: number
  total: number
}

const TAX = 1.07

const ProductModule: React.FC = () => {
  // useRouter
  const router = useRouter()

  // useState
  const [total, setTotal] = useState(32.11)
  const [provinces, setProvinces] = useState()
  const [districts, setDistricts] = useState()
  const [wards, setWards] = useState()
  const [provinceId, setProvinceId] = useState<number>()
  const [districtId, setDistrictId] = useState<number>()
  const [wardCode, setWardCode] = useState<string>()

  // useEffect
  useEffect(() => {
    ;(async () => {
      try {
        const res: any = await mainAxios.get(
          `http://localhost:3004/delivery/provinces`
        )

        const mappedProvines = res.map((item: any, index: number) => ({
          value: item.ProvinceID,
          label: item.ProvinceName
        }))

        setProvinces(mappedProvines)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    if (!provinceId) return
    ;(async () => {
      try {
        const res: any = await mainAxios.get(
          `http://localhost:3004/delivery/districts/${provinceId}`
        )

        const mappedDistricts = res.map((item: any, index: number) => ({
          value: item.DistrictID,
          label: item.DistrictName
        }))

        setDistricts(mappedDistricts)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [provinceId])

  useEffect(() => {
    if (!districtId || !provinceId) return
    ;(async () => {
      try {
        const res: any = await mainAxios.get(
          `http://localhost:3004/delivery/wards/${districtId}`
        )

        const mappedWards = res.map((item: any, index: number) => ({
          value: item.WardCode,
          label: item.WardName
        }))

        setWards(mappedWards)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [districtId, provinceId])

  // functions
  const handleDeleteItem = () => {
    return null
  }

  const handlePayment = () => {
    ;(async () => {
      const payload = {
        total,
        details: {
          subtotal: 31.0,
          tax: TAX,
          shipping: 0.03,
          handling_fee: 1.0,
          shipping_discount: -1.0,
          insurance: 0.01
        }
      }

      const res: any = await mainAxios.post(
        `http://localhost:3001/users/payment-url`,
        payload
      )

      if (res?.links?.[1]) {
        console.log(res?.links?.[1])
        router.replace(res?.links?.[1].href)
      }
    })()
  }

  const onChangeProvice = (value: number) => {
    setProvinceId(value)
    setDistrictId(undefined)
    setWardCode(undefined)
  }

  const onChangeDistrist = (value: number) => {
    setDistrictId(value)
    setWardCode(undefined)
  }

  const onChangeWard = (value: string) => {
    setWardCode(value)
  }

  const costCalculationHandler = async () => {
    if (!wardCode) return

    try {
      const payload = {
        addressId: 1444,
        wardCode,
        note: null,
        productsInCard: [
          {
            productId: '01GYJ2PKBMA8BF850CWRP5MAZP',
            amount: 1
          },
          {
            productId: '01GYJ2R9X7QCBJB2KTT6MAAEB5',
            amount: 2
          }
        ]
      }

      const res: any = await mainAxios.post(`localhost:3004/carts`, payload)

      console.log('res', res)
    } catch (error) {
      console.log(error)
    }
  }

  // data of table
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <a>{text}</a>
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity'
    },
    {
      title: 'Số tiền',
      dataIndex: 'total'
    },
    {
      title: 'Thao tác',
      render: (_, record) => (
        <div
          onClick={handleDeleteItem}
          className="cursor-pointer hover:[&>*]:text-blue-500"
        >
          <Title text={'Xóa'} level={5} isNormal />
        </div>
      )
    }
  ]

  const records: DataType[] = [
    {
      name: 'John Brown',
      unitPrice: 'New York No. 1 Lake Park',
      quantity: 1,
      total: 100
    },
    {
      name: 'Jim Green',
      unitPrice: 'London No. 1 Lake Park',
      quantity: 1,
      total: 100
    },
    {
      name: 'Joe Black',
      unitPrice: 'Sydney No. 1 Lake Park',
      quantity: 1,
      total: 100
    }
  ]

  return (
    <div>
      <Table columns={columns} dataSource={records} pagination={false} />

      <Row className="mt-6" align={'middle'} gutter={50}>
        <Col>
          <Row gutter={16} align={'middle'}>
            <Col>
              <Title level={5} isNormal text={'Chọn tỉnh'} />
            </Col>

            <Col>
              <Select
                showSearch
                placeholder="Sơn La"
                optionFilterProp="children"
                onChange={onChangeProvice}
                className="min-w-[150px]"
                options={provinces}
              />
            </Col>
          </Row>
        </Col>

        <Col>
          <Row gutter={24} align={'middle'}>
            <Col>
              <Title level={5} isNormal text={'Chọn huyện'} />
            </Col>

            <Col>
              <Select
                placeholder="Mai Sơn"
                optionFilterProp="children"
                onChange={onChangeDistrist}
                className="min-w-[150px]"
                options={districts}
              />
            </Col>
          </Row>
        </Col>

        <Col>
          <Row gutter={24} align={'middle'}>
            <Col>
              <Title level={5} isNormal text={'Chọn xã'} />
            </Col>

            <Col>
              <Select
                showSearch
                placeholder="Bình Minh"
                optionFilterProp="children"
                onChange={onChangeWard}
                className="min-w-[150px]"
                options={wards}
              />
            </Col>
          </Row>
        </Col>

        <Col>
          <Button
            type="primary"
            text="Tính toán chi phí"
            onClick={costCalculationHandler}
          />
        </Col>
      </Row>

      <Row gutter={24} align={'middle'} className="mt-10" justify={'end'}>
        <Col>
          <Row align={'middle'} gutter={16}>
            <Col>
              <Title
                level={4}
                isNormal
                text={`Tổng thanh toán (3 sản phẩm):`}
              />
            </Col>

            <Col>
              <Title
                className="text-primary"
                level={3}
                isNormal
                text={`26.999 VNĐ`}
              />
            </Col>
          </Row>
        </Col>

        <Col>
          <Button
            onClick={handlePayment}
            size="large"
            type="primary"
            text="Mua hàng"
            className="min-w-[200px]"
          />
        </Col>
      </Row>
    </div>
  )
}

export default ProductModule
