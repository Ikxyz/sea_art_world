/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Images from '../assets/images'
import { useState, useRef, useEffect } from 'react';


interface IProps {
     items: Array<string>,
     onSelected: (item: string, index?: number) => any,
}


export default function DropdownMenu({ onSelected, items }: IProps) {
     const [toggled, setToggled] = useState(false);
     const dropdown = useRef<HTMLDivElement>();

     const [selected, setSelected] = useState(items[0]);

     const onItemSelected = (item: string, index: number) => {
          setSelected(item);
          setToggled(false);
          onSelected(item, index);
     }

     useEffect(() => {
          if (!dropdown.current) {
               return;
          }
          const dropdownButton = dropdown.current;
          const toggledOn = () => setToggled(true)
          const toggledOff = () => setToggled(false)
          dropdownButton.addEventListener('click', toggledOn)
          dropdownButton.addEventListener('mouseenter', toggledOn)
          dropdownButton.addEventListener('mouseleave', toggledOff)
          return () => {
               if (!dropdownButton) return;
               dropdownButton.removeEventListener('click', toggledOn)
               dropdownButton.removeEventListener('mouseenter', toggledOn)
               dropdownButton.removeEventListener('mouseenter', toggledOff);
          }
     }, [])

     return (
          <div className='relative w-[84px] h-[64px]'>
               <div ref={dropdown as any} className="static flex items-center justify-between w-full h-full p-2 rounded-2xl bg-grey-100 ">
                    <div className={`text-xs content-between flex static justify-between cursor-pointer  items-center ${toggled ? 'hidden' : ''} `}>

                         {selected}
                         {/* <img
                              src={Images.dropdown_arrow.src}
                              className="w-2 h-1"
                              alt="nigeria flag"
                         /> */}

                    </div>
                    <ul className={`absolute bg-white top-0  text-sm left-0 w-full h-fit text-center rounded-lg drop-shadow ${toggled ? '' : 'hidden'}`}>
                         {items.map((item, index) => <li key={item} onClick={() => onItemSelected(item, index)} className="p-2 cursor-pointer hover:bg-gray-300">{item}</li>)}
                    </ul>
               </div>
          </div>
     )
}
