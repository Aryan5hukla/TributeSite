import { useState } from 'react'
import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from "gsap" ;
import 'remixicon/fonts/remixicon.css'


function App() {
  let [showContent , setShowContent] = useState(false) ;
  useGSAP(()=> {
    const tl = gsap.timeline() ;

    tl.to(".vi-mask-group" , {
      rotate : 10 ,
      duration: 2 ,
      ease : "Power4.easeInOut" ,
      transformOrigin : "50% 50%" , //center se hi ghume wo
    })
    .to(".vi-mask-group" , {
      scale:10 ,
      duration : 2 ,
      delay: -1.8 , // jisse tilt hole se pehle zoom shuru ho jaaye
      ease: "Expo.easeInOut" ,
      transformOrigin: "50% 50%" ,
      opacity: 0 ,
      onUpdate : function() {
        if(this.progress()>= 0.9) {
          document.querySelector(".svg").remove() ;
          setShowContent(true) ;
          this.kill();
        }
      },
    });
  });

  useGSAP(()=>{
    if(!showContent) return ;
    
    gsap.to(".main" , {
      scale : 1 ,
      rotate : 0 ,
      duration : 2 ,
      delay : -1 ,
      ease : "Expo.easeInOut" ,
    })
    gsap.to(".sky" , {
      scale : 1.1 ,
      rotate : 0 ,
      duration : 2 ,
      delay : -0.8 ,
      ease : "Expo.easeInOut" ,
    })
    gsap.to(".bg" , {
      scale : 1.1 ,
      rotate : 0 ,
      duration : 2 ,
      delay : -0.8 ,
      ease : "Expo.easeInOut" ,
    })
    // console.log(window.innerWidth) ;
    if(window.innerWidth > 768)
    {gsap.to(".character" , {
      scale : 0.9 ,
      rotate : 0 ,
      bottom : "-10%" ,
      duration : 2 ,
      delay : "-1" ,
      ease : "Expo.easeInOut" ,
    })} else {
      gsap.to(".character" , {
        scale : 2 ,
        rotate : 0 ,
        bottom : "10%" ,
        duration : 2 ,
        delay : "-1" ,
        ease : "Expo.easeInOut" ,
      })
    }
    gsap.to(".text" , {
      scale : 1 ,
      rotate : 0 ,
      duration : 2 ,
      delay : "-0.8" ,
      ease : "Expo.easeInOut" ,
    })
    
    const main = document.querySelector(".main");

    main?.addEventListener("mousemove" , function (e){
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40 ;
      console.log(xMove) ;
      gsap.to(".imagesdiv .text" , {
        x : `${-50 - xMove * 0.5}%`
      });
      gsap.to(".sky" , {
        x : xMove
      })
      gsap.to(".bg" , {
        x: xMove*1.7
      })

    });
  } , [showContent]);


  return (
    <>
      <div className='svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]'>
        <svg viewBox='0 0 800 600' preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill='black' />
              <g className='vi-mask-group'>
                <text 
                  className='hero'
                  x="50%"
                  y="50%"
                  fontSize = "250"
                  textAnchor='middle'
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily = "Arial Black"
                >
                  India
                </text>
              </g>
            </mask>
          </defs>
          <image 
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio='xMidYMid slice'
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && <div className='main h-full w-full bg-black'>
        <div className='main overflow-hidden w-full rotate-[-10deg] scale-[1.7]'>
          <div className='landing overflow-hidden relative w-full h-screen bg-black'>
            <div className='navbar absolute top-0 left-0 z-[10] w-full py-7 px-10'>
              <div className='logo w-27 flex flex-col items-center gap-1'>
                <div className='lines flex '>
                  <div className='line w-9 h-1.5 bg-[#ff671f]'></div>
                  <div className='line w-9 h-1.5 bg-[#ffffff]'></div>
                  <div className='line w-9 h-1.5 bg-[#046A38]'></div>
                </div>
                <h3 className='text-xl leading-none text-black'>Proud Indian</h3>
                <div className='lines flex '>
                  <div className='line w-9 h-1.5 bg-[#ff671f]'></div>
                  <div className='line w-9 h-1.5 bg-[#ffffff]'></div>
                  <div className='line w-9 h-1.5 bg-[#046A38]'></div>
                </div>
              </div>
            </div>
            
            <div className='imagesdiv relative w-full h-screen overflow-hidden bg-black'>
              <img 
                className='sky scale-[1.5] rotate-[-20deg] absolute top-0 left-0 w-full h-screen object-cover'
                src="./cloud.png" 
                alt="" 
              />
              <img 
                className='bg scale-[1.8] rotate-[-3deg] absolute top-0 left-0 w-full h-screen object-cover '
                src="./buildings.png" 
                alt="" 
              />
              <div className='hero text scale-[1.4] rotate-[-10deg] flex flex-col  font-extrabold text-white absolute top-40 md:top-10 left-1/2 -translate-x-1/2'>
                <h1 className='md:text-[7rem] text-8xl leading-none -ml-20'>Indian</h1>
                <h1 className='md:text-[7rem] text-8xl leading-none ml-20'>Armed</h1>
                <h1 className='md:text-[7rem] text-8xl leading-none -ml-20'>Forces</h1>
              </div>
              <img
                className='girl character  absolute scale-[1.2] md:scale-[3] rotate-[-20deg] bottom-40 md:-bottom-[170%] left-0' 
                src="./armed.png" 
                alt="" 
              />
            </div>
            <div className='btmbar text-white absolute bottom-0 left-0 w-full py-10 px-10 bg-gradient-to-t from-black to-transparent'>
              <div className='flex gap-4 items-center'>
                <i className="ri-arrow-down-line"></i>
                <h3 className='text-lg font-["Roboto"]'>
                  Scroll Down
                </h3>
              </div>
            </div>
          </div>

          <div className='w-full h-full md:h-screen pb-20  md:pb-4 md:pt-10 px-15 flex items-center justify-center bg-black'>
            <div className='cntnr justify-center w-full h-[90%] flex md:flex-row flex-col text-white overflow-hidden '>
              <div className='limg flex mt-10 mb-5 justify-center relative md:w-[50%] h-full'>
                <img className='scale-[0.85] md:absolute  md:-top-0 left-0 ' src="/img.png" alt="" />
              </div>
              <div className='rg w-full md:w-[50%] md:pr-8'>
                <h1 className='md:text-8xl text-6xl'>A Salute from a </h1>
                <h1 className='md:text-8xl text-6xl'>Proud India</h1>
                <p className='mt-15 font-[parkinsans]'>Operation Sindoor stands as a shining testament to the bravery, sacrifice, and unwavering commitment of the Indian Armed Forces. In the face of great adversity, our soldiers rose with unmatched courage and dedication, defending our nation’s honor and safeguarding our people. We bow our heads in deepest respect to the bravehearts who laid down their lives so we may live in peace and freedom. Their sacrifice will never be forgotten — it is etched into the soul of every proud Indian.</p>
                <p className='mt-10 font-[parkinsans]'>From the strategic brilliance of our military commanders to the indomitable spirit of the troops on the ground, sea, and air — the Indian Army, Navy, and Air Force displayed unity, strength, and valor that echoes across the world. As a grateful nation, we stand united in our reverence and gratitude. Operation Sindoor is more than a mission — it is a reminder of what it means to serve, to protect, and to love one's country beyond self. Jai Hind!
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>}
    </>
  )
}

export default App
