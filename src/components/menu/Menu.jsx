import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Menu.css";
import { BsArrowRightCircleFill } from "react-icons/bs";

function Menu({ setMenu }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setMenu]);

  return (
    <div ref={menuRef} className="menu">
      <div className="container-back-btn">
      <p className="back-btn" onClick={() => setMenu(false)}> X </p>
      </div>
      
      <div className="menu-itens">
        <Link to="/" onClick={() => setMenu(false)}>Ínicio</Link>
        <Link to="/about" onClick={() => setMenu(false)}>Sobre</Link>
      </div>
    </div>
  );
}

export default Menu;