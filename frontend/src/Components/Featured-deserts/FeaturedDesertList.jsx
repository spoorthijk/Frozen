
import React, { useContext } from 'react'
import DesertCard from '../../Shared/DesertCard'
import { DesertContext } from '../../assets/data/desert';
import { Col } from 'reactstrap'

const FeaturedDesertList = () => {
  const { deserts, error } = useContext(DesertContext);
  return (
    <>
        {deserts?.map(desert=>(
           <Col lg='3' className='mb-4' key={desert.id}>
            <DesertCard desert={desert}/>
           </Col> 
        ))}
    </>
  )
}

export default FeaturedDesertList
