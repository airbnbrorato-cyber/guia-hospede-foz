import React from 'react';
import { Link } from 'react-router-dom';
import { DynamicIcon } from './DynamicIcon';

export const IconCard = ({ section, isFeatured = false }) => {
  return (
    <Link
      to={'/secao/' + section.id}
      className={'flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all text-center group shadow-xs ' + (
        isFeatured
          ? 'bg-[#C2847A] text-white border-[#8F5148] shadow-md scale-[1.02] ring-2 ring-[#C2847A]/30'
          : 'bg-[#FFFFFF] border-[#EAE2DA] hover:border-[#C2847A]/50 hover:bg-[#F5EFEB]/60 hover:shadow-md'
      )}
    >
      <div
        className={'w-11 h-11 rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform ' + (
          isFeatured ? 'bg-white/20 text-white' : 'bg-[#F5EFEB] text-[#C2847A]'
        )}
      >
        <DynamicIcon name={section.icon} className="w-5 h-5" />
      </div>
      <span
        className={'text-xs font-medium leading-snug line-clamp-2 ' + (
          isFeatured ? 'text-white font-semibold' : 'text-[#2C221E]'
        )}
      >
        {section.shortTitle || section.title}
      </span>
    </Link>
  );
};
