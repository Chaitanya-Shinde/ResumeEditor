import React, { useState, useRef } from 'react';
import UploadResumeForm from './uploadResumeForm';
import ResumeEditorForm from './resumeEditorForm';
import ResumePDF from './resumePdf';
import { FileUp, Save, Download } from 'lucide-react';
import { saveResume, downloadSavedResume } from '../api/api';

const ResumeEditor = ({ showResumeForm, setShowResumeForm }) => {
  const [resumeId, setResumeId] = useState("");
  const [resume, setResume] = useState({
    name: 'John Doe',
    title: 'Senior Software Engineer',
    summary: 'Highly motivated and results-oriented Senior Software Engineer with 10+ years of experience in developing scalable web applications and leading successful projects.',
    experience: [
      { id: 'exp-1', title: 'Senior Software Engineer', company: 'Tech Solutions Inc.', startDate: '2020-01', endDate: '', years: '2020 - Present', description: 'Led development of critical microservices, improving system performance by 30%. Mentored junior developers and fostered a collaborative environment.' },
      { id: 'exp-2', title: 'Software Engineer', company: 'Innovate Corp.', startDate: '2015-06', endDate: '2020-01', years: '2015 - 2020', description: 'Developed and maintained front-end applications using React.js. Collaborated with cross-functional teams to deliver new features on time.' },
    ],
    education: [
      { id: 'edu-1', degree: 'M.Sc. Computer Science', university: 'State University', startDate: '2013-09', endDate: '2015-06', years: '2013 - 2015', details: '' },
      { id: 'edu-2', degree: 'B.Eng. Software Engineering', university: 'City University', startDate: '2009-09', endDate: '2013-06', years: '2009 - 2013', details: '' },
    ],
    skills: [
      'JavaScript',
      'React',
      'Node.js',
      'Python',
      'FastAPI',
      'SQL',
      'AWS',
      'Docker',
      'Git',
      'Agile Methodologies'
    ],
    contact: 'john.doe@example.com | (123) 456-7890 | linkedin.com/in/johndoe',
  });

  const [message, setMessage] = useState('');
  const messageTimeoutRef = useRef(null);

  // Function to show transient messages
  const showMessage = (msg) => {
    
    setMessage(msg);
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => {
      setMessage('');
    }, 2000);
  };
  


  // Save resume handler
  const handleSaveResume = async () => {
    try {
      const res = await saveResume(resume);
      
      setResumeId(res?.resume_id);
      showMessage(res?.message || 'Resume saved!');
    } catch (e) {
      showMessage('Error saving resume.', e);
    }
  };


  const handleDownloadResume = async () => {
    try {
      const url = await downloadSavedResume(resumeId);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showMessage('Resume downloaded!');
    } catch (err) {
      showMessage('Error downloading resume.', err.message);
    }
  };


  return (
    <div className={`w-[90%] h-[90%] ${showResumeForm ? 'flex' : ''}`}>
      <div
        id='resume editor'
        className={` ${showResumeForm ? 'w-[50%]' : 'w-full'} h-full bg-foreground flex flex-col items-center justify-center rounded-lg
          drop-shadow-xl drop-shadow-muted/20`}
      >
        {showResumeForm && <div className="flex flex-wrap justify-center gap-4  p-10">
          <button
            onClick={() => setShowResumeForm(false)}
            className="w-min h-auto p-2 px-5 rounded-sm text-background font-semibold bg-text whitespace-nowrap
              hover:cursor-pointer hover:bg-text active:bg-muted flex items-center gap-2"
          >
            <FileUp size={20} /> Upload another resume
          </button>
          <button
            onClick={handleSaveResume}
            className="w-min h-auto p-2 px-5  rounded-sm text-background font-semibold bg-text whitespace-nowrap
              hover:cursor-pointer hover:bg-text active:bg-muted flex items-center gap-2"
          >
            <Save size={20} /> Save Resume
          </button>
          <button
            onClick={handleDownloadResume}
            className="w-min h-auto p-2 px-5 rounded-sm text-background font-semibold bg-text whitespace-nowrap
              hover:cursor-pointer hover:bg-text active:bg-muted flex items-center gap-2"
          >
            <Download size={20} /> Download JSON
          </button>
        </div>}
        {message && (
          <div className="mb-4 text-center text-green-700 bg-green-100 px-4 py-2 rounded">{message}</div>
        )}
        {!showResumeForm && <UploadResumeForm setShowResumeForm={setShowResumeForm} />}
        {showResumeForm && <ResumeEditorForm resume={resume} setResume={setResume} />}
      </div>
      <div
        className={`h-full bg-text flex flex-col transition-opacity duration-1000 ease-in origin-right rounded-r-xl
          drop-shadow-xl drop-shadow-muted/20 ${
          showResumeForm ? 'w-[50%] opacity-100' : 'w-none opacity-0'
        }`}
      >
        <ResumePDF resume={resume} />
      </div>
    </div>
  );
};

export default ResumeEditor;