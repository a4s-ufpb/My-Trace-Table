import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Menu.css";

function Menu({ setMenu }) {
  const menuRef = useRef(null);
  const role = localStorage.getItem("userRole") || "user";

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
    <div className="menu-overlay">
      <div ref={menuRef} className="menu">
        <div className="container-back-btn">
          <button className="back-btn" onClick={() => setMenu(false)} type="button">
            X
          </button>
        </div>

        <div className="menu-itens">
          <Link to="/" onClick={() => setMenu(false)}>Inicio</Link>

          {role === "admin" &&
            <Link to="new-professor" onClick={() => setMenu(false)}>Cadastrar/Ver Professor(es)</Link>
          }
          {role === "professor" || role === "admin" &&
            <Link to="new-exercise" onClick={() => setMenu(false)}>Cadastrar Exercicio</Link>
          }
          {role === "professor" || role === "admin" &&
            <Link to="list-exercises" onClick={() => setMenu(false)}>Ver Exercicios</Link>
          }
          {role === "professor" || role === "admin" &&
            <Link to="new-theme" onClick={() => setMenu(false)}>Cadastrar/Ver Tema(s)</Link>
          }
          {role === "professor" || role === "admin" &&
            <Link to="help-page" onClick={() => setMenu(false)}>Ajuda</Link>
          }
          <Link to="about" onClick={() => setMenu(false)}>Sobre</Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
