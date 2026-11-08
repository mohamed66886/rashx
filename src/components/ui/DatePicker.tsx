'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import { X } from 'lucide-react';
import { CalendarIcon } from './CalendarIcon';

export type DatePickerSize = 'sm' | 'md' | 'lg';

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: React.ReactNode;
  helperText?: string;
  error?: string;
  required?: boolean;
  sizeVariant?: DatePickerSize;
  fullWidth?: boolean;
  showTodayButton?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  containerClassName?: string;
  labelClassName?: string;
}

const sizeStyles: Record<DatePickerSize, { input: string; icon: string }> = {
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

const MONTH_NAMES_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Standard Weekdays (Su Mo Tu We Th Fr Sa)
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      sizeVariant = 'md',
      fullWidth = true,
      showTodayButton = false,
      clearable = false,
      onClear,
      containerClassName = '',
      labelClassName = '',
      className = '',
      value,
      disabled,
      id: customId,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const dateId = customId || generatedId;
    const containerRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    // Initial Date Parsing
    const parsedDate = React.useMemo(() => {
      if (!value) return new Date();
      const d = new Date(String(value));
      return isNaN(d.getTime()) ? new Date() : d;
    }, [value]);

    const [currentYear, setCurrentYear] = useState<number>(
      parsedDate.getFullYear()
    );
    const [currentMonth, setCurrentMonth] = useState<number>(
      parsedDate.getMonth()
    );

    // Synchronize current month/year when value changes
    useEffect(() => {
      if (value) {
        const d = new Date(String(value));
        if (!isNaN(d.getTime())) {
          setCurrentYear(d.getFullYear());
          setCurrentMonth(d.getMonth());
        }
      }
    }, [value]);

    // Close on Outside Click
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

    // Formatted Value for Display
    const displayValue = React.useMemo(() => {
      if (!value) return '';
      const d = new Date(String(value));
      if (isNaN(d.getTime())) return String(value);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}/${mm}/${dd}`;
    }, [value]);

    const handleSelectDate = (year: number, month: number, day: number) => {
      const formattedMonth = String(month + 1).padStart(2, '0');
      const formattedDay = String(day).padStart(2, '0');
      const formattedString = `${year}-${formattedMonth}-${formattedDay}`;

      if (onChange) {
        const syntheticEvent = {
          target: { value: formattedString, name: props.name || '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
      setIsOpen(false);
    };

    const handleSetToday = () => {
      const today = new Date();
      setCurrentYear(today.getFullYear());
      setCurrentMonth(today.getMonth());
      handleSelectDate(today.getFullYear(), today.getMonth(), today.getDate());
    };

    const handleClearDate = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        const syntheticEvent = {
          target: { value: '', name: props.name || '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
      setIsOpen(false);
    };

    const handlePrevMonth = () => {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((prev) => prev - 1);
      } else {
        setCurrentMonth((prev) => prev - 1);
      }
    };

    const handleNextMonth = () => {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((prev) => prev + 1);
      } else {
        setCurrentMonth((prev) => prev + 1);
      }
    };

    // Calculate Grid Cells for currentYear & currentMonth (Su Mo Tu We Th Fr Sa)
    const calendarGrid = React.useMemo(() => {
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun, 6 = Sat

      const grid: Array<{ day: number | null; isCurrentMonth: boolean }> = [];

      // Padding empty cells before 1st of month (Sun=0, Mon=1, ..., Sat=6)
      for (let i = 0; i < firstDayOfWeek; i++) {
        grid.push({ day: null, isCurrentMonth: false });
      }

      // Days of month
      for (let d = 1; d <= daysInMonth; d++) {
        grid.push({ day: d, isCurrentMonth: true });
      }

      // Fill remaining cells to complete 7-column row
      while (grid.length % 7 !== 0) {
        grid.push({ day: null, isCurrentMonth: false });
      }

      return grid;
    }, [currentYear, currentMonth]);

    const selectedDayNum = React.useMemo(() => {
      if (!value) return null;
      const d = new Date(String(value));
      if (
        !isNaN(d.getTime()) &&
        d.getFullYear() === currentYear &&
        d.getMonth() === currentMonth
      ) {
        return d.getDate();
      }
      return null;
    }, [value, currentYear, currentMonth]);

    // Years dropdown options
    const yearsList = React.useMemo(() => {
      const yrs = [];
      for (let y = 1970; y <= 2050; y++) {
        yrs.push(y);
      }
      return yrs;
    }, []);

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
              htmlFor={dateId}
              className={`text-xs font-semibold text-black flex items-center gap-1 ${labelClassName}`}
            >
              {label}
              {required && <span className="text-red-500 font-bold">*</span>}
            </label>
          )}

          {showTodayButton && !disabled && (
            <button
              type="button"
              onClick={handleSetToday}
              className="text-[11px] font-semibold text-[#5E6665] hover:text-black transition-colors"
            >
              تاريخ اليوم
            </button>
          )}
        </div>

        <div className="relative flex items-center w-full">
          <input
            ref={ref}
            id={dateId}
            type="text"
            readOnly
            value={displayValue}
            disabled={disabled}
            placeholder="YYYY/MM/DD"
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

          {/* Left Calendar Trigger Icon */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className="absolute left-2.5 inset-y-0 my-auto flex items-center justify-center text-[#5E6665] hover:text-[#91B8C0] bg-transparent transition-colors focus:outline-none"
          >
            <CalendarIcon className={`${sizeStyles[sizeVariant].icon}`} />
          </button>

          {clearable && value && !disabled && (
            <button
              type="button"
              onClick={handleClearDate}
              className="absolute left-9 inset-y-0 flex items-center justify-center text-[#5E6665] hover:text-black transition-colors p-1"
              tabIndex={-1}
            >
              <X className={sizeStyles[sizeVariant].icon} />
            </button>
          )}
        </div>

        {/* CUSTOM POPUP CALENDAR MODAL MATCHING SCREENSHOT */}
        {isOpen && !disabled && (
          <div
            dir="ltr"
            className="absolute top-full left-0 z-[99999] mt-1.5 w-64 bg-white border border-[#E5E9E8] shadow-2xl rounded-xl overflow-hidden text-center select-none animate-fadeIn"
          >
            {/* 1. Top Bar (Black Background): Prev> | Today | <Next */}
            <div className="bg-black text-white px-3 py-1.5 flex items-center justify-between text-xs font-bold">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="hover:text-[#91B8C0] transition-colors cursor-pointer"
              >
                &lt;Prev
              </button>
              <button
                type="button"
                onClick={handleSetToday}
                className="hover:text-[#91B8C0] transition-colors cursor-pointer font-bold"
              >
                Today
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="hover:text-[#91B8C0] transition-colors cursor-pointer"
              >
                Next&gt;
              </button>
            </div>

            {/* 2. Sub-Header Bar: Month Name & Year Selector */}
            <div className="bg-[#E5E9E8] text-black px-3 py-1.5 flex items-center justify-between text-xs font-bold border-t border-[#d8dedd]">
              <span className="text-sm font-semibold text-black">
                {MONTH_NAMES_EN[currentMonth]}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-black">˅</span>
                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(Number(e.target.value))}
                  className="bg-transparent text-black font-bold outline-none cursor-pointer text-xs border-none"
                >
                  {yearsList.map((y) => (
                    <option key={y} value={y} className="bg-white text-black">
                      {y}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-black">˅</span>
              </div>
            </div>

            {/* 3. Days Header Row (Dusty Blue Tint): Su Mo Tu We Th Fr Sa */}
            <div className="grid grid-cols-7 bg-[#91B8C0]/20 text-black text-xs font-bold border-t border-b border-[#E5E9E8] py-1">
              {WEEKDAYS.map((day) => (
                <div key={day} className="text-center font-bold">
                  {day}
                </div>
              ))}
            </div>

            {/* 4. Days Grid */}
            <div className="grid grid-cols-7 border-collapse bg-white">
              {calendarGrid.map((cell, index) => {
                if (!cell.isCurrentMonth || cell.day === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="bg-[#fafcfc] h-7 border border-[#E5E9E8]/40"
                    />
                  );
                }

                const isSelected = cell.day === selectedDayNum;

                return (
                  <button
                    key={`day-${cell.day}`}
                    type="button"
                    onClick={() =>
                      handleSelectDate(currentYear, currentMonth, cell.day!)
                    }
                    className={`h-7 border border-[#E5E9E8] text-xs font-medium flex items-center justify-center transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#91B8C0] text-black font-bold shadow-xs'
                        : 'bg-white hover:bg-[#E5E9E8]/60 text-black'
                    }`}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>

            {/* 5. Bottom Action Footer Bar (Black Background): Clear | Close */}
            <div className="bg-black text-white px-4 py-1.5 flex items-center justify-between text-xs font-bold border-t border-black">
              <button
                type="button"
                onClick={handleClearDate}
                className="hover:text-[#91B8C0] transition-colors cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#91B8C0] transition-colors cursor-pointer"
              >
                Close
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

DatePicker.displayName = 'DatePicker';
export default DatePicker;

