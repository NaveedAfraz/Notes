import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Copyright and Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-600">
            <span>© {currentYear} Notes App</span>
            <a href="/privacy" className="hover:text-blue-500">Privacy</a>
            <a href="/terms" className="hover:text-blue-500">Terms</a>
            <a href="/help" className="hover:text-blue-500">Help</a>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a href="https://github.com" className="text-gray-600 hover:text-gray-900">
              <Github size={20} />
            </a>
            <a href="https://twitter.com" className="text-gray-600 hover:text-blue-400">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;