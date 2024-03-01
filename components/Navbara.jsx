
'use client';

import Link from 'next/link';
import { Navbar } from 'flowbite-react';


export const Navbara = () => {
  return (
    <Navbar fluid  className=' bg-slate-900'>
      <Navbar.Brand as={Link} href="/">
        {/* <Image width={50} height={50} src="/vercel.svg" className="mr-3 h-6 sm:h-9" alt="Tiny Url logo" /> */}
        <span className="self-center whitespace-nowrap text-2xl text-gray-500 font-bold dark:text-gray-400">Tiny Url</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active >
        <span className='text-gray-500'>Home</span>
        </Navbar.Link>
        <Navbar.Link as={Link} href="/about">
          <span className='text-gray-500'>About</span>
        </Navbar.Link>
        <Navbar.Link href="/links"><span className='text-gray-500'>Service</span></Navbar.Link>       
        <Navbar.Link href="/logout"><span className='text-gray-500'>Logout</span></Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export const NavbarAnon = () => {
  return (
    <Navbar fluid  className=' bg-slate-900'>
      <Navbar.Brand as={Link} href="/">
        {/* <Image width={50} height={50} src="/vercel.svg" className="mr-3 h-6 sm:h-9" alt="Tiny Url logo" /> */}
        <span className="self-center whitespace-nowrap text-2xl text-gray-500 font-bold dark:text-gray-400">Tiny Url</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>        
        <Navbar.Link as={Link} href="/about">
          <span className='text-gray-500'>About</span>
        </Navbar.Link>        
        <Navbar.Link href="/login"><span className='text-gray-500'>Login</span></Navbar.Link>
        <Navbar.Link href="/register"><span className='text-gray-500'>Register</span></Navbar.Link>       
      </Navbar.Collapse>
    </Navbar>
  );
}

