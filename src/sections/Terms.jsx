import { Link } from "react-router-dom"

const Terms = () => {
  return (
    <section className="c-space pt-32 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8">
          <span>←</span> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Terms & Conditions
        </h1>
        
        <div className="space-y-6 text-neutral-300">
          <p className="text-neutral-400">
            Last Updated: October 27, 2025
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
            <p className="text-neutral-400 leading-relaxed">
              Welcome to Dennis Lemayan Leleina's portfolio website. By accessing and using this website, 
              you accept and agree to be bound by the terms and provisions of this agreement. If you do not 
              agree to these terms, please do not use this website.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Open Source Nature</h2>
            <p className="text-neutral-400 leading-relaxed">
              This portfolio website is open source and available for educational purposes. While the code is 
              publicly accessible, the content, including but not limited to personal information, project 
              descriptions, images, and written materials, remains the intellectual property of Dennis Lemayan Leleina.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Use of Content</h2>
            <p className="text-neutral-400 leading-relaxed">
              You may view, download, and use the source code of this website for personal, educational, or 
              non-commercial purposes. However, you may not:
            </p>
            <ul className="list-none space-y-2 ml-6">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Copy or replicate personal information, portfolio content, or project descriptions without explicit permission</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Use the content for commercial purposes without prior written consent</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Misrepresent the work or projects showcased as your own</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Use any content in a way that could harm the reputation of Dennis Lemayan Leleina</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Intellectual Property Rights</h2>
            <p className="text-neutral-400 leading-relaxed">
              All project work, case studies, designs, code implementations, and creative content displayed on 
              this website are the intellectual property of Dennis Lemayan Leleina unless otherwise stated. 
              Unauthorized use, reproduction, or distribution of this content is strictly prohibited.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Contact Form Submissions</h2>
            <p className="text-neutral-400 leading-relaxed">
              By submitting a message through the contact form, you consent to the collection and processing 
              of your provided information (name, email address, and message content) solely for the purpose 
              of responding to your inquiry. Your information will not be shared with third parties or used 
              for marketing purposes without your explicit consent.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Client Testimonials</h2>
            <p className="text-neutral-400 leading-relaxed">
              The testimonials and client reviews displayed on this website represent genuine feedback from 
              actual clients. The views expressed are those of the clients and do not necessarily reflect the 
              views of any third party.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. External Links</h2>
            <p className="text-neutral-400 leading-relaxed">
              This website may contain links to external websites, including social media profiles and project 
              repositories. We are not responsible for the content, privacy practices, or terms of service of 
              these external sites. Use of external links is at your own risk.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Disclaimer of Warranties</h2>
            <p className="text-neutral-400 leading-relaxed">
              This website is provided "as is" without any representations or warranties, express or implied. 
              While we strive to keep the information accurate and up-to-date, we make no warranties about the 
              completeness, reliability, or accuracy of this information.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">9. Limitation of Liability</h2>
            <p className="text-neutral-400 leading-relaxed">
              Dennis Lemayan Leleina shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your access to or use of this website.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">10. Changes to Terms</h2>
            <p className="text-neutral-400 leading-relaxed">
              We reserve the right to modify these terms and conditions at any time. Changes will be effective 
              immediately upon posting to this website. Your continued use of the website following any changes 
              constitutes acceptance of those changes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">11. Governing Law</h2>
            <p className="text-neutral-400 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of Kenya. 
              Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts 
              of Kenya.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">12. Contact Information</h2>
            <p className="text-neutral-400 leading-relaxed">
              If you have any questions about these Terms & Conditions, please contact us through the contact 
              form on this website or via the provided social media channels.
            </p>
          </div>

          <div className="mt-12 p-6 border border-purple-500/30 rounded-lg bg-purple-500/5">
            <p className="text-neutral-400 leading-relaxed">
              By using this website, you acknowledge that you have read, understood, and agree to be bound by 
              these Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
