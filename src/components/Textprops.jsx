import React, { useEffect, useState } from 'react';
import style from './text.module.css';
import { Link } from 'react-router-dom';


const Textprops = (prop) => {
  const [info, setInfo] = useState('');   

  let inputHandler = (e) => {
    e.preventDefault();
   
  };
 


  const [para, setPara] = useState('');
  const arr = [prop.text];

  const textAnimate = () => {
    let text = arr[0]; // actual string
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        setPara(prev => prev + text[i]); // add one character at a time
      }, i * 100);
    }
  };

  useEffect(() => {
    textAnimate();
  }, []);

  return (<>
    <form className={style.body} onSubmit={(e) => inputHandler(e)}>
      <div className={style.text}>
        <p className={style.para}>
          {para} 
          <input 
            onChange={(e) =>{ setInfo(e.target.value)  ;if (prop.onChangeValue) {
      prop.onChangeValue(e.target.value);}  // parent ko bhi value bhej do
    }}  
            value={info}                                
            type="text" 
            className={style.in} 
            placeholder={prop.placeholder}
            required
          />
        </p>
      </div>
      <div className={style.btndiv}>
        <Link to={prop.link}>
          <button className={style.btn}>Continue</button>
        </Link>
      </div>
    </form>

    </>
  );
};

export default Textprops;