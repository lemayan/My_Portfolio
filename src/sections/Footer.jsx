import { Link } from "react-router-dom"
import { mySocials } from "../constants"

const Footer = () => {
  return (
    <section className="c-space pt-7 pb-3 border-t border-neutral-700">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Copyright & Links - Left */}
            <div className="flex flex-col md:flex-row items-center gap-3 text-sm text-neutral-400 order-2 md:order-1">
                <p className="text-center">
                    © 2025 Dennis Lemayan Leleina. All rights reserved.
                </p>
                <div className="flex gap-5 text-sm text-neutral-400">
                    <Link to="/terms" className="hover:text-purple-400 transition-colors">
                        Terms & Conditions
                    </Link>
                    <span className="text-neutral-600">|</span>
                    <Link to="/privacy" className="hover:text-purple-400 transition-colors">
                        Privacy Policy
                    </Link>
                </div>
            </div>

            {/* Social Icons - Right */}
            <div className="flex gap-4 order-1 md:order-2">
                {mySocials.map((social, index) => (
                    <a 
                        key={index} 
                        href={social.href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800/50 border border-neutral-700 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
                    >
                        <img src={social.icon} className="w-5 h-5" alt={social.name} />
                    </a>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Footer