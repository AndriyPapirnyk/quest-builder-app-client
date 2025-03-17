import React from 'react'
import './Catalog.scss'

import Header from '../header/Header'
import CatalogHolder from "../catalogHolder/CatalogHolder";  
import Pagination from '../pagination/Pagination';

const Catalog = () => {
  return (
    <div className='catalog'>
      <Header />
      <CatalogHolder />
      <Pagination />
    </div>
  )
}

export default Catalog
