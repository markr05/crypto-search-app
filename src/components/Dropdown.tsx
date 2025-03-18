interface Props {
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
  items: Record<string, string>;
}

const Dropdown = ({ field, value, onChange, items }: Props) => {
  const onItemClick = (key: string) => {
    onChange(field, key);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ marginBottom: "1%" }}
      >
        {items[value] || value}
      </button>
      <ul className="dropdown-menu">
        {Object.entries(items).map(([key, label]: [string, string]) => (
          <li key={label}>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => onItemClick(key)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
