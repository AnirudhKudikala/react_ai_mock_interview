import { UserButton } from '@clerk/react'
import { Link, useLocation } from 'react-router'

function Header() {
  const { pathname } = useLocation();

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Link to='/'>
            <img src={"/logo.svg"} width={160} height={100} alt='logo'/>
        </Link>
        <ul className='hidden md:flex gap-6'>
            <li 
                className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                ${pathname === "/" && "text-primary font-bold"}`}
            >
                <Link to='/'>
                    Dashboard
                </Link>
            </li>
            <li 
                className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                ${pathname === "/questions" && "text-primary font-bold"}`}
            >
                <Link to='/questions'>
                    Questions
                </Link>
            </li>
            <li 
                className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                ${pathname === "/upgrade" && "text-primary font-bold"}`}
            >
                <Link to='/upgrade'>
                    Upgrade
                </Link>
            </li>
            <li 
                className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                ${pathname === "/how" && "text-primary font-bold"}`}
            >
                <Link to='/how-it-works'>
                    How it works?
                </Link>
            </li>
        </ul>
        <UserButton />
    </div>
  )
}

export default Header
