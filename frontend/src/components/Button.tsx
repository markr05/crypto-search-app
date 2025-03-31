import { useState } from "react";

interface ButtonProps {
  children: string;
  onClick: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  const [isCompareActive, setIsCompareActive] = useState(false);

  const handleClick = () => {
    if (children === "COMPARE") {
      setIsCompareActive((prev) => !prev);
    }
    onClick();
  };

  return (
    <button
      className={
        children === "SEARCH"
          ? "btn skewed-btn search-button"
          : "btn skewed-btn"
      }
      style={{
        backgroundColor: isCompareActive ? "black" : "white",
        color: isCompareActive ? "white" : "black",
      }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
