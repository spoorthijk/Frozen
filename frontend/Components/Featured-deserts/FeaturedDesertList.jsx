
import React from 'react'
import DesertCard from '../../Shared/DesertCard'
import desertData from '../../assets/data/desert'
import { Col } from 'reactstrap'

const FeaturedDesertList = () => {
  return (
    <>
        {desertData?.map(desert=>(
           <Col lg='3' className='mb-4' key={desert.id}>
            <DesertCard desert={desert}/>
           </Col> 
        ))}
    </>
  )
}

export default FeaturedDesertList
