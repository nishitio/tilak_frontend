
import { Leaf, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sage-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold">NaturalWellness</span>
            </div>
            <p className="text-sage-300 leading-relaxed">
              Bringing you the pure power of Ayurvedic wellness through nature's most trusted remedies. 
              Your journey to balanced health starts here.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-sage-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-sage-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-sage-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">in</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Products</h3>
            <ul className="space-y-3 text-sage-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Psyllium Husk Powder</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Organic Capsules</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Travel Packs</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Wellness Bundles</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Support</h3>
            <ul className="space-y-3 text-sage-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">How to Use</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Wellness Guide</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Contact</h3>
            <div className="space-y-4 text-sage-300">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span>hello@naturalwellness.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>1-800-WELLNESS</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-sage-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sage-400 text-sm">
              © 2024 NaturalWellness. All rights reserved. Made with nature's love.
            </p>
            <div className="flex space-x-6 text-sm text-sage-400">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Returns</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
