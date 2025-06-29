// import React from "react"

// export const Homepage = () => {
//     return (
//         <div id="webcrumbs">
//             <div className="w-[1200px] bg-gray-900 text-white min-h-screen">
//                 <div className="px-8 py-16">
//                     <div className="max-w-6xl mx-auto">
//                         <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
//                             <div className="space-y-6">
//                                 <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent leading-tight">
//                                     Level Up Your Career With Our Smart Resume Editor
//                                 </h1>
//                                 <p className="text-gray-300 text-xl">
//                                     Create, customize, and optimize your resume with AI-powered tools designed to help
//                                     you stand out and land your dream job.
//                                 </p>
//                                 <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                                     <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-md hover:opacity-90 transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center">
//                                         <span className="material-symbols-outlined mr-2">edit_document</span>
//                                         Create New Resume
//                                     </button>
//                                     <button className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 transition-all duration-300 flex items-center justify-center font-medium">
//                                         <span className="material-symbols-outlined mr-2">upload_file</span>
//                                         Upload Existing Resume
//                                     </button>
//                                 </div>
//                                 <div className="flex items-center gap-4 text-gray-400 pt-2">
//                                     <div className="flex items-center gap-1">
//                                         <span className="material-symbols-outlined text-green-400">check_circle</span>
//                                         <span>AI-Enhanced</span>
//                                     </div>
//                                     <div className="flex items-center gap-1">
//                                         <span className="material-symbols-outlined text-green-400">check_circle</span>
//                                         <span>ATS-Optimized</span>
//                                     </div>
//                                     <div className="flex items-center gap-1">
//                                         <span className="material-symbols-outlined text-green-400">check_circle</span>
//                                         <span>Free Templates</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-50"></div>
//                                 <div className="relative bg-gray-800 p-8 rounded-2xl shadow-xl">
//                                     <div className="flex justify-between items-center mb-6">
//                                         <h3 className="text-2xl font-bold">Resume Preview</h3>
//                                         <div className="flex gap-2">
//                                             <span className="h-3 w-3 bg-red-500 rounded-full"></span>
//                                             <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
//                                             <span className="h-3 w-3 bg-green-500 rounded-full"></span>
//                                         </div>
//                                     </div>
//                                     <div className="space-y-4">
//                                         <div className="h-8 bg-gray-700 rounded-md w-3/4"></div>
//                                         <div className="h-4 bg-gray-700 rounded-md w-full"></div>
//                                         <div className="h-4 bg-gray-700 rounded-md w-5/6"></div>
//                                         <div className="h-16 bg-gray-700 rounded-md w-full"></div>
//                                         <div className="grid grid-cols-2 gap-4">
//                                             <div className="h-32 bg-gray-700 rounded-md"></div>
//                                             <div className="h-32 bg-gray-700 rounded-md"></div>
//                                         </div>
//                                         <div className="h-24 bg-gray-700 rounded-md w-full"></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="bg-gray-800 rounded-xl p-8 mb-16">
//                             <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Resume Editor?</h2>
//                             <div className="grid md:grid-cols-3 gap-8">
//                                 <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300 transform hover:scale-105">
//                                     <span className="material-symbols-outlined text-4xl text-purple-400 mb-4">
//                                         auto_awesome
//                                     </span>
//                                     <h3 className="text-xl font-bold mb-2">AI-Powered Enhancement</h3>
//                                     <p className="text-gray-300">
//                                         Let our AI analyze and improve your resume content to highlight your
//                                         achievements and skills.
//                                     </p>
//                                 </div>
//                                 <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300 transform hover:scale-105">
//                                     <span className="material-symbols-outlined text-4xl text-blue-400 mb-4">
//                                         landscape
//                                     </span>
//                                     <h3 className="text-xl font-bold mb-2">ATS-Optimized</h3>
//                                     <p className="text-gray-300">
//                                         Ensure your resume passes through applicant tracking systems with keyword
//                                         optimization.
//                                     </p>
//                                 </div>
//                                 <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors duration-300 transform hover:scale-105">
//                                     <span className="material-symbols-outlined text-4xl text-green-400 mb-4">
//                                         style
//                                     </span>
//                                     <h3 className="text-xl font-bold mb-2">Professional Templates</h3>
//                                     <p className="text-gray-300">
//                                         Choose from dozens of professionally designed templates that stand out to
//                                         recruiters.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="text-center mb-16">
//                             <h2 className="text-3xl font-bold mb-2">Ready to Transform Your Resume?</h2>
//                             <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
//                                 Join thousands of job seekers who have successfully landed interviews with our resume
//                                 editor.
//                             </p>
//                             <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-md hover:opacity-90 transition-all duration-300 transform hover:scale-105 font-medium inline-flex items-center mx-auto">
//                                 <span className="material-symbols-outlined mr-2">rocket_launch</span>
//                                 Get Started Now — It's Free!
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Next: "Add user testimonials section", "Add comparison table with competitors", "Add FAQ accordion section" */}
//             </div>
//         </div>
//     )
// }
