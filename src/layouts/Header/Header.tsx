import PATH from '@/src/shared/path'
import { Avatar, Col, Row, Tooltip, Typography } from 'antd'
import { useEffect, useState } from 'react'
import TabItem from './TabItem/TabItem'
import { deleteCookie, getCookie } from '@/src/utils/cookie'
import LOCAL_STORAGE_KEY from '@/src/shared/local-storage-key'
import { isAuthenticatedJwt } from '@/src/utils/jwt'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import {
  getIsAuthenticated,
  setIsAuthenticated
} from '@/src/redux/slices/authSlice'
import { Button, LoginModal, Title } from '@/src/components'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'

const Header: React.FC = () => {
  // store
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(getIsAuthenticated)

  // useState
  const [isVisibleLoginModal, setIsVisibleLoginModal] = useState(false)

  // functions
  const showLoginModal = () => {
    setIsVisibleLoginModal(true)
  }

  const handleLogout = () => {
    deleteCookie(LOCAL_STORAGE_KEY.TOKEN)
    window.location.reload()
  }

  // useEffect
  useEffect(() => {
    const token = getCookie(LOCAL_STORAGE_KEY.TOKEN)

    if (token && isAuthenticatedJwt(token)) {
      dispatch(setIsAuthenticated(true))
    } else {
      dispatch(setIsAuthenticated(false))
    }
  }, [dispatch])

  return (
    <>
      <Row
        justify={'space-between'}
        align={'middle'}
        className="fixed top-0 z-[1] w-screen border-b-[1px] border-solid border-b-slate-200 bg-zinc-300 px-[120px] py-[42px]"
      >
        <Col className="ml-[-30px]">
          <Row align={'middle'}>
            <TabItem href={PATH.HOME} title="LAPTOP SHOP" isHome />
            <TabItem href={PATH.CART} title="Xem giỏ hàng" />
            <TabItem href={PATH.DEMO_COMPS} title="DEMO-COMPS" />
          </Row>
        </Col>

        {!isAuthenticated && (
          <Col className="mr-[-30px]">
            <Row justify={'center'} gutter={16}>
              <Col>
                <Button
                  type="primary"
                  text="Đăng nhập"
                  onClick={showLoginModal}
                />
              </Col>

              <Col>
                <Button text="Đăng ký" />
              </Col>
            </Row>
          </Col>
        )}

        {isAuthenticated && (
          <Col className="mr-[-30px]">
            <Tooltip
              // trigger={'click'}
              arrow={false}
              overlayInnerStyle={{ background: `white` }}
              className="mr-4"
              placement="bottomLeft"
              overlay={
                <div>
                  <Link href={PATH.ORDERS}>
                    {/* <Row className="rounded px-2 py-2 hover:bg-slate-200"> */}
                    <Row
                      gutter={8}
                      align={'middle'}
                      className="rounded px-2 py-2 hover:bg-slate-100"
                    >
                      <Col>
                        <Row align={'middle'}>
                          <ShoppingCartOutlined style={{ color: `black` }} />
                        </Row>
                      </Col>

                      <Col>
                        <Title level={5} isNormal text={`Các đơn đặt hàng`} />
                      </Col>
                    </Row>
                  </Link>

                  <div className="mt-2">
                    <Button
                      onClick={handleLogout}
                      className="w-full"
                      text="Sign out"
                    />
                  </div>
                </div>
              }
            >
              <Row>
                <Col className="mr-2">
                  <Row align={'middle'} className="h-full">
                    <Typography>Username</Typography>
                  </Row>
                </Col>

                <Col>
                  <Avatar size={'default'} icon={<UserOutlined />} />
                </Col>
              </Row>
            </Tooltip>
          </Col>
        )}
      </Row>

      {/* portal elements */}
      <>
        {isVisibleLoginModal && (
          <LoginModal
            visible={isVisibleLoginModal}
            setVisible={setIsVisibleLoginModal}
          />
        )}
      </>
    </>
  )
}

export default Header
