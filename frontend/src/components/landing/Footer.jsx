import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-transparent border-t border-gray-200 py-16"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/sehat-logo.png"
                alt="Sehat Logo"
                className="h-9 w-9 object-contain"
              />
              <span className="text-xl font-bold text-[#1e3a5f]">Sehat</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your trusted partner in healthcare. Book appointments with ease
              and manage your health better.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4 text-[#1e3a5f]">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#1e3a5f] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm text-gray-600 hover:text-[#1e3a5f] transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-sm text-gray-600 hover:text-[#1e3a5f] transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#1e3a5f] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4 text-[#1e3a5f]">
              For Doctors
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#1e3a5f] transition-colors"
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#1e3a5f] transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#1e3a5f] transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#1e3a5f] transition-colors"
                >
                  Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4 text-[#1e3a5f]">
              Contact Us
            </h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5 text-sm text-gray-600">
                <Phone size={16} className="text-gray-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-600">
                <Mail size={16} className="text-gray-500" />
                <span>support@sehat.com</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-600">
                <MapPin size={16} className="text-gray-500" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-xs text-gray-500">
            &copy; 2026 Sehat. All rights reserved. Made with ❤️ for better
            healthcare.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
