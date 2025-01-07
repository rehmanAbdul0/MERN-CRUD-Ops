export const AlertDialogAction = ({ children, onClick, className }) => {
    const handleClick = (e) => {
      if (onClick) onClick(e);
    };
  
    return (
      <button
        onClick={handleClick}
        className={`px-4 py-2 rounded ${className}`}
      >
        {children}
      </button>
    );
};