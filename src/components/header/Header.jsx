import { useNavigate } from "react-router-dom"
import LogoA4S from "../../assets/logo-a4s.webp"
import "./Header.css"
import Menu from "../menu/Menu";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";

function Header() {
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  return (
    <header className='header'>
      <BiMenu onClick={() => setMenu(true)}/>
      <h1 onClick={() => navigate("/")}>My Trace Table</h1>
      <img src={LogoA4S} alt="logo-a4s" onClick={() => window.open("https://a4s.dev.br", "_blank")}/>

      {menu && <Menu setMenu={setMenu}/>}
    </header>
  )
}

export default Header