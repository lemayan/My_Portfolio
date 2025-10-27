import { useState } from "react"
import emailjs from "@emailjs/browser"
import Toast from "../components/Toast"
import { Particles } from "../components/Particles"


const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("success");
    const [toastMessage, setToastMessage] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const showToastMessage = (type, message) => {
        setToastType(type);
        setToastMessage(message);
        setShowToast(true);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Handle form submission logic here
        try {
            console.log({"form submitted": formData});
            await emailjs.send("service_2o4rm49","template_ufpqad9",{
                from_name: formData.name, 
                to_name:"lemayan leleina", 
                from_email: formData.email, 
                to_email:"lemayan.leleina@example.com", 
                message: formData.message
            }, "_RXE16MJhjEQ0xdGM"
        )
            
            setIsLoading(false);
            showToastMessage("success", "✨ Message sent successfully! I'll get back to you soon.");
            setFormData ({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
            showToastMessage("error", "❌ Failed to send message. Please try again.");
        }
    }

  return (
    <section className="relative flex items-center justify-center c-space section-spacing">
         <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
        <Toast 
          message={toastMessage} 
          type={toastType} 
          isVisible={showToast} 
          onClose={() => setShowToast(false)} 
        />
        <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary ">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
            <h2 className="text-heading">
                Let's Talk
            </h2>
            <p className="font-normal text-neutral-400">
                I'm currently open to new opportunities and collaborations. Whether you have a question, a project idea, or just want to say hello, feel free to reach out!

            </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="name" className="field-label" > Full Name</label>
                <input id="name" name="name" type="text" className="field-input field-input-focus" placeholder="Enter your full name" autoComplete="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />

            </div>
             <div className="mb-5">
                <label htmlFor="email" className="field-label" > Email Address</label>
                <input id="email" name="email" type="email" className="field-input field-input-focus" placeholder="Enter your email address" autoComplete="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />

            </div>
             <div className="mb-5">
                <label htmlFor="message" className="field-label" > Message</label>
                <textarea id="message" name="message"  className="field-input field-input-focus" placeholder="share your thoughts" type="text" autoComplete="message" rows="4" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />

            </div>
            <button type="submit" className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation ">
                {!isLoading ? "Send Message" : "Sending..."}

            </button>
        </form>

        </div>
        

    </section>
    )
}
export default Contact


