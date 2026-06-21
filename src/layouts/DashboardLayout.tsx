import type React from 'react';
import Header from '../components/Header'

interface MyComponentProps {
    children: React.ReactNode;
    // add other props here if needed
}

function DashboardLayout({children}: MyComponentProps) {
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