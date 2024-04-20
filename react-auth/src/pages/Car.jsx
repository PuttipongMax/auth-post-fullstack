import { useState, useEffect, useContext } from "react";
// import { ChevronLeft, ChevronRight } from "react-feather";
// import { faCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

export default function Carousel({
    images = [{}], refId,
    autoSlide = false,
    autoSlideInterval = 5000,
}){
    const [curr, setCurr] = useState(0)

    const prev = () => {
        setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1))
    }
    const next = () => {
        setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1))
    }
    
    useEffect(() => {
        if(!autoSlide) return 

        const slideInterval = setInterval(next, autoSlideInterval)
        return  () => clearInterval(slideInterval)
    }, [])

    const variables = useContext(VariablesContext);

    return (
    <div className=' w-[100%] flex flex-col justify-center 
        items-center '>
        <div 
        className='carousel w-[100%] h-[200px] lg:h-[74vh] sm:h-[280px]
        md:h-[350px] scale-110 bg-cover
        flex justify-center items-center bg-center bg-no-repeat
       '
        style={{ backgroundImage: `url(${images[curr].img})` }}
        >
            {/* <div
            className="
              "
            
            > */}
                <div 
                className='left h-[15%] bg-opacity-60 grid 
                justify-end items-center cursor-pointer  ml-4'
                style={{ flex: "10%" }}
                >        
                    {/* <ChevronLeft onClick={prev} size={80} className="text-white cursor-pointer" />                       */}
                </div>
                <div 
                style={{ flex: "80%" }}
                className='center h-[100%] grid place-items-center
                text-justify text-white gap-0'
                >
                    <div />
                    <div 
                    className='flex flex-col justify-center items-center gap-2'
                    ref={(el) => (variables[0].current[refId] = el)}
                    >
                        <h2 className={`text-xl md:text-2xl lg:text-2xl text-white
                        
                        font-[textFont]`}

                        >
                            Your dream wedding is here
                        </h2>
                        <h1 className={`text-3xl font-[primaryFont] sm:text-4xl md:text-5xl lg:text-6xl text-white
                        
                        `}>
                            Khum Chao Sua
                        </h1>
                        <Link
                        onClick={() => (window.scrollTo({ top: 0, behavior: "auto" }))}
                        className={`text-white bg-primary mt-5 p-3 rounded-sm hover:bg-secondary
                        
                        text-navigationSize font-navigationWeight font-sarabunFont`}
                        to={images[curr].path}
                        >                 
                            {images[curr].link}
                        </Link>
                    </div>
                    
                    <div className='flex justify-center items-center gap-4 cursor-pointer'>
                    {/* {
                        images.map((_, i) => (
                            <FontAwesomeIcon
                            icon={faCircle}
                            onClick={() => setCurr(i)}
                            key={i}
                            className={`
                            transition-all bg-transparent rounded-full opacity-80 text-white text-[12px]
                            ${curr === i ? "p-2 border-white border-2" : "bg-opacity-50"}
                            `}
                            />
                        ))
                    } */}
                </div>
                </div>
                <div 
                className='right h-[15%] bg-opacity-60 grid 
                justify-start items-center mr-4'
                style={{ flex: "10%" }}
                >
                    {/* <ChevronRight onClick={next} size={80} className="text-white cursor-pointer" />  */}
                </div>            
            </div>
        </div>
    // </div>
    )
}
