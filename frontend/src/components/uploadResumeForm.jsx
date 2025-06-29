import React from 'react'
const UploadResumeForm = ({setShowResumeForm}) => {

  const [file, setFile] = React.useState(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // Add loading state
  const [uploaded, setUploaded] = React.useState(false); // Optional: track upload completion

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type === "application/msword" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(selectedFile);
    } else {
      setFile(null);
      alert("Please upload a PDF or Word document.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "application/pdf" ||
        droppedFile.type === "application/msword" ||
        droppedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(droppedFile);
    } else {
      setFile(null);
      alert("Please upload a PDF or Word document.");
    }
  };

  const handleSubmit = (e) => {

    console.log("uploading");
    
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setLoading(true);
    setUploaded(false);
    // Mock loading process (e.g., 2 seconds)
    setTimeout(() => {
      setLoading(false);
      setUploaded(true);
      //alert(`File "${file.name}" has been uploaded`);
      setShowResumeForm(true);
    }, 2000);
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`${
            dragActive
              ? "border-4 border-blue-500 bg-blue-50"
              : "border-4 border-dashed border-muted bg-background"
          } w-[500px] h-[200px] flex flex-col justify-center items-center text-center rounded-lg mb-4 cursor-pointer transition-colors`}
          onClick={() => document.getElementById("resume-upload-input").click()}
        >
          <input
            id="resume-upload-input"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
          {file ? (
            <span className="font-medium">{file.name}</span>
          ) : (
            <span className=" text-xl text-text font-semibold w-[300px]">
              Drag & drop your resume here, or click to select a PDF or Word document
            </span>
          )}
        </div>
        <button
          className="bg-text text-background hover:cursor-pointer hover:bg-text active:bg-muted font-semibold rounded-md p-2 transition-colors"
          type="submit"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
        {loading && (
          <div className="mt-2">
            <span>Uploading, please wait...</span>
          </div>
        )}
        {uploaded && !loading && (
          <div className="mt-2 text-green-600">
            <span>Upload complete!</span>
          </div>
        )}
      </form>
    </div>
  )
}

export default UploadResumeForm