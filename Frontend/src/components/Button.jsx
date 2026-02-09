export default function Button({ children, variant = 'primary', onClick, className = '', ...props }) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-md hover:shadow-lg',
    secondary: 'bg-[#38bdf8] text-white hover:bg-[#0ea5e9] shadow-md hover:shadow-lg',
    outline: 'border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white',
    ghost: 'text-[#2563eb] hover:bg-[#f1f5f9]'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
