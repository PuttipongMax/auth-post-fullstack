import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";

function Loading(){
  const [show, setShow] = useState(false);

  return (
    <div className="w-full bg-indigo-200">
      <div className="w-full mx-auto px-16 sm:px-24 md:px-40 lg:px-[275px]">
        <div 
        className={`flex flex-row hover:text-stone-600`}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        >
          <h1 className="cursor-pointer">Articles</h1>
          {
            [...Array(3)].map((_, i) => (
              <div className="">
                <GoDotFill
                className={`${show ? "spinAnimate" : "hidden"} h-8 cursor-pointer`}
                key={i}
                />
              </div>
            ))
          }
        </div>      
      </div>
    </div>
  )
}

export default Loading;

