import { useNavigate } from "react-router-dom"
import LogoA4S from "../../assets/logo-a4s.webp"
import { BsGrid3X3GapFill } from "react-icons/bs";
import "./Header.css"
import Menu from "../menu/Menu";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  return (
    <header className='header'>
      <BsGrid3X3GapFill onClick={() => setMenu(true)}/>
      <h1 onClick={() => navigate("/")}>My Trace Table</h1>
      <img src={LogoA4S} alt="logo-a4s" onClick={() => navigate("/")}/>

      {menu && <Menu setMenu={setMenu}/>}
    </header>
  )
}

export default Header