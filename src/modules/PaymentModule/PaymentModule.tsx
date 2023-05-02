import mainAxios from '@/src/libs/main-axios'
import { useAppSelector } from '@/src/redux/hooks'
import LOCAL_STORAGE_KEY from '@/src/shared/local-storage-key'
import { getLocalStorageItem, jsonParser } from '@/src/utils/local-storage'
import { Button, Result, message } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const PaymentModule: React.FC = () => {
  // useRouter
  const router = useRouter()

  // useState
  const [links, setLinks] = useState<any>()
  const [isPaid, setIsPaid] = useState(false)
  const [payingCartId, setPayingCartId] = useState<string>()

  useEffect(() => {
    const linksHere = getLocalStorageItem(LOCAL_STORAGE_KEY.PAYMENT)
      ? jsonParser(getLocalStorageItem(LOCAL_STORAGE_KEY.PAYMENT) as string)
      : {}

    setLinks(linksHere)
  }, [])

  useEffect(() => {
    const localPayingCartId = getLocalStorageItem(
      LOCAL_STORAGE_KEY.PAYING_CART_ID
    )
      ? jsonParser(
          getLocalStorageItem(LOCAL_STORAGE_KEY.PAYING_CART_ID) as string
        )
      : {}

    setPayingCartId(localPayingCartId)
  }, [])

  const handleConfirmPayment = async () => {
    if (!router?.query?.PayerID || !links?.[2]?.href) return

    try {
      const payload = {
        payId: router.query.PayerID,
        url: links[2].href
      }

      const res = await mainAxios.post(
        `http://localhost:3001/users/execute-payment`,
        payload
      )

      setIsPaid(true)

      if (payingCartId) {
        try {
          await mainAxios.patch(
            `http://localhost:3004/carts?cartId=${payingCartId}`
          )

          message.success('Thanh toán thành công')
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {(isPaid && (
        <Result
          status="success"
          title="Đã thanh toán thành công"
          subTitle={`Payment Id: ${router?.query?.PayerID}`}
        />
      )) || (
        <Result
          status="success"
          title="Bấm xác nhận để hoàn tất thanh toán"
          subTitle={`Payment Id: ${router?.query?.PayerID}`}
          extra={[
            <Button
              size="large"
              type="primary"
              key="console"
              onClick={handleConfirmPayment}
            >
              Xác nhận
            </Button>
            // <Button size="large" key="buy">
            //   Hủy
            // </Button>
          ]}
        />
      )}
    </div>
  )
}

export default PaymentModule
