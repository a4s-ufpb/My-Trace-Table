import { Link } from "react-router-dom";
import "./Menu.css";
import { BsArrowRightCircleFill } from "react-icons/bs";

function Menu( {setMenu} ) {
  return (
    <div className="menu">
      <BsArrowRightCircleFill className="back-btn" onClick={() => setMenu(false)}/>
      <div className="menu-itens">
        <Link to="/">Ínicio</Link>
        <Link to="/exercices">Exercícios</Link>
        <Link to="/about">Sobre</Link>
      </div>
    </div>
  );
}

export default Menu;
