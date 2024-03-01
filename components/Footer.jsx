
'use client';

import { Footer } from 'flowbite-react';

const Footers = () => {
  return (
    <Footer container className='fixed bottom-0 left-0 w-full bg-slate-900 text-gray-300'>
    <Footer.Copyright href="https://github.com/AbhiSmith" by="Abhishek Singh" year={2024} />
    <Footer.LinkGroup>
      <Footer.Link href="https://github.com/AbhiSmith">About</Footer.Link>
      <Footer.Link href="https://github.com/AbhiSmith">Privacy Policy</Footer.Link>
      <Footer.Link href="https://github.com/AbhiSmith">Licensing</Footer.Link>
      <Footer.Link href="https://github.com/AbhiSmith">Contact</Footer.Link>
    </Footer.LinkGroup>
  </Footer>
  
  
  );
}
export default Footers;

