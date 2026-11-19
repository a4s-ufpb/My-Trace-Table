import { useNavigate } from "react-router-dom"
import { BsPersonFill } from "react-icons/bs";
import LogoA4S from "/logo-a4s.webp";
import AttentionPopUp from "../AttentionPopUp";
import "./Header.css"
import Menu from "../menu/Menu";
import { useState, useRef, useEffect } from "react";
import { BiMenu } from "react-icons/bi";

function Header() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const [menu, setMenu] = useState(false);
  const [openLogoutPopUp, setOpenLogoutPopUp] = useState(false);
  const [openPersonOptions, setOpenPersonOptions] = useState(false);

  const personOptionsRef = useRef(null);
  const personIconRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      const nomeCompleto = user.name;
      const primeiroNome = nomeCompleto.split(' ')[0];
      setUserName(primeiroNome);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(ev) {
      if (personOptionsRef.current &&
        personIconRef.current &&
        !personOptionsRef.current.contains(ev.target) &&
        !personIconRef.current.contains(ev.target)) {
        setOpenPersonOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className='header'>
      <BiMenu className="btnMenu" onClick={() => setMenu(true)} />

      <h1 onClick={() => navigate("/")}>My Trace Table</h1>

      <div
        ref={personIconRef}
        className={"rightOptionsContainer"}
        data-testid="person-icon-container"
      >
        
        <div className="personIconAndName" onClick={() => {
          setOpenPersonOptions(prev => !prev);
        }}>
          {userName && <span className="welcomeMessage">{userName}</span>}
          <BsPersonFill
            className="btnPerson"
          />
        </div>
        <img
          src={LogoA4S}
          alt="logo-a4s"
          onClick={() => window.open("https://a4s.dev.br", "_blank")}
        />
      </div>

      {openPersonOptions &&
        <div
          ref={personOptionsRef}
          className={`personOptions ${openPersonOptions ? 'active' : ''}`}
        >
          <>
            <div className="personInfo">
              <span>Olá, {userName}</span>
            </div>
            <hr className="separator" />
          </>
          <p className="personOption" onClick={() => {
            setOpenPersonOptions(false);
            navigate("profile");
          }}>Perfil</p>
          <p className="personOption" onClick={() => {
            setOpenPersonOptions(false);
            setOpenLogoutPopUp(true);
          }}>Sair</p>
        </div>
      }
      {menu && <Menu setMenu={setMenu} />}
      {openLogoutPopUp &&
        <AttentionPopUp
          text="Tem certeza que deseja sair?"
          confirmAction={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token")
            localStorage.removeItem("tokenExpiration")
            localStorage.removeItem("userId")
            localStorage.removeItem("userRole")
            navigate("/login")
          }}
          cancelAction={() => setOpenLogoutPopUp(false)}
        />
      }
    </header>
  )
}

export default Header