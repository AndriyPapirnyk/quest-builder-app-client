import React from 'react'
import './Catalog.scss'

import Header from '../header/Header'
import Holder from "../holder/Holder";  
import Pagination from '../pagination/Pagination';

const Catalog = () => {
  return (
    <div className='catalog'>
      <Header />
      <Holder />
      {/* <Pagination /> */}
    </div>
  )
}

export default Catalog
