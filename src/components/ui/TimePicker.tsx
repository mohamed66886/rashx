'use client';

import React, { useState, useRef, useEffect, useId, useMemo, useCallback } from 'react';
import { X } from 'lucide-react';
import { ClockIcon } from './ClockIcon';

export type TimePickerSize = 'sm' | 'md' | 'lg';
export type TimePeriod = 'AM' | 'PM';

export interface TimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'value'> {
  label?: React.ReactNode;
  helperText?: string;
  error?: string;
  required?: boolean;
  sizeVariant?: TimePickerSize;
  fullWidth?: boolean;
  showNowButton?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  displayFormat?: '12h' | '24h';
  minuteStep?: number;
  containerClassName?: string;
  labelClassName?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string; name?: string } }) => void;
  onValueChange?: (time24: string, time12: string) => void;
}

const sizeStyles: Record<TimePickerSize, { input: string; icon: string }> = {
  sm: {
    input: 'px-2.5 py-1 text-xs rounded-lg h-8',
    icon: 'w-4 h-4',
  },
  md: {
    input: 'px-3 py-1.5 text-sm rounded-xl h-9.5',
    icon: 'w-4.5 h-4.5',
  },
  lg: {
    input: 'px-4 py-2.5 text-base rounded-xl h-11',
    icon: 'w-5 h-5',
  },
};

const pad = (n: number) => String(n).padStart(2, '0');

function parseTime(timeStr?: string): { hour: number; minute: number; period: TimePeriod } {
  if (!timeStr) {
    const now = new Date();
    let h = now.getHours();
    const m = Math.floor(now.getMinutes() / 5) * 5;
    const period: TimePeriod = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return { hour: h, minute: m % 60, period };
  }

  const isPM = /pm|م|مساء/i.test(timeStr);
  const isAM = /am|ص|صباح/i.test(timeStr);

  const clean = timeStr.replace(/[^\d:]/g, '');
  const parts = clean.split(':');
  let h = parseInt(parts[0] || '12', 10);
  const m = parseInt(parts[1] || '0', 10);

  let period: TimePeriod = 'AM';
  if (isPM) {
    period = 'PM';
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
  } else if (isAM) {
    period = 'AM';
    if (h === 0) h = 12;
    if (h > 12) h -= 12;
  } else {
    // 24-hour parsing
    if (h >= 12) {
      period = 'PM';
      if (h > 12) h -= 12;
    } else {
      period = 'AM';
      if (h === 0) h = 12;
    }
  }

  return {
    hour: Math.min(12, Math.max(1, h || 12)),
    minute: Math.min(59, Math.max(0, m || 0)),
    period,
  };
}

function to24HourString(hour12: number, minute: number, period: TimePeriod): string {
  let h = hour12;
  if (period === 'PM') {
    if (h < 12) h += 12;
  } else {
    if (h === 12) h = 0;
  }
  return `${pad(h)}:${pad(minute)}`;
}

function to12HourString(hour12: number, minute: number, period: TimePeriod): string {
  const periodText = period === 'PM' ? 'م' : 'ص';
  return `${pad(hour12)}:${pad(minute)} ${periodText}`;
}

const HOURS_12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      sizeVariant = 'md',
      fullWidth = true,
      showNowButton = false,
      clearable = false,
      onClear,
      displayFormat = '12h',
      minuteStep = 5,
      containerClassName = '',
      labelClassName = '',
      className = '',
      value,
      disabled = false,
      id: customId,
      name,
      onChange,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const timeId = customId || generatedId;
    const containerRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    const parsed = useMemo(() => parseTime(value), [value]);

    const [selectedHour, setSelectedHour] = useState<number>(parsed.hour);
    const [selectedMinute, setSelectedMinute] = useState<number>(parsed.minute);
    const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(parsed.period);

    // Sync on external value update
    useEffect(() => {
      if (value) {
        const p = parseTime(value);
        setSelectedHour(p.hour);
        setSelectedMinute(p.minute);
        setSelectedPeriod(p.period);
      }
    }, [value]);

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Formatted value for display
    const displayValue = useMemo(() => {
      if (!value) return '';
      const p = parseTime(value);
      if (displayFormat === '24h') {
        return to24HourString(p.hour, p.minute, p.period);
      }
      return to12HourString(p.hour, p.minute, p.period);
    }, [value, displayFormat]);

    const minutesList = useMemo(() => {
      const step = Math.max(1, Math.min(30, minuteStep));
      const mins: number[] = [];
      for (let m = 0; m < 60; m += step) {
        mins.push(m);
      }
      return mins;
    }, [minuteStep]);

    const emitChange = useCallback(
      (h: number, m: number, p: TimePeriod) => {
        const val24 = to24HourString(h, m, p);
        const val12 = to12HourString(h, m, p);

        if (onValueChange) {
          onValueChange(val24, val12);
        }

        if (onChange) {
          const syntheticEvent = {
            target: { value: val24, name: name || '' },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      },
      [name, onChange, onValueChange]
    );

    const handleSelectHour = (h: number) => {
      setSelectedHour(h);
      emitChange(h, selectedMinute, selectedPeriod);
    };

    const handleSelectMinute = (m: number) => {
      setSelectedMinute(m);
      emitChange(selectedHour, m, selectedPeriod);
    };

    const handleSelectPeriod = (p: TimePeriod) => {
      setSelectedPeriod(p);
      emitChange(selectedHour, selectedMinute, p);
    };

    const handleSetNow = () => {
      const now = new Date();
      let h = now.getHours();
      const m = Math.floor(now.getMinutes() / minuteStep) * minuteStep % 60;
      const p: TimePeriod = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;

      setSelectedHour(h);
      setSelectedMinute(m);
      setSelectedPeriod(p);
      emitChange(h, m, p);
    };

    const handleAddMinutes = (offsetMinutes: number) => {
      let totalMins = (selectedHour % 12) * 60 + selectedMinute;
      if (selectedPeriod === 'PM') totalMins += 12 * 60;
      totalMins = (totalMins + offsetMinutes + 24 * 60) % (24 * 60);

      const newH24 = Math.floor(totalMins / 60);
      const newM = totalMins % 60;
      const newPeriod: TimePeriod = newH24 >= 12 ? 'PM' : 'AM';
      const newH12 = newH24 % 12 || 12;

      setSelectedHour(newH12);
      setSelectedMinute(newM);
      setSelectedPeriod(newPeriod);
      emitChange(newH12, newM, newPeriod);
    };

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        const syntheticEvent = {
          target: { value: '', name: name || '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
      setIsOpen(false);
    };

    return (
      <div
        ref={containerRef}
        className={`relative flex flex-col gap-1 text-right ${
          fullWidth ? 'w-full' : ''
        } ${containerClassName}`}
      >
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={timeId}
              className={`text-xs font-semibold text-black flex items-center gap-1 ${labelClassName}`}
            >
              {label}
              {required && <span className="text-red-500 font-bold">*</span>}
            </label>
          )}

          {showNowButton && !disabled && (
            <button
              type="button"
              onClick={handleSetNow}
              className="text-[11px] font-semibold text-[#5E6665] hover:text-black transition-colors"
            >
              الوقت الحالي
            </button>
          )}
        </div>

        <div className="relative flex items-center w-full">
          <input
            ref={ref}
            id={timeId}
            type="text"
            readOnly
            value={displayValue}
            disabled={disabled}
            placeholder={displayFormat === '24h' ? 'HH:MM' : '12:00 م'}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={`w-full text-right transition-all duration-150 outline-none pr-3 pl-10 cursor-pointer font-normal select-none
              ${sizeStyles[sizeVariant].input}
              ${
                disabled
                  ? 'bg-[#f5f7f7] border border-[#E5E9E8] text-gray-400 cursor-not-allowed font-medium'
                  : error
                  ? 'bg-white border border-red-500 text-black focus:border-red-500'
                  : isOpen
                  ? 'bg-white border border-[#91B8C0] ring-2 ring-[#91B8C0]/25 text-black'
                  : 'bg-white border border-[#E5E9E8] text-black hover:border-[#91B8C0]/60 focus:border-[#91B8C0] focus:ring-2 focus:ring-[#91B8C0]/25'
              }
              ${className}`}
            {...props}
          />

          {/* Left Clock Trigger Icon */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className="absolute left-2.5 inset-y-0 my-auto flex items-center justify-center text-[#5E6665] hover:text-[#91B8C0] bg-transparent transition-colors focus:outline-none"
            title="اختر الوقت"
          >
            <ClockIcon className={`${sizeStyles[sizeVariant].icon}`} />
          </button>

          {clearable && value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute left-9 inset-y-0 flex items-center justify-center text-[#5E6665] hover:text-black transition-colors p-1"
              tabIndex={-1}
              title="مسح"
            >
              <X className={sizeStyles[sizeVariant].icon} />
            </button>
          )}
        </div>

        {/* CUSTOM POPUP TIME PICKER MODAL MATCHING DATEPICKER DESIGN */}
        {isOpen && !disabled && (
          <div
            dir="ltr"
            className="absolute top-full left-0 z-[99999] mt-1.5 w-72 bg-white border border-[#E5E9E8] shadow-2xl rounded-xl overflow-hidden text-center select-none animate-fadeIn"
          >
            {/* 1. Top Bar (Black Background): -15m | Now | +15m */}
            <div className="bg-black text-white px-3 py-1.5 flex items-center justify-between text-xs font-bold">
              <button
                type="button"
                onClick={() => handleAddMinutes(-15)}
                className="hover:text-[#91B8C0] transition-colors cursor-pointer"
                title="تقديم 15 دقيقة"
              >
                &lt; -15m
              </button>
              <button
                type="button"
                onClick={handleSetNow}
                className="hover:text-[#91B8C0] transition-colors cursor-pointer font-bold flex items-center gap-1"
                title="ضبط على الوقت الحالي"
              >
                <span>Now</span>
                <span className="text-[10px] opacity-75">(الآن)</span>
              </button>
              <button
                type="button"
                onClick={() => handleAddMinutes(15)}
                className="hover:text-[#91B8C0] transition-colors cursor-pointer"
                title="تأخير 15 دقيقة"
              >
                +15m &gt;
              </button>
            </div>

            {/* 2. Sub-Header Bar: Large Digital Preview */}
            <div className="bg-[#E5E9E8] text-black px-4 py-2 flex items-center justify-between text-xs font-bold border-t border-[#d8dedd]">
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-base text-black font-bold tracking-wider">
                  {pad(selectedHour)}:{pad(selectedMinute)}
                </span>
                <span className="text-xs font-semibold text-[#5E6665] ps-1">
                  {selectedPeriod === 'AM' ? 'AM (صباحاً)' : 'PM (مساءً)'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-black bg-white/70 border border-[#d8dedd] px-2 py-0.5 rounded">
                24H: {to24HourString(selectedHour, selectedMinute, selectedPeriod)}
              </span>
            </div>

            {/* 3. Column Header Row (Dusty Blue Tint): Hour | Minute | Period */}
            <div className="grid grid-cols-3 bg-[#91B8C0]/20 text-black text-xs font-bold border-t border-b border-[#E5E9E8] py-1">
              <div className="text-center font-bold">Hour (الساعة)</div>
              <div className="text-center font-bold">Min (الدقيقة)</div>
              <div className="text-center font-bold">Period (الفترة)</div>
            </div>

            {/* 4. Selection Columns (Hours, Minutes, Period) */}
            <div className="grid grid-cols-3 bg-white border-collapse divide-x divide-[#E5E9E8]">
              {/* Hours Column */}
              <div className="max-h-48 overflow-y-auto scrollbar-thin flex flex-col bg-white">
                {HOURS_12.map((h) => {
                  const isSelected = selectedHour === h;
                  return (
                    <button
                      key={`hour-${h}`}
                      type="button"
                      onClick={() => handleSelectHour(h)}
                      className={`h-7 border-b border-[#E5E9E8] text-xs font-medium flex items-center justify-center transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#91B8C0] text-black font-bold shadow-xs'
                          : 'bg-white hover:bg-[#E5E9E8]/60 text-black'
                      }`}
                    >
                      {pad(h)}
                    </button>
                  );
                })}
              </div>

              {/* Minutes Column */}
              <div className="max-h-48 overflow-y-auto scrollbar-thin flex flex-col bg-white">
                {minutesList.map((m) => {
                  const isSelected = selectedMinute === m;
                  return (
                    <button
                      key={`min-${m}`}
                      type="button"
                      onClick={() => handleSelectMinute(m)}
                      className={`h-7 border-b border-[#E5E9E8] text-xs font-medium flex items-center justify-center transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#91B8C0] text-black font-bold shadow-xs'
                          : 'bg-white hover:bg-[#E5E9E8]/60 text-black'
                      }`}
                    >
                      {pad(m)}
                    </button>
                  );
                })}
              </div>

              {/* Period Column (AM / PM) */}
              <div className="flex flex-col bg-white divide-y divide-[#E5E9E8]">
                {(['AM', 'PM'] as const).map((p) => {
                  const isSelected = selectedPeriod === p;
                  return (
                    <button
                      key={`period-${p}`}
                      type="button"
                      onClick={() => handleSelectPeriod(p)}
                      className={`flex-1 min-h-[4rem] text-xs font-bold flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#91B8C0] text-black shadow-xs font-bold'
                          : 'bg-white hover:bg-[#E5E9E8]/60 text-black'
                      }`}
                    >
                      <span className="text-sm font-semibold">{p}</span>
                      <span className="text-[10px] font-normal opacity-90">
                        {p === 'AM' ? 'صباحاً (ص)' : 'مساءً (م)'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Bottom Action Footer Bar (Black Background): Clear | Done */}
            <div className="bg-black text-white px-4 py-1.5 flex items-center justify-between text-xs font-bold border-t border-black">
              <button
                type="button"
                onClick={handleClear}
                className="hover:text-[#91B8C0] transition-colors cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#91B8C0] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {error && (
          <p className="text-xs text-red-500 font-medium mt-0.5">{error}</p>
        )}

        {!error && helperText && (
          <p className="text-xs text-gray-500 mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';
export default TimePicker;

