/* eslint-disable no-restricted-imports */
import { Link } from 'react-router-dom'

import Logo from '../../assets/images/qwe.jpeg'

export  function Header() {
  return (
    <div className="h-24 bg-black text-white flex gap-16 items-center">
        <div className='ml-10'><Link to="/" ><img className='h-24 p-2' src={Logo} alt="Gstou logo" /></Link></div>
        <h1 className='text-3xl font-semibold' >Автоматизация процесса обжига кирпича</h1>
    </div>
  )
}
