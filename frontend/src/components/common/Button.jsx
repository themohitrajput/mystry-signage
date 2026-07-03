// Reusable button that supports both <button> and <a>/Link-like usage
// via the `as` prop, keeping visual style consistent across the site.
export default function Button({ children, variant = 'primary', as: Comp = 'button', className = '', ...props }) {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-outline';
  return (
    <Comp className={`${base} ${className}`} {...props}>
      {children}
    </Comp>
  );
}
