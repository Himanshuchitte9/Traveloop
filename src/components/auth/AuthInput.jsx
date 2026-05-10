import React from 'react';

const AuthInput = ({ label, type, placeholder, register, error, rightIcon, leftIcon, autoFocus }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 font-medium mb-2 text-sm">{label}</label>}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          {...register}
          className={`w-full py-3.5 border-1.5 border-gray-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-gray-800 placeholder-gray-400 ${leftIcon ? 'pl-11' : 'px-4'} ${rightIcon ? 'pr-11' : 'pr-4'} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}`}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};

export default AuthInput;
