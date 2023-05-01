import { Button, Title } from '@/src/components'
import mainAxios from '@/src/libs/main-axios'
import { useAppSelector } from '@/src/redux/hooks'
import { formatPriceVND } from '@/src/utils/format-price'
import { Col, Row, Select, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface DataType {
  id: string
  deliveryFee: string
  quantity: number
  totalCost: string
  isPaid: number
}

const TAX = 1.07

const OrderModule: React.FC = () => {
  // useRouter
  const router = useRouter()

  // store
  const productsInCart = useAppSelector(state => state.cart.productsInCard)

  // useState
  const [delivery, setDelivery] = useState<number>(0)
  const [provinces, setProvinces] = useState()
  const [districts, setDistricts] = useState()
  const [wards, setWards] = useState()
  const [provinceId, setProvinceId] = useState<number>()
  const [districtId, setDistrictId] = useState<number>()
  const [wardCode, setWardCode] = useState<string>()
  const [records, setRecords] = useState<DataType[]>()
  const [totalCost, setTotalCost] = useState<number>()

  const [orders, setOrders] = useState<any[]>()

  // useEffect
  useEffect(() => {
    ;(async () => {
      try {
        const res: any = await mainAxios.get(
          `http://localhost:3004/carts?userId=01GVVY9F8ST69VPZEBBM13XPQR`
        )

        setOrders(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    if (!orders) return

    const mappedRecords: DataType[] = orders.map((item: any) => {
      let calculatedTotalCost = 0

      item.productsInCard.map((product: any) => {
        calculatedTotalCost += product.price * product.amount
      })

      if (item?.deliverFee?.fee) {
        calculatedTotalCost += item?.deliverFee?.fee
      }

      return {
        id: item.cartId,
        deliveryFee: `${formatPriceVND(item.deliverFee.fee)}$`,
        quantity: item.productsInCard.length,
        totalCost: `${formatPriceVND(calculatedTotalCost)}$`,
        isPaid: item.isPaid
      }
    })

    setRecords(mappedRecords)
  }, [orders])

  // functions
  const handleDeleteItem = (record: any) => {
    console.log(record)
    return null
  }

  const handlePayment = () => {
    ;(async () => {
      const payload = {
        delivery,
        details: {
          subdelivery: 31.0,
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

  // columns of table
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (_, record) => <Title level={5} text={record.id} />
    },
    {
      title: 'Phí vận chuyển',
      dataIndex: 'deliveryFee',
      render: (_, record) => <Title level={5} text={record.deliveryFee} />
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'quantity',
      render: (_, record) => <Title level={5} text={record.quantity} />
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalCost',
      render: (_, record) => (
        <Title level={5} className="text-primary" text={record.totalCost} />
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isPaid',
      render: (_, record) => (
        <Title
          level={5}
          className="text-primary"
          text={record.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
        />
      )
    },
    {
      title: 'Thao tác',
      render: (_, record) => (
        <Row gutter={16}>
          {!record?.isPaid && (
            <Col
              onClick={() => handleDeleteItem(record)}
              className="cursor-pointer hover:[&>*]:text-blue-500"
            >
              <Button type="primary" text="Thanh toán" />
            </Col>
          )}

          <Col
            onClick={() => handleDeleteItem(record)}
            className="cursor-pointer hover:[&>*]:text-blue-500"
          >
            <Button text="Hủy" />
          </Col>
        </Row>
      )
    }
  ]

  return (
    <div>
      <Table columns={columns} dataSource={records} pagination={false} />
    </div>
  )
}

export default OrderModule
