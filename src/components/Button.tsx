interface Props {
  children: string;
  color?: "primary" | "secondary" | "danger" | "success";
  onClick: () => void;
}

const Button = ({ children, color = "primary", onClick }: Props) => {
  return (
    <button
      className={"btn btn-" + color}
      style={{ marginBottom: "1%" }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
