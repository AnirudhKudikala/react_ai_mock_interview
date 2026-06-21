import Header from '../components/Header'

function DashboardLayout({children}) {
  return (
    <div>
        <Header />
        <div className='mx-5 md:mx-20 lg:mx-36'>
          <main>{children}</main>
        </div>
    </div>
  )
}

export default DashboardLayout