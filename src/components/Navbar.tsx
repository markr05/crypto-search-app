import React from "react";

interface Props {
  items: React.ReactNode[];
}

const Navbar: React.FC<Props> = ({ items }) => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Navbar</span>
        <div className="d-flex">
          {items.map((item, index) => (
            <div key={index} className="mx-2">
              {item}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
