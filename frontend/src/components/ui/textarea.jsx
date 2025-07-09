import React from 'react';

const Textarea = ({ 
  className = '', 
  placeholder,
  value,
  onChange,
  name,
  required = false,
  rows = 4,
  ...props 
}) => {
  const baseStyles = 'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  
  return (
    <textarea
      className={`${baseStyles} ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      rows={rows}
      {...props}
    />
  );
};

export { Textarea };