"use client"
import React from 'react';

const LoginSelectionModal = ({ onSelectRole, closeModal }) => {
  return (
    <div className="modal">
      <h2 className="text-2xl font-bold mb-4">Select Role</h2>
      <button
        className="block w-full py-2 mb-2 text-center bg-indigo-500 text-white rounded hover:bg-indigo-600"
        onClick={() => {
          onSelectRole('driver');
          closeModal();
        }}
      >
        Log in as Driver
      </button>
      <button
        className="block w-full py-2 text-center bg-indigo-500 text-white rounded hover:bg-indigo-600"
        onClick={() => {
          onSelectRole('admin');
          closeModal();
        }}
      >
        Log in as Admin
      </button>
    </div>
  );
};

export default LoginSelectionModal;
