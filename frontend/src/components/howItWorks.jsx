import { FaKeyboard, FaMagic, FaUserCheck } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <div className="max-w-5xl mx-5 md:mx-auto my-30 px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        How our AI improves your resume.
      </h2>
      <br />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        
        {/* Step 1 */}
        <div className="flex flex-col items-center bg-foreground shadow-lg hover:shadow-muted/10 rounded-xl p-6 text-center hover:shadow-xl transition">
          <div className="text-4xl text-text mb-4 mx-auto">
            <FaKeyboard />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-text">Upload your resume</h3>
          <p className="font-normal  text-muted">Upload your resume in a PDF or WORD format</p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center bg-foreground shadow-lg hover:shadow-muted/10 rounded-xl p-6 text-center hover:shadow-xl transition">
          <div className="text-4xl text-text mb-4 mx-auto">
            <FaMagic />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-text">AI Enhances It</h3>
          <p className="font-normal text-muted">
            Click “Enhance with AI” next to any section you want to enhance and watch your section improve instantly with polished, impactful wording.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center bg-foreground shadow-lg hover:shadow-muted/10 rounded-xl p-6 text-center hover:shadow-xl transition">
          <div className="text-4xl text-text mb-4 mx-auto">
            <FaUserCheck />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-text">You Stay in Control</h3>
          <p className="font-normal text-muted">
            Keep, tweak, or skip AI suggestions — you're always in charge of how your resume looks.
          </p>
        </div>
        
      </div>
    </div>
  );
}
