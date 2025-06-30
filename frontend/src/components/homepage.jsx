import React, { useState, useEffect, useRef } from 'react'
import { Moon, Sun } from 'lucide-react';
import HowItWorks from './howItWorks'
import ResumeEditor from './resumeEditor'
import UploadResumeForm from './uploadResumeForm'
import ResumeEditorForm from './resumeEditorForm'
import resumeArt from '../assets/resume_art.png'
import resumeEnhanceArt from '../assets/resume_enhance.png'
import vectorArtDark from '../assets/vector_art_dark.svg'
import vectorArtLight from '../assets/vector_art_light.svg'
import vectorCircleDark from '../assets/vector_circle_dark.svg'
import vectorCircleLight from '../assets/vector_circle_light.svg'

const Homepage = ({ toggleTheme, theme }) => {
  const [showResumeForm, setShowResumeForm] = useState(false);
  const resumeEditorRef = useRef(null);

  useEffect(() => {
    console.log(showResumeForm);
  }, [showResumeForm])

  const handleTryItOut = () => {
    setTimeout(() => {
      resumeEditorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100); // slight delay to ensure rendering
  };

  return (
    <div className=' max-w-full h-auto bg-background flex flex-col' >
      <div className=' px-20 mb-10'>
        <div className=' w-full h-auto min-h-screen bg-foreground self-start flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start rounded-b-xl drop-shadow-xl drop-shadow-foreground'  >
        { theme == "light" ? <img src={vectorCircleDark} alt="" srcSet='' className=' absolute origin-center -bottom-10 z-1 -left-20 scale-500 
        mask-l-from-0% mask-l-to-52% mask-b-from-0% mask-b-to-60%'/>
            : <img src={vectorCircleLight} alt="" srcSet="" className=' absolute origin-center -bottom-10 z-1 -left-20 scale-500 
        mask-l-from-10% mask-l-to-52% mask-b-from-0% mask-b-to-55%'/>}
          <div className=' relative flex flex-col gap-1 md:mx-15 top-10 z-5 md:top-50 left-0 lg:left-0 xl:left-10 scale-80 md:scale-100 lg:scale-130 origin-left  '> 
            <p className=' text-5xl text-text font-bold'>Your Resume. </p>
            <p className=' text-5xl text-text font-bold'>Smarter, Cleaner.</p>
            <p className=' text-6xl text-text font-bold underline underline-offset-4'>Enhanced. </p>
            <br />
            <p className=' font-medium text-muted'>Craft a Resume that Stands Out — with AI on Your Side.</p>
            <button
              className='  w-min h-auto p-2 px-10 mt-2 rounded-sm text-background font-semibold bg-text whitespace-nowrap
                hover:cursor-pointer hover:bg-text active:bg-muted'
              onClick={handleTryItOut}
            >
              Try it out yourself
            </button>

          </div>
          <div className='md:mt-40 xl:mt-0  xl:relative scale-70 lg:scale-80 xl:scale-90 2xl:scale-120 md:top-50 xl:top-40 lg:right-20 2xl:right-50 origin-right'>
            <img src={resumeEnhanceArt} alt='resume photo' className='relative object-fill  z-1 w-[300px] h-[450px] scale-120 bg-transparent rounded-xl drop-shadow-lg drop-shadow-muted' />
            <img src={resumeArt} alt='resume photo' className=' absolute object-fill top-0 right-30 w-[300px] h-[450px] bg-background rounded-xl -rotate-5 shadow-xl shadow-text/20'/>
            { theme == "light" ? <img src={vectorArtDark} alt="" srcSet="" className=' absolute bottom-0 -z-1 -left-40 scale-200'/>
            : <img src={vectorArtLight} alt="" srcSet="" className=' absolute bottom-0 -z-1 -left-40 scale-200 '/>}
          </div>
        </div>
      </div>
      <div className='mb-10'>
        <HowItWorks/>
      </div>

      <div
        ref={resumeEditorRef}
        className=' w-full h-screen flex  px-10 pt-10 pb-10 bg-background self-start overflow-hidden  justify-center items-center '
      >
        <ResumeEditor showResumeForm={showResumeForm} setShowResumeForm={setShowResumeForm} />
      </div> 
      
      <div className='  absolute top-0 right-0 m-5 w-auto h-auto flex justify-center items-center gap-2 bg-text p-2 rounded-md'>   
        <div className=' text-background'>{theme == "light" ? <Moon/> : <Sun/>}</div>
        <button onClick={toggleTheme} type="button" className=' text-background font-semibold text-lg'>Toggle {theme == "light" ? "dark" : "light"} mode</button>
      </div>
    </div>
  )
}

export default Homepage