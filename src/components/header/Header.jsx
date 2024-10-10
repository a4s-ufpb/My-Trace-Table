import { useNavigate } from "react-router-dom"
import LogoA4S from "../../assets/logo-a4s.webp"
import "./Header.css"

function Header() {
  const navigate = useNavigate();
  return (
    <header className='header'>
      <h1>My Trace Table</h1>
      <img src={LogoA4S} alt="logo-a4s" onClick={() => navigate("/")}/>
    </header>
  )
}

export default Header