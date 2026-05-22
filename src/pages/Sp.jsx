import React from 'react'
import Textprops from '../components/Textprops'
import { useState } from 'react';

const Sp = () => {
   const [city, setCity] = useState('');
     let para={
    text:"Where do you Live:",
    placeholder:"City",
  }
  return (
    
    <div>
      <Textprops text={para.text} placeholder={para.placeholder} link={`/home/${city}`}   onChangeValue={setCity} />

    </div>
  )
}

export default Sp