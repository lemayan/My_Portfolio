import { Link } from "react-router-dom"

const Privacy = () => {
  return (
    <section className="c-space pt-32 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8">
          <span>←</span> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-neutral-300">
          <p className="text-neutral-400">
            Last Updated: October 27, 2025
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
            <p className="text-neutral-400 leading-relaxed">
              Dennis Lemayan Leleina ("we," "our," or "us") respects your privacy and is committed to protecting 
              your personal data. This privacy policy explains how we collect, use, and safeguard your information 
              when you visit our portfolio website.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Information We Collect</h2>
            <p className="text-neutral-400 leading-relaxed">
              We collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-none space-y-2 ml-6">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Submit a message through our contact form (name, email address, message content)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Interact with our website (browsing behavior, device information, IP address)</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. How We Use Your Information</h2>
            <p className="text-neutral-400 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-none space-y-2 ml-6">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Respond to your inquiries and communicate with you</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Improve our website's functionality and user experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Analyze website traffic and usage patterns</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Comply with legal obligations and prevent fraud</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. EmailJS Integration</h2>
            <p className="text-neutral-400 leading-relaxed">
              Our contact form uses EmailJS to process and send your messages. When you submit the contact form, 
              your information is transmitted through EmailJS's secure servers. We do not store your contact form 
              data on our servers. Please review EmailJS's privacy policy for more information about how they handle data.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Data Security</h2>
            <p className="text-neutral-400 leading-relaxed">
              We implement reasonable security measures to protect your personal information from unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic 
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Cookies and Tracking Technologies</h2>
            <p className="text-neutral-400 leading-relaxed">
              This website may use cookies and similar tracking technologies to enhance your browsing experience. 
              Cookies are small data files stored on your device. You can control cookie settings through your browser preferences.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Third-Party Links</h2>
            <p className="text-neutral-400 leading-relaxed">
              Our website contains links to external websites (GitHub, LinkedIn, Instagram, WhatsApp, etc.). We are not 
              responsible for the privacy practices of these third-party sites. We encourage you to review their privacy 
              policies before providing any personal information.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Data Retention</h2>
            <p className="text-neutral-400 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this 
              privacy policy or as required by law. Contact form submissions are processed immediately and not stored long-term.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">9. Your Rights</h2>
            <p className="text-neutral-400 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-none space-y-2 ml-6">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Request access to your personal data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Request correction or deletion of your personal data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Withdraw consent for data processing at any time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Lodge a complaint with a data protection authority</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">10. Children's Privacy</h2>
            <p className="text-neutral-400 leading-relaxed">
              This website is not intended for children under the age of 13. We do not knowingly collect personal 
              information from children. If you believe we have collected information from a child, please contact us 
              immediately.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">11. Changes to This Privacy Policy</h2>
            <p className="text-neutral-400 leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be posted on this page with an 
              updated "Last Updated" date. We encourage you to review this policy periodically.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">12. Contact Us</h2>
            <p className="text-neutral-400 leading-relaxed">
              If you have any questions or concerns about this privacy policy or how we handle your personal data, 
              please contact us through:
            </p>
            <ul className="list-none space-y-2 ml-6">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Contact form on this website</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">Email: lemayanleleina@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-neutral-400">WhatsApp: +254 715 197 671</span>
              </li>
            </ul>
          </div>

          <div className="mt-12 p-6 border border-purple-500/30 rounded-lg bg-purple-500/5">
            <p className="text-neutral-400 leading-relaxed">
              By using this website, you acknowledge that you have read and understood this Privacy Policy and 
              consent to the collection and use of your information as described herein.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
