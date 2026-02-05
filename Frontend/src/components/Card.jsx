export default function Card({
  children,
  className = '',
  padding = 'md',
  bordered = true,
  shadow = 'sm',
  fullWidth = false,
  hover = false,
  ...props
}) {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowStyles = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  const baseStyles = `
    bg-white
    rounded-xl
    transition-all
    duration-200
    ${fullWidth ? 'w-full max-w-none' : ''}
  `;

  const borderStyles = bordered ? 'border border-[#E5E7EB]' : '';
  const hoverStyles = hover
    ? 'hover:shadow-lg hover:-translate-y-[2px] cursor-pointer'
    : '';

  return (
    <div
      className={`
        ${baseStyles}
        ${paddingStyles[padding]}
        ${shadowStyles[shadow]}
        ${borderStyles}
        ${hoverStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
