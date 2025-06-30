# Resume Editor
This is a web based resume editor that lets users upload and edit their resume & enhance sections using AI.

---

### This was an assignment from Interview Ghost, where the goal was to: 
1. Build a web-based Resume Editor that lets users:
2. Upload and edit their resumes & Enhance sections using a mock AI backend
3. Save and retrieve resume data via a FastAPI backend & Download the final resume

### Functional Requirements:
1. Frontend (React.js or similar):
2. Upload Resume: Accept .pdf or .docx files. Mock the parsing process (use dummy content)
3. Edit Resume: Editable fields like name, experience, education, skills. Ability to add or remove entries

### Enhance with AI: 

Add a button "Enhance with AI" next to each section
When clicked, send the section content to the backend (/ai-enhance). Display the improved version returned by the backend

### Save Resume: 

Save the complete resume JSON to the backend using /save-resume
Download: Allow downloading the final resume as a .json file

###Backend (Python FastAPI):

POST /ai-enhance:
Input: {"section": "summary", "content": "Experienced developer..."}
Output: a mocked improved version of the content

POST /save-resume:
Input: full resume JSON. Store it in memory or save it to disk (no database required)

---

# Features

- The website is a single page website that has a landing section, a how it works section and a resume editor section.
- You can drag and drop any .pdf or .docx file to upload.
- The website provides a pdf viewer from which you can download the resume as a .pdf file.
- You can enhance each section and add more sections needed 
- The website features dark and light themes.

---

# Setup instructions

### Frontend

Install all dependencies as listed in /frontend/package.json

execute the following commands sequentially from the root directory
```
cd frontend
npm install
npm run dev
```

There is an exvironment variable you must provide if you are running locally which is:
```
VITE_API_URL = http://127.0.0.1:8000
```

The frontend is deployed on 
https://resume-editor-jet.vercel.app/

---

### Backend 

Install all the dependencies as listed in /backend/requirements.txt

Execute the following sequentially:
```
cd backend
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install fastapi uvicorn pydantic
uvicorn server:app --reload   # To run the backend.
```

| Method | Endpoint                       | Description                                   |
| ------ | ------------------------------ | --------------------------------------------- |
| POST   | `/ai-enhance`                  | Mock AI-enhanced content for sections         |
| POST   | `/save-resume`                 | Save resume as JSON file locally              |
| POST   | `/download-resume/{resume_id}` | To download the resume details as a JSON file |

I added an extra route /download-resume/{resume-id} to download the resume details as a JSON file.

---

### __Testing the routes__

/ai-enhance

Method: POST

Body: JSON
```
{
  "section": "summary",
  "content": "Experienced developer with passion for AI."
}
```

/save-resume

Method: POST

Body: JSON
```
{
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
}
```
/download-resume/${resumeId}

Method: POST

Body: JSON
```
{
resume_id: "//resume id goes here" #check console logs for resume_id,
}
```

No need for user to explicitly state resume_id on the website, this is just for dev side.

The backend is deployed on:
https://resumeeditor.onrender.com/


