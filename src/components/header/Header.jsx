import LogoA4S from "../../assets/logo-a4s.webp"
import "./Header.css"

function Header() {
  return (
    <header className='header'>
      <h1>My Trace Table</h1>
      <img src={LogoA4S} alt="logo-a4s" />
    </header>
  )
}

export default Header