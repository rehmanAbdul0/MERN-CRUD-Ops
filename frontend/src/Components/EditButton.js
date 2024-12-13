import React from 'react';

const EditButton = ({ productId, onClick }) => {
  return (
    <button
      className="px-4 py-2 rounded text-white font-medium shadow-md hover:bg-yellow-500 transition-all"
      style={{ backgroundColor: '#FEC001' }}
      onClick={() => onClick(productId)}
    >
      Edit
    </button>
  );
};

export default EditButton;