import React, { useState, useEffect, useRef } from 'react'
import HowItWorks from './howItWorks'
import ResumeEditor from './resumeEditor'
import UploadResumeForm from './uploadResumeForm'
import ResumeEditorForm from './resumeEditorForm'

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
          <div className=' relative flex flex-col gap-1 md:mx-15 top-10 md:top-50 left-0 lg:left-0 xl:left-10 scale-80 md:scale-100 lg:scale-130 origin-left  '> 
            <p className=' text-5xl text-text font-bold'>Your Resume. </p>
            <p className=' text-5xl text-text font-bold'>Smarter, Cleaner.</p>
            <p className=' text-6xl text-text font-bold underline underline-offset-4'>Enhanced. </p>
            <br />
            <p className=' font-medium text-muted'>Craft a Resume that Stands Out — with AI on Your Side.</p>
            <button
              className=' w-min h-auto p-2 px-10 mt-2 rounded-sm text-background font-semibold bg-text whitespace-nowrap
                hover:cursor-pointer hover:bg-text active:bg-muted'
              onClick={handleTryItOut}
            >
              Try it out yourself
            </button>
          </div>
          <div className='md:mt-40 xl:mt-0  xl:relative scale-70 lg:scale-80 xl:scale-90 2xl:scale-120 md:top-50 xl:top-40 lg:right-20 2xl:right-50 origin-right'>
            <img src='#' alt='resume photo' className='relative z-1  w-[350px] h-[450px] bg-text rounded-xl shadow-2xl shadow-muted'/>
            <img src='#' alt='resume photo' className=' absolute top-0 right-30 w-[350px] h-[450px] bg-background rounded-xl -rotate-5 shadow-2xl shadow-text'/>
          </div>
        </div>
      </div>
      <div className='mb-10'>
        <HowItWorks/>
      </div>

      <div
        ref={resumeEditorRef}
        className=' w-full h-170 px-10 pt-20 pb-10 bg-background self-start overflow-hidden  justify-center items-center '
      >
        <ResumeEditor showResumeForm={showResumeForm} setShowResumeForm={setShowResumeForm} />
      </div> 
      
      <button onClick={toggleTheme} type="button" className=' absolute bottom-0 right-0 m-5 text-text'>Toggle {theme == "light" ? "dark" : "light"} mode</button>
    </div>
  )
}

export default Homepage