import Footer from './Footer'
import Header from './Header'

interface Props {
  children?: React.ReactNode
}

const MainLayout: React.FC<Props> = props => {
  const { children } = props

  return (
    <div className="bg-zinc-300">
      <Header />

      <div className="mt-[116px] px-[90px] py-6">{children}</div>

      <Footer />
    </div>
  )
}

export default MainLayout
