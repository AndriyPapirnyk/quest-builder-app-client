import React from 'react'
import './CatalogHolder.scss'
import Card from '../card/Card'

const CatalogHolder = () => {
  return (
    <section className='catalog__holder'>
        <Card />
        <Card />
        <Card />
        <Card />
    </section>
  )
}

export default CatalogHolder