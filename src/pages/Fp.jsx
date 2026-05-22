import React from 'react'
import Textprops from '../components/Textprops';

const Fp = () => {
  let para={
    text:"Hi! What's your Name:",
    placeholder:"Name",
  }
  return (
    <div>
      <Textprops text={para.text} placeholder={para.placeholder} link="/location" />
    </div>
  )
}

export default Fp;