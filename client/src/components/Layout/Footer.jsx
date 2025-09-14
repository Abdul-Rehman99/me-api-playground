import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-600">
          <p>© {new Date().getFullYear()} Me-API Playground. Built with React and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;