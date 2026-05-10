import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({ title, subtitle, backPath, actionButton }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        {backPath && (
          <button 
            onClick={() => backPath === -1 ? navigate(-1) : navigate(backPath)} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
        )}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight truncate">{title}</h1>
          {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      {actionButton && (
        <div className="shrink-0 self-start sm:self-auto">
          {actionButton}
        </div>
      )}
    </div>
  );
}
