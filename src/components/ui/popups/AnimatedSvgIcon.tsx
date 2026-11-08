'use client';

import React from 'react';

export type PopupType = 'success' | 'warning' | 'alert' | 'confirm' | 'error';

export interface AnimatedSvgIconProps {
  type: PopupType;
  className?: string;
  size?: number;
}

export const AnimatedSvgIcon: React.FC<AnimatedSvgIconProps> = ({
  type,
  className = '',
  size = 72,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <style>{`
        @keyframes rashxCircleDraw {
          0% {
            stroke-dashoffset: 280;
            opacity: 0;
            transform: rotate(-90deg) scale(0.9);
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
            transform: rotate(-90deg) scale(1);
          }
        }
        @keyframes rashxPathDraw {
          0% {
            stroke-dashoffset: 100;
            opacity: 0;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        @keyframes rashxDotPop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          70% {
            transform: scale(1.3);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .rashx-circle-animate {
          stroke-dasharray: 280;
          stroke-dashoffset: 280;
          transform-origin: center;
          animation: rashxCircleDraw 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .rashx-path-animate {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: rashxPathDraw 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards;
        }
        .rashx-dot-animate {
          transform-origin: center;
          animation: rashxDotPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 0.55s forwards;
        }
      `}</style>

      {/* 1. SUCCESS / إتمام ICON */}
      {type === 'success' && (
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          className="overflow-visible"
        >
          {/* Subtle Background Glow Circle */}
          <circle
            cx="50"
            cy="50"
            r="44"
            className="fill-[#91B8C0]/20"
          />

          {/* Animated Outer Circle */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#91B8C0"
            strokeWidth="5"
            strokeLinecap="round"
            className="rashx-circle-animate"
          />

          {/* Animated Checkmark Path */}
          <path
            d="M 30 52 L 44 66 L 70 36"
            fill="none"
            stroke="#000000"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rashx-path-animate"
          />
        </svg>
      )}

      {/* 2. WARNING / تحذير ICON */}
      {type === 'warning' && (
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          className="overflow-visible"
        >
          {/* Subtle Background Glow Circle */}
          <circle
            cx="50"
            cy="50"
            r="44"
            className="fill-[#F0C5AE]/25"
          />

          {/* Animated Outer Circle */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#F0C5AE"
            strokeWidth="5"
            strokeLinecap="round"
            className="rashx-circle-animate"
          />

          {/* Animated Exclamation Stem */}
          <path
            d="M 50 30 L 50 56"
            fill="none"
            stroke="#000000"
            strokeWidth="5.5"
            strokeLinecap="round"
            className="rashx-path-animate"
          />

          {/* Animated Exclamation Dot */}
          <circle
            cx="50"
            cy="68"
            r="4"
            fill="#000000"
            className="rashx-dot-animate"
          />
        </svg>
      )}

      {/* 3. ALERT / تنبيه ICON */}
      {type === 'alert' && (
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          className="overflow-visible"
        >
          {/* Subtle Background Glow Circle */}
          <circle
            cx="50"
            cy="50"
            r="44"
            className="fill-[#91B8C0]/15"
          />

          {/* Animated Outer Circle */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#91B8C0"
            strokeWidth="5"
            strokeLinecap="round"
            className="rashx-circle-animate"
          />

          {/* Animated Info Dot (Top) */}
          <circle
            cx="50"
            cy="33"
            r="4"
            fill="#000000"
            className="rashx-dot-animate"
          />

          {/* Animated Info Stem (Bottom) */}
          <path
            d="M 50 44 L 50 68"
            fill="none"
            stroke="#000000"
            strokeWidth="5.5"
            strokeLinecap="round"
            className="rashx-path-animate"
          />
        </svg>
      )}

      {/* 4. CONFIRM / تأكيد ICON */}
      {type === 'confirm' && (
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          className="overflow-visible"
        >
          {/* Subtle Background Glow Circle */}
          <circle
            cx="50"
            cy="50"
            r="44"
            className="fill-[#E5E9E8]/80"
          />

          {/* Animated Outer Circle */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#91B8C0"
            strokeWidth="5"
            strokeLinecap="round"
            className="rashx-circle-animate"
          />

          {/* Animated Question Mark Arc */}
          <path
            d="M 37 40 C 37 31, 63 31, 63 41 C 63 49, 50 48, 50 56"
            fill="none"
            stroke="#000000"
            strokeWidth="5.5"
            strokeLinecap="round"
            className="rashx-path-animate"
          />

          {/* Animated Question Dot */}
          <circle
            cx="50"
            cy="68"
            r="4"
            fill="#000000"
            className="rashx-dot-animate"
          />
        </svg>
      )}

      {/* 5. ERROR / خطأ ICON */}
      {type === 'error' && (
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          className="overflow-visible"
        >
          {/* Subtle Background Glow Circle */}
          <circle
            cx="50"
            cy="50"
            r="44"
            className="fill-red-500/15"
          />

          {/* Animated Outer Circle */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#ef4444"
            strokeWidth="5"
            strokeLinecap="round"
            className="rashx-circle-animate"
          />

          {/* Animated Cross Slash 1 */}
          <path
            d="M 35 35 L 65 65"
            fill="none"
            stroke="#000000"
            strokeWidth="5.5"
            strokeLinecap="round"
            className="rashx-path-animate"
          />

          {/* Animated Cross Slash 2 */}
          <path
            d="M 65 35 L 35 65"
            fill="none"
            stroke="#000000"
            strokeWidth="5.5"
            strokeLinecap="round"
            className="rashx-path-animate"
          />
        </svg>
      )}
    </div>
  );
};

export default AnimatedSvgIcon;

