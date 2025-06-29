// import React, { useState, useRef } from 'react';
// //import { FileUp, Sparkles, Save, Download, Plus, Minus, XCircle } from 'lucide-react';

// // Main App Component
// function App() {
//   const [resume, setResume] = useState({
//     name: 'John Doe',
//     title: 'Senior Software Engineer',
//     summary: 'Highly motivated and results-oriented Senior Software Engineer with 10+ years of experience in developing scalable web applications and leading successful projects.',
//     experience: [
//       { id: 'exp-1', title: 'Senior Software Engineer', company: 'Tech Solutions Inc.', years: '2020 - Present', description: 'Led development of critical microservices, improving system performance by 30%. Mentored junior developers and fostered a collaborative environment.' },
//       { id: 'exp-2', title: 'Software Engineer', company: 'Innovate Corp.', years: '2015 - 2020', description: 'Developed and maintained front-end applications using React.js. Collaborated with cross-functional teams to deliver new features on time.' },
//     ],
//     education: [
//       { id: 'edu-1', degree: 'M.Sc. Computer Science', university: 'State University', years: '2013 - 2015', details: 'Specialized in Distributed Systems.' },
//       { id: 'edu-2', degree: 'B.Eng. Software Engineering', university: 'City University', years: '2009 - 2013', details: 'Graduated with honors.' },
//     ],
//     skills: 'JavaScript, React, Node.js, Python, FastAPI, SQL, AWS, Docker, Git, Agile Methodologies',
//     contact: 'john.doe@example.com | (123) 456-7890 | linkedin.com/in/johndoe',
//   });

//   const [message, setMessage] = useState('');
//   const messageTimeoutRef = useRef(null);

//   // Function to show transient messages
//   const showMessage = (msg) => {
//     setMessage(msg);
//     if (messageTimeoutRef.current) {
//       clearTimeout(messageTimeoutRef.current);
//     }
//     messageTimeoutRef.current = setTimeout(() => {
//       setMessage('');
//     }, 3000); // Message disappears after 3 seconds
//   };

//   // Generic handler for updating text fields
//   const handleTextChange = (field, value) => {
//     setResume(prev => ({ ...prev, [field]: value }));
//   };

//   // Handler for updating nested list items (experience, education)
//   const handleListItemChange = (section, id, field, value) => {
//     setResume(prev => ({
//       ...prev,
//       [section]: prev[section].map(item =>
//         item.id === id ? { ...item, [field]: value } : item
//       )
//     }));
//   };

//   // Add new item to a section (experience, education)
//   const addListItem = (section) => {
//     const newItem = { id: `new-${Date.now()}`, title: '', company: '', years: '', description: '', degree: '', university: '', details: '' };
//     setResume(prev => ({
//       ...prev,
//       [section]: [...prev[section], newItem]
//     }));
//   };

//   // Remove item from a section (experience, education)
//   const removeListItem = (section, id) => {
//     setResume(prev => ({
//       ...prev,
//       [section]: prev[section].filter(item => item.id !== id)
//     }));
//   };

//   // Mock resume upload - loads dummy data
//   const handleUploadResume = () => {
//     // In a real app, you would parse the file content here.
//     // For this mock, we just load predefined dummy content.
//     const dummyResume = {
//       name: 'Jane Smith',
//       title: 'Marketing Specialist',
//       summary: 'Dynamic and creative Marketing Specialist with 5 years of experience in digital marketing, content creation, and campaign management.',
//       experience: [
//         { id: 'exp-3', title: 'Marketing Manager', company: 'Global Brands', years: '2022 - Present', description: 'Developed and executed digital marketing strategies. Managed social media campaigns achieving 20% engagement increase.' },
//         { id: 'exp-4', title: 'Marketing Coordinator', company: 'Local Startups', years: '2020 - 2022', description: 'Assisted in content creation and email marketing. Organized promotional events and managed client relationships.' },
//       ],
//       education: [
//         { id: 'edu-3', degree: 'B.A. Marketing', university: 'National University', years: '2016 - 2020', details: 'Focused on digital marketing and consumer behavior.' },
//       ],
//       skills: 'Digital Marketing, SEO, SEM, Content Creation, Social Media Management, Google Analytics, CRM, Public Relations',
//       contact: 'jane.smith@example.com | (987) 654-3210 | linkedin.com/in/janesmith',
//     };
//     setResume(dummyResume);
//     showMessage('Dummy resume loaded successfully!');
//   };

//   // AI Enhance Section
//   const handleAIEnhance = async (section, content, id = null, field = null) => {
//     try {
//       const response = await fetch('http://localhost:8000/ai-enhance', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ section, content }),
//       });
//       const data = await response.json();
//       const enhancedContent = data.enhanced_content;

//       if (id && field) { // For nested items like experience/education descriptions
//         setResume(prev => ({
//           ...prev,
//           [section]: prev[section].map(item =>
//             item.id === id ? { ...item, [field]: enhancedContent } : item
//           )
//         }));
//       } else { // For top-level text fields
//         setResume(prev => ({ ...prev, [section]: enhancedContent }));
//       }
//       showMessage(`'${section}' section enhanced!`);
//     } catch (error) {
//       console.error('Error enhancing section:', error);
//       showMessage('Error enhancing section. Please check backend.');
//     }
//   };

//   // Save Resume
//   const handleSaveResume = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/save-resume', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ resume }),
//       });
//       const data = await response.json();
//       showMessage(`Resume saved successfully! ID: ${data.resume_id}`);
//     } catch (error) {
//       console.error('Error saving resume:', error);
//       showMessage('Error saving resume. Please check backend.');
//     }
//   };

//   // Download Resume
//   const handleDownloadResume = () => {
//     try {
//       const jsonString = JSON.stringify(resume, null, 2);
//       const blob = new Blob([jsonString], { type: 'application/json' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `${resume.name.replace(/\s/g, '_')}_resume.json`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//       showMessage('Resume downloaded!');
//     } catch (error) {
//       console.error('Error downloading resume:', error);
//       showMessage('Error downloading resume.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 font-inter text-gray-800">
//       <header className="text-center mb-8">
//         <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-lg mb-2">Resume Editor</h1>
//         <p className="text-xl text-gray-600">Edit, Enhance, and Download Your Professional Resume</p>
//         {message && (
//           <div className="mt-4 bg-purple-100 text-purple-800 p-3 rounded-lg shadow-md text-lg transition-opacity duration-300 animate-fade-in">
//             {message}
//           </div>
//         )}
//       </header>

//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
//         {/* Action Buttons */}
//         <div className="flex flex-wrap justify-center gap-4 mb-8">
//           <button
//             onClick={handleUploadResume}
//             className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             {/* <FileUp size={20} /> Mock Upload Resume */}
//           </button>
//           <button
//             onClick={handleSaveResume}
//             className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             {/* <Save size={20} /> Save Resume */}
//           </button>
//           <button
//             onClick={handleDownloadResume}
//             className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white font-semibold rounded-full shadow-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             {/* <Download size={20} /> Download JSON */}
//           </button>
//         </div>

//         {/* Name and Title */}
//         <section className="mb-8 p-6 bg-indigo-50 rounded-xl shadow-inner border border-indigo-100">
//           <h2 className="text-3xl font-bold text-indigo-800 mb-4">Personal Details</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
//               <input
//                 type="text"
//                 className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
//                 value={resume.name}
//                 onChange={(e) => handleTextChange('name', e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2">Title / Profession</label>
//               <input
//                 type="text"
//                 className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
//                 value={resume.title}
//                 onChange={(e) => handleTextChange('title', e.target.value)}
//               />
//             </div>
//             <div className="md:col-span-2">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Contact Information</label>
//                 <input
//                     type="text"
//                     className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
//                     value={resume.contact}
//                     onChange={(e) => handleTextChange('contact', e.target.value)}
//                 />
//             </div>
//           </div>
//         </section>

//         {/* Summary Section */}
//         <ResumeSection
//           title="Summary"
//           content={resume.summary}
//           onContentChange={(value) => handleTextChange('summary', value)}
//           onEnhance={() => handleAIEnhance('summary', resume.summary)}
//         />

//         {/* Experience Section */}
//         <section className="mb-8 p-6 bg-yellow-50 rounded-xl shadow-inner border border-yellow-100">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-3xl font-bold text-yellow-800">Experience</h2>
//             <button
//               onClick={() => addListItem('experience')}
//               className="flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 transition"
//             >
//               {/* <Plus size={18} />  */}Add
//             </button>
//           </div>
//           {resume.experience.map(exp => (
//             <div key={exp.id} className="bg-white p-5 rounded-lg shadow-md mb-4 last:mb-0 border border-yellow-200">
//               <div className="flex justify-end mb-2">
//                 <button
//                   onClick={() => removeListItem('experience', exp.id)}
//                   className="text-red-500 hover:text-red-700 transition"
//                   title="Remove Experience"
//                 >
//                   {/* <XCircle size={20} /> */}
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-gray-700 text-sm font-bold mb-1">Job Title</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-yellow-300"
//                     value={exp.title}
//                     onChange={(e) => handleListItemChange('experience', exp.id, 'title', e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm font-bold mb-1">Company</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-yellow-300"
//                     value={exp.company}
//                     onChange={(e) => handleListItemChange('experience', exp.id, 'company', e.target.value)}
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-gray-700 text-sm font-bold mb-1">Years</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-yellow-300"
//                     value={exp.years}
//                     onChange={(e) => handleListItemChange('experience', exp.id, 'years', e.target.value)}
//                   />
//                 </div>
//               </div>
//               <label className="block text-gray-700 text-sm font-bold mb-1">Description</label>
//               <textarea
//                 className="w-full p-2 border border-gray-200 rounded-lg h-32 resize-y focus:ring-1 focus:ring-yellow-300"
//                 value={exp.description}
//                 onChange={(e) => handleListItemChange('experience', exp.id, 'description', e.target.value)}
//               />
//               <button
//                 onClick={() => handleAIEnhance('experience', exp.description, exp.id, 'description')}
//                 className="flex items-center gap-1 mt-3 px-4 py-2 bg-yellow-500 text-white rounded-full text-sm shadow-md hover:bg-yellow-600 transition"
//               >
//                 {/* <Sparkles size={16} /> Enhance Description */}
//               </button>
//             </div>
//           ))}
//         </section>

//         {/* Education Section */}
//         <section className="mb-8 p-6 bg-pink-50 rounded-xl shadow-inner border border-pink-100">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-3xl font-bold text-pink-800">Education</h2>
//             <button
//               onClick={() => addListItem('education')}
//               className="flex items-center gap-1 px-4 py-2 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition"
//             >
//               Add{/* <Plus size={18} />  */}
//             </button>
//           </div>
//           {resume.education.map(edu => (
//             <div key={edu.id} className="bg-white p-5 rounded-lg shadow-md mb-4 last:mb-0 border border-pink-200">
//               <div className="flex justify-end mb-2">
//                 <button
//                   onClick={() => removeListItem('education', edu.id)}
//                   className="text-red-500 hover:text-red-700 transition"
//                   title="Remove Education"
//                 >
//                   {/* <XCircle size={20} /> */}
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-gray-700 text-sm font-bold mb-1">Degree</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-pink-300"
//                     value={edu.degree}
//                     onChange={(e) => handleListItemChange('education', edu.id, 'degree', e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 text-sm font-bold mb-1">University</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-pink-300"
//                     value={edu.university}
//                     onChange={(e) => handleListItemChange('education', edu.id, 'university', e.target.value)}
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-gray-700 text-sm font-bold mb-1">Years</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-pink-300"
//                     value={edu.years}
//                     onChange={(e) => handleListItemChange('education', edu.id, 'years', e.target.value)}
//                   />
//                 </div>
//               </div>
//               <label className="block text-gray-700 text-sm font-bold mb-1">Details</label>
//               <textarea
//                 className="w-full p-2 border border-gray-200 rounded-lg h-24 resize-y focus:ring-1 focus:ring-pink-300"
//                 value={edu.details}
//                 onChange={(e) => handleListItemChange('education', edu.id, 'details', e.target.value)}
//               />
//               <button
//                 onClick={() => handleAIEnhance('education', edu.details, edu.id, 'details')}
//                 className="flex items-center gap-1 mt-3 px-4 py-2 bg-pink-500 text-white rounded-full text-sm shadow-md hover:bg-pink-600 transition"
//               >
//                 {/* <Sparkles size={16} /> Enhance Details */}
//               </button>
//             </div>
//           ))}
//         </section>

//         {/* Skills Section */}
//         <ResumeSection
//           title="Skills"
//           content={resume.skills}
//           onContentChange={(value) => handleTextChange('skills', value)}
//           onEnhance={() => handleAIEnhance('skills', resume.skills)}
//           placeholder="e.g., JavaScript, React, Python, SQL, AWS, Docker"
//         />
//       </div>

//       {/* Font loading for Inter */}
//       <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
//     </div>
//   );
// }

// // Reusable component for sections with a single text area and AI enhance button
// const ResumeSection = ({ title, content, onContentChange, onEnhance, placeholder = "" }) => (
//   <section className="mb-8 p-6 bg-blue-50 rounded-xl shadow-inner border border-blue-100">
//     <h2 className="text-3xl font-bold text-blue-800 mb-4">{title}</h2>
//     <textarea
//       className="w-full p-3 border border-blue-200 rounded-lg shadow-sm h-40 resize-y focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
//       value={content}
//       onChange={(e) => onContentChange(e.target.value)}
//       placeholder={placeholder || `Enter your ${title.toLowerCase()} here...`}
//     />
//     <button
//       onClick={onEnhance}
//       className="flex items-center gap-1 mt-4 px-5 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
//     >
//       {/* <Sparkles size={20} /> Enhance with AI */}
//     </button>
//   </section>
// );

// export default App;

import React, { useState } from 'react';
import UploadResumeForm from './uploadResumeForm';
import ResumeEditorForm from './resumeEditorForm';
import ResumePDF from './resumePdf';

const ResumeEditor = ({ showResumeForm, setShowResumeForm }) => {
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

  return (
    <div className={`w-full h-full ${showResumeForm ? 'flex' : ''}`}>
      <div
        id='resume editor'
        className={` ${showResumeForm ? 'w-[50%]' : 'w-full'} h-full bg-foreground flex flex-col items-center justify-center rounded-lg
          drop-shadow-xl drop-shadow-muted/20`}
      >
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