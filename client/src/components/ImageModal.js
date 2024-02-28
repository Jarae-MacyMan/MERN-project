// ImageModal.js
import React from 'react';

const ImageModal = ({ src, alt, onClose }) => {
  if (!src) return null;

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-2 rounded flex flex-col justify-center items-center">
        <img 
        src={src} 
        alt={alt} 
        className="w-1/2 h-auto object-contain" 
        />
        <button onClick={onClose} className="mt-4 text-black">Close</button>
    </div>
</div>

  );
};

export default ImageModal;
