import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { Button } from './Button';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-neutral-800">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="mb-2">Subscribe to our newsletter</h3>
              <p className="text-neutral-400">Get the latest halal travel deals and inspiration</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 outline-none focus:border-emerald-500 transition-colors flex-1 md:w-80"
              />
              <Button size="medium" icon={<Mail className="w-4 h-4" />}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C11.5 7 7 11.5 2 12c5 .5 9.5 5 10 10 .5-5 5-9.5 10-10-5-.5-9.5-5-10-10z"/>
                </svg>
              </div>
              <span className="font-bold text-xl">HalalTravel</span>
            </div>
            <p className="text-neutral-400 mb-4">
              Your trusted platform for halal travel experiences worldwide. Travel with confidence and faith.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Destinations */}
          <div>
            <h4 className="mb-4">Popular Destinations</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Dubai, UAE</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Istanbul, Turkey</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Maldives</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Kuala Lumpur, Malaysia</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Marrakech, Morocco</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Makkah & Madinah</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Halal Certification</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Travel Guide</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Partner With Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Careers</a></li>
            </ul>
          </div>
          
          {/* Help & Support */}
          <div>
            <h4 className="mb-4">Help & Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors">Safety Guidelines</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-400 text-sm">
          <p>© 2024 HalalTravel. All rights reserved.</p>
          <p>Made with ❤️ for the Muslim Ummah</p>
        </div>
      </div>
    </footer>
  );
}
