import React, { Component } from 'react';
import { useState } from 'react';
const FirstPage=()=>{
    const [menu, setMenu] = useState('Veg'); 
    const handleChange = (event) => {
    setMenu(event.target.value); 
  }
    return(
      <div >
        <div className=' bg-[rgb(var(--bg))] text-[rgb(var(--text))]'>
        <form >
            <label htmlFor="hostel">Hostel name</label>
            <input type="text" id="hostel" placeholder='Enter your hostel Name'/>
            <label htmlFor="Menutype">category</label>
            <select name="MenuType" id="Menu" value={menu} onChange={handleChange}>
                <option value="Veg"> Veg</option>
                <option value="Non-Veg">Non-veg</option>
                <option value="Special">Special</option>
            </select>
        </form>
        </div>
      </div>

    )
}
export default FirstPage;