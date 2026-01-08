import React, { useState } from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation';


const HomePage = () => {
    const [typingStatus,setTypingStatus] = useState("human1");
  return (
    <section className="relative bg-primary w-full max-w-full h-full overflow-hidden pb-[15vh] md:pb-[0px]">

{/*BG ORBITAL ABSOLUTE START */}
        <img
         src="/orbital.png" alt='home-page-bg'
         className='homePageOrbital absolute inset-0 opacity-[0.10] pointer-events-none
         '
         />
    {/*BG ORBITAL ABSOLUTE END */}


{/* LEFT + RIGHT SIDE DIV START */}

    <div
     className='layoutWidth pt-[10vh] md:pt-[0px] flex md:flex-row flex-col  md:items-center  gap-[80px] lg:gap-[100px] h-full'
     >


{/* LEFT SECTION START */}
<div
id="left"
className="flex-1 
flex flex-col items-center
 justify-center  h-full gap-4 text-center "
 >
    <h1 className=" text-[10vh] sm:text-[8vw] xl:text-[8vw] 3xl:text-[8vw] homePageH1  font-bold  leading-[0.95]">CORTEX AI</h1>
    <h2 className=" mt-3 font-semibold md;max-w-[70%]  text-lg lg:text-xl">SuperCharge your creativity and productivity</h2>
    <h3 className='text-base '>
        Loreum ipsum dolor sit amet consectetur adipisicing elit. Natus, quas
    </h3>
    <Link to="/dashboard" className="mt-4 py-4 px-6 text-white
     rounded-md text-sm
     3xl:text-base  bg-blue hover:bg-white hover:text-blue cursor-pointer">
        Get Started 
    </Link>
</div>
{/* LEFT SECTION END */}

{/* RIGHT SECTION START */}
<div
id="right"
className="relative flex-1 h-full flex items-center justify-center
 ">


 {/* RIGHT SIDE CONTAINER START */}

<div className='relative flex items-center justify-center 
 bg-[#140e2d] rounded-[50px]  max-w-[80%] w-full  h-[50%]  overflow-hidden'>
    


    {/*RIGHT DIV SMALL BOX BG START  */}
<div className="w-full h-full overflow-hidden absolute inset-0">
<div className="bg-[url('/bg.png')] bg-auto bg-center
 w-[200%] h-full opacity-[0.2] homePagerightContainerBgAnimation">
 </div>
</div>

{/*RIGHT DIV SMALL BOX BG START  */}

<img src="/bot.png" 
alt="bot image "
className='w-full h-full object-contain homePageBotAnimation'/>

</div>

{/* RIGHT SIDE CONTAINER END */}

{/* CHAT START */}

<div
//  className='absolute  bottom-[-30px] right-[-50px] '
 className='absolute 
  bottom-0 md:bottom-[30px] right-[0px]
   flex items-center gap-[10px]  p-[6px] md:p-[10px] bg-[#2C2937]   rounded-[10px]'
>
<img
//  src="/bot.png"
 src={typingStatus === 'human1' ? "/human1.jpeg":
    typingStatus === "human2" ? "/human2.jpeg" :"/bot.png"


 }

alt="bot"
 className='w-[24px] h-[24px] md:w-[32px]
  md:h-[32px] rounded-full object-cover' 
 />
   <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Human:We Produce For Mice',
        2000,
        ()=>{
            setTypingStatus("bot")
        }, 
        
        // wait 1s before replacing "Mice" with "Hamsters"
        'Bot: bot is nice ',
        2000,
        ()=>{
            setTypingStatus("human1")
        }, 
        'Human:That was nice ',
        2000,
           ()=>{
            setTypingStatus("human2")
        },
        'Alien:Thank you for the service',
        2000,
           ()=>{
            setTypingStatus("Human")
        },
        
      ]}
      className='text-[12px] md:text-[14px]'
      wrapper="span"
      cursor={true}
    //   speed={50}
     //   style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
      omitDeletionAnimation={true}  
      //{ /*BACKWARD DELETION WILL BE REMOVED */ }

    />
</div>

{/* CHAT END */}



</div>
{/* RIGHT SECTION END */}

    </div>

{/* LEFT + RIGHT SIDE DIV END */}


{/* BOTTOM LOGO SECTION START */}

<div className="absolute  bottom-[20px] left-1/2  -translate-x-1/2 flex flex-col items-center gap-[20px] ">
    <img src="/logo.png" alt="bottom-app-logo"  className='w-[16px] h-[16px]'/>
    <div className="flex gap-[10px] text-gray text-[10px]">
        <Link to="/">Terms Of Service </Link>
        <span>|</span>
        <Link to="/">Privacy Policy</Link>


            </div>
</div>

{/* BOTTOM LOGO SECTION END */}






     </section>
  )
}

export default HomePage