import React, { useState } from 'react'
import RichTextEditor from './richTextEditor';
import { Sparkles, CircleX  } from 'lucide-react';
import { aiEnhance } from '../api/api';

const ResumeEditorForm = ({resume, setResume}) => {
  const [loading, setLoading] = useState(false);

  // Generic handler for updating text fields
  const handleTextChange = (field, value) => {
    setResume(prev => ({ ...prev, [field]: value }));
  };

  // Handler for updating nested list items (experience, education)
  const handleListItemChange = (section, id, field, value) => {
    setResume(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Add new item to a section (experience, education)
  const addListItem = (section) => {
    const newItem =
      section === 'experience'
        ? { id: `new-${Date.now()}`, title: '', company: '', startDate: '', endDate: '', years: '', description: '' }
        : { id: `new-${Date.now()}`, degree: '', university: '', startDate: '', endDate: '', years: '', details: '' };
    setResume(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  // Remove item from a section (experience, education)
  const removeListItem = (section, id) => {
    setResume(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  // RichTextEditor handler for summary and details
  const handleRichTextChange = (field, value) => {
    setResume(prev => ({ ...prev, [field]: value }));
  };

  // RichTextEditor handler for nested fields
  const handleNestedRichTextChange = (section, id, field, value) => {
    setResume(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // AI Enhance for top-level fields (summary, skills)
  const handleAIEnhance = async (section, value, field = null, id = null) => {
    setLoading(true);
    try {
      const res = await aiEnhance(section, value);
      if (field && id) {
        // Nested (experience/education)
        setResume(prev => ({
          ...prev,
          [section]: prev[section].map(item =>
            item.id === id ? { ...item, [field]: res.enhanced_content } : item
          )
        }));
      } else {
        // Top-level (summary, skills)
        setResume(prev => ({
          ...prev,
          [section]: res.enhanced_content
        }));
      }
      //showMessage('Enhanced with AI!');
    } catch (e) {
      console.log("Error: ", e);
      
      //showMessage('AI enhancement failed.', e);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className='w-full h-full overflow-auto'>
      <div className='flex flex-col p-5'>
        {/* personal details section */}
        <section className="w-full h-auto mb-8 p-6 bg-background rounded-md border border-muted/10">
          <h2 className="text-3xl font-bold text-text mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-muted text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                className="w-full p-3 bg-background text-text border border-muted/50 rounded-md shadow-sm focus:ring-2 focus:ring-muted focus:border-transparent transition"
                value={resume.name}
                onChange={(e) => handleTextChange('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted text-sm font-bold mb-2">Title / Profession</label>
              <input
                type="text"
                className="w-full p-3 bg-background text-text border border-muted/50 rounded-md shadow-sm focus:ring-2 focus:ring-muted focus:border-transparent transition"
                value={resume.title}
                onChange={(e) => handleTextChange('title', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-muted text-sm font-bold mb-2">Contact Information</label>
              <input
                type="text"
                className="w-full p-3 bg-background text-text border border-muted/50 rounded-md shadow-sm focus:ring-2 focus:ring-muted focus:border-transparent transition"
                value={resume.contact}
                onChange={(e) => handleTextChange('contact', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <ResumeSection
          title="Summary"
          content={resume.summary}
          onContentChange={(value) => handleRichTextChange('summary', value)}
          onEnhance={() => handleAIEnhance('summary', resume.summary)}
          loading={loading}
        />

        {/* Experience Section */}
        <section className="w-full h-auto mb-8 p-6 bg-background rounded-md border border-muted/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-text">Experience</h2>
            <button
              onClick={() => addListItem('experience')}
              className="flex items-center gap-1 px-4 py-2 bg-text text-background rounded-md shadow-sm font-semibold hover:bg-muted transition cursor-pointer"
            >
              Add
            </button>
          </div>
          {resume.experience.map(exp => (
            <div key={exp.id} className="bg-foreground p-5 rounded-md shadow-sm mb-4 last:mb-0 border border-muted/10">
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => removeListItem('experience', exp.id)}
                  className="text-red-500 hover:text-red-700 transition cursor-pointer"
                  title="Remove Experience"
                >
                  <CircleX />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-muted text-sm font-bold mb-2">Job Title</label>
                  <input
                    type="text"
                    className="w-full p-3 text-text border border-muted/50 rounded-md shadow-sm focus:ring-2 focus:ring-muted focus:border-transparent transition"
                    value={exp.title}
                    onChange={(e) => handleListItemChange('experience', exp.id, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-muted text-sm font-bold mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full p-3 text-text border border-muted/50 rounded-md shadow-sm focus:ring-2 focus:ring-muted focus:border-transparent transition"
                    value={exp.company}
                    onChange={(e) => handleListItemChange('experience', exp.id, 'company', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-muted text-sm font-bold mb-2">Start Date</label>
                  <input
                    type="month"
                    className="w-full p-3 text-text border border-muted/50 rounded-md shadow-sm focus:ring-2 focus:ring-muted focus:border-transparent transition"
                    value={exp.startDate || ''}
                    onChange={(e) => handleListItemChange('experience', exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-muted text-sm font-bold mb-2">End Date</label>
                  <input
                    type="month"
                    className="w-full p-3 text-text border border-muted/50 rounded-md shadow-sm focus:ring-2 focus:ring-muted focus:border-transparent transition"
                    value={exp.endDate || ''}
                    onChange={(e) => handleListItemChange('experience', exp.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>
              <label className="block text-muted text-sm font-bold mb-2">Description</label>
              <RichTextEditor
                initialContent={exp.description}
                onContentChange={(value) => handleNestedRichTextChange('experience', exp.id, 'description', value)}
                placeholder="Describe your responsibilities and achievements..."
              />
              <button
                onClick={() => handleAIEnhance('experience', exp.description, 'description', exp.id)}
                className="flex items-center gap-2 mt-4 px-3 py-2 bg-text text-background font-semibold rounded-sm hover:cursor-pointer active:bg-muted"
                disabled={loading}
              >
                <Sparkles /> {loading ? "Enhancing..." : "Enhance Description"}
              </button>
            </div>
          ))}
        </section>

        {/* Education Section */}
        <section className="w-full h-auto mb-0 p-6 bg-background rounded-md border border-muted/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-text">Education</h2>
            <button
              onClick={() => addListItem('education')}
              className="flex items-center gap-1 px-4 py-2 bg-text text-background rounded-md shadow-sm font-semibold hover:bg-muted transition cursor-pointer"
            >
              Add
            </button>
          </div>
          {resume.education.map(edu => (
            <div key={edu.id} className="bg-foreground p-5 rounded-md shadow-sm mb-4 last:mb-0 border border-muted/10">
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => removeListItem('education', edu.id)}
                  className="text-red-500 hover:text-red-700 transition cursor-pointer"
                  title="Remove Education"
                >
                  <CircleX />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-muted text-sm font-bold mb-2">Degree</label>
                  <input
                    type="text"
                    className="w-full p-3 text-text border border-muted/50 rounded-md shadow-sm focus:ring-2 focus:ring-muted focus:border-transparent transition"
                    value={edu.degree}
                    onChange={(e) => handleListItemChange('education', edu.id, 'degree', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-muted text-sm font-bold mb-2">University</label>
                  <input
                    type="text"
                    className="w-full p-3 text-text border border-muted/50 rounded-md shadow-sm focus:ring-2 focus:ring-muted focus:border-transparent transition"
                    value={edu.university}
                    onChange={(e) => handleListItemChange('education', edu.id, 'university', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-muted text-sm font-bold mb-2">Start Date</label>
                  <input
                    type="month"
                    className="w-full p-3 text-text border border-muted/50 rounded-md shadow-sm focus:ring-2 focus:ring-muted focus:border-transparent transition"
                    value={edu.startDate || ''}
                    onChange={(e) => handleListItemChange('education', edu.id, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-muted text-sm font-bold mb-2">End Date</label>
                  <input
                    type="month"
                    className="w-full p-3 text-text border border-muted/50 rounded-md shadow-sm focus:ring-2 focus:ring-muted focus:border-transparent transition"
                    value={edu.endDate || ''}
                    onChange={(e) => handleListItemChange('education', edu.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>
              <label className="block text-muted text-sm font-bold mb-2">Details</label>
              <RichTextEditor
                initialContent={edu.details}
                onContentChange={(value) => handleNestedRichTextChange('education', edu.id, 'details', value)}
                placeholder="Add any additional details about your education..."
              />
              <button
                onClick={() => handleAIEnhance('education', edu.details, 'details', edu.id)}
                className="flex items-center gap-2 mt-4 px-3 py-2 bg-text text-background font-semibold rounded-sm hover:cursor-pointer active:bg-muted"
                disabled={loading}
              >
                <Sparkles /> {loading ? "Enhancing..." : "Enhance Details"}
              </button>
            </div>
          ))}
        </section>
        <br />
        {/* Skills Section */}
        <section className="w-full h-auto mb-8 p-6 bg-background rounded-md border border-muted/10">
          <h2 className="text-3xl font-bold text-text mb-4">Skills</h2>
          <textarea
            className="w-full min-h-20 p-3 bg-background text-text border border-muted/50 rounded-md shadow-sm focus:ring-2 focus:ring-muted focus:border-transparent transition"
            value={resume.skills.join(', ')}
            onChange={(e) => {
              const skillsArr = e.target.value
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);
              setResume(prev => ({ ...prev, skills: skillsArr }));
            }}
            placeholder="e.g., JavaScript, React, Python, SQL, AWS, Docker"
            rows={3}
          />
          <button
            onClick={() => handleAIEnhance('skills', resume.skills.join(', '))}
            className="flex items-center gap-2 mt-4 px-3 py-2 bg-text text-background font-semibold rounded-sm hover:cursor-pointer active:bg-muted"
            disabled={loading}
          >
            <Sparkles /> {loading ? "Enhancing..." : "Enhance Skills"}
          </button>
        </section>

        {/* Message */}
        {/* {message && (
          <div className="mt-4 bg-muted text-text p-3 rounded-lg shadow-md text-lg transition-opacity duration-300 animate-fade-in">
            {message}
          </div>
        )} */}
      </div>
    </div>
  )
}

// Reusable component for sections with a single text area and AI enhance button
const ResumeSection = ({ title, content, onContentChange, onEnhance, loading, placeholder = "" }) => (
  <section className="w-full h-full mb-8 p-6 bg-background rounded-md border-1 border-muted/10">
    <h2 className="text-3xl font-bold text-text mb-4">{title}</h2>
    <RichTextEditor
      initialContent={content}
      onContentChange={onContentChange}
      placeholder={placeholder || `Enter your ${title.toLowerCase()} here...`}
    />
    <button
      onClick={onEnhance}
      className="flex items-center gap-2 mt-4 px-3 py-2 bg-text text-background font-semibold rounded-sm hover:cursor-pointer active:bg-muted"
      disabled={loading}
    >
      <Sparkles /> {loading ? "Enhancing..." : "Enhance with AI"}
    </button>
  </section>
);

export default ResumeEditorForm