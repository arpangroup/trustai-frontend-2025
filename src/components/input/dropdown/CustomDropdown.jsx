import React, { useState, useEffect, useRef } from 'react';
import './CustomDropdown.css';

const CustomDropdown = ({ options, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selected = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="dropdown-header-content">
          <span className="dropdown-text">{selected ? selected.label : 'Select an option'}</span>
          {selected?.subLabel && (
            <span className="dropdown-sublabel">{selected.subLabel}</span>
          )}
        </div>
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <ul className="dropdown-list">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`dropdown-item ${opt.disabled ? 'disabled' : ''} ${opt.value === selectedValue ? 'selected' : ''}`}
              onClick={() => {
                if (!opt.disabled) {
                  onChange(opt.value);
                  setIsOpen(false);
                }
              }}
              aria-disabled={opt.disabled}
              role="option"
            >
              <div className="dropdown-item-row">
                <span className="dropdown-item-left">{opt.label}</span>
                {opt.subLabel && <span className="dropdown-item-right">{opt.subLabel}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
