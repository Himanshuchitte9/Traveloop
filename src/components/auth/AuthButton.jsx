import React from 'react';

const AuthButton = ({ label, isLoading, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`w-full py-3.5 mt-2 rounded-xl font-semibold text-white transition-all duration-200 ${
        isLoading
          ? 'bg-amber-300 cursor-not-allowed'
          : 'bg-amber-500 hover:bg-amber-600 active:scale-95'
      }`}
    >
      {isLoading ? (
        <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full align-middle" />
      ) : (
        label
      )}
    </button>
  );
};

export default AuthButton;
