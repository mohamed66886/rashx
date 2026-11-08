'use client';

import React, { useId } from 'react';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  helperText?: string;
  error?: string;
  required?: boolean;
  fullWidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      fullWidth = true,
      rows = 3,
      containerClassName = '',
      labelClassName = '',
      className = '',
      disabled,
      id: customId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textAreaId = customId || generatedId;

    return (
      <div
        className={`flex flex-col gap-1 text-right ${
          fullWidth ? 'w-full' : ''
        } ${containerClassName}`}
      >
        {label && (
          <label
            htmlFor={textAreaId}
            className={`text-xs font-semibold text-black flex items-center gap-1 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 font-bold">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textAreaId}
          rows={rows}
          disabled={disabled}
          className={`w-full bg-white border text-black transition-all duration-150 outline-none placeholder:text-[#5E6665]/60 px-3 py-2 text-sm rounded-xl resize-y
            ${
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#E5E9E8] hover:border-[#91B8C0]/60 focus:border-[#91B8C0] focus:ring-2 focus:ring-[#91B8C0]/25'
            }
            ${disabled ? 'bg-[#f5f7f7] text-gray-400 cursor-not-allowed border-[#E5E9E8]' : ''}
            ${className}`}
          {...props}
        />

        {error && (
          <p className="text-xs text-red-500 font-medium mt-0.5">{error}</p>
        )}

        {!error && helperText && (
          <p className="text-xs text-[#5E6665] mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
export default TextArea;

