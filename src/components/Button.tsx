import { useState } from "react";

interface Props {
  children: string;
  onClick: () => void;
}

const Button = ({ children, onClick }: Props) => {
  const [isCompareActive, setIsCompareActive] = useState(false);

  const handleClick = () => {
    if (children === "COMPARE") {
      setIsCompareActive((prev) => !prev);
    }
    onClick();
  };

  return (
    <button
      className="btn skewed-btn"
      style={{
        marginBottom: "0",
        transform: "skewX(-15deg)",
        padding: "10px 20px",
        fontWeight: "bold",
        transition: "all 0.3s ease-in-out",
        backgroundColor:
          children === "SEARCH"
            ? "hsl(256 256 256)"
            : isCompareActive
            ? "hsl(0 0 0)"
            : "hsl(256 256 256)",
        border: "none",
        outline: "none",
        color:
          children === "SEARCH" ? "black" : isCompareActive ? "white" : "black",
      }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
