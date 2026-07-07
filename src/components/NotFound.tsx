import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type NotFoundProps = {
  title: string;
  backTo: string;
  backLabel: string;
};

export default function NotFound({ title, backTo, backLabel }: NotFoundProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">{title}</h1>
      <button onClick={() => navigate(backTo)} className="text-brand-700 hover:underline flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> {backLabel}
      </button>
    </div>
  );
}
