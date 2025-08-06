import "./About.css";
import SecondaryHeader from "../../components/secondary-header/SecondaryHeader";
import imgAyla from "/ayla.jpg";
import imgAnna from "/anna.jpg";
import imgElk from "/elksandro.jpg";
import imgRony from "/ronyelison.jpg";
import imgJosinaldo from "/josinaldo.jpg";
import imgDiego from "/diego.jpg";
import imgVanessa from "/vanessa.jpg";
import imgPedro from "/pedro.jpg";
import { BsLinkedin } from "react-icons/bs";

function About() {
  return (
    <div className="background">
      <SecondaryHeader showBackButton={true} title="Sobre" />
      <div className="center-content">
        <div className="wrapper">
          <p className="description">O <span>My Trace Table Manager</span> é uma aplicação desenvolvida como parte do projeto <span>Apps4Society</span>, da UFPB Campus IV, que tem como objetivo construir aplicativos e sistemas que impactam positivamente a sociedade. Esta aplicação surgiu como parte do projeto de TCC do aluno <a href="https://drive.google.com/file/d/1Ka-vqvY3T3M0S7I3xjbJQK_2u7MB_d4W/view">Diego Tavares</a>. Inspirado pela
            necessidade de uma ferramenta interativa e educacional, Diego concebeu a ideia do projeto e foi responsável
            por criar a interface inicial, imaginando uma plataforma que facilitasse o aprendizado e aprimorasse a prática dos usuários.</p>

          <p className="description">A ideia de testes de mesa digitais vem também de outros trabalhos de TCC orientados pela professora Ayla Dantas Rebouças, como o de <a href="https://drive.google.com/file/d/1jctcgeqFaJXe99s-YR-gyrm4B-C9Fsi9/view" target="_blank">Josinaldo Silva</a> e <a href="https://drive.google.com/file/d/1Ez-aqusmi8qApLEDX7I4CKMjVeZx4Z3f/view" target="_blank">Pedro Gomes</a>, inspirados em atividades realizadas pela professora Vanessa Dantas. No projeto Apps4Society, na vigência 2024-2025, o desenvolvimento deste sitema Web foi conduzido incialmente pelo estudante Ronyelison Abreu e em seguida pelos estudantes Anna Gabriela e José Elksandro, do curso de Sistemas de Informação. O My Trace Table foi construido sob orientação da professora Ayla Dantas Rebouças, coordenadora do projeto.</p>

          <div className="participant-container">
            <div>
              <img src={imgAyla} alt="Ayla Dantas" />
              <p className="participant-name">
                Ayla Rebouças
                <a href="https://www.linkedin.com/in/ayla-dantas-reboucas" target="_blank" rel="noopener noreferrer">
                  <BsLinkedin className="linkedin-icon" />
                </a>
              </p>
            </div>

            <div>
              <img src={imgAnna} alt="Anna Gabriela" />
              <p className="participant-name">
                Anna Gabriela
                <a href="https://www.linkedin.com/in/anna-gabriela-ms" target="_blank" rel="noopener noreferrer">
                  <BsLinkedin className="linkedin-icon" />
                </a>
              </p>
            </div>

            <div>
              <img src={imgElk} alt="José Elksandro" />
              <p className="participant-name">
                José Elksandro
                <a href="https://www.linkedin.com/in/elksandro" target="_blank" rel="noopener noreferrer">
                  <BsLinkedin className="linkedin-icon" />
                </a>
              </p>
            </div>

            <div>
              <img src={imgRony} alt="Ronyelison Abreu" />
              <p className="participant-name">
                Ronyelison Abreu
                <a href="https://www.linkedin.com/in/ronyelison-de-oliveira-abreu" target="_blank" rel="noopener noreferrer">
                  <BsLinkedin className="linkedin-icon" />
                </a>
              </p>
            </div>

            <div>
              <img src={imgJosinaldo} alt="Josinaldo Silva" />
              <p className="participant-name">
                Josinaldo Silva
              {/*
                <a href="" target="_blank">
                  <BsLinkedin className={styles.linkedinIcon} />
                </a>
              */}
              </p>
            </div>

            <div>
              <img src={imgDiego} alt="Diego Tavares" />
              <p className="participant-name">
                Diego Tavares
                <a href="https://www.linkedin.com/in/diegotav" target="_blank" rel="noopener noreferrer">
                  <BsLinkedin className="linkedin-icon" />
                </a>
              </p>
            </div>

            <div>
              <img src={imgVanessa} alt="Vanessa Dantas" />
              <p className="participant-name">
                Vanessa Dantas
                <a href="https://www.linkedin.com/in/vanessafdantas" target="_blank" rel="noopener noreferrer">
                  <BsLinkedin className="linkedin-icon" />
                </a>
              </p>
            </div>

            <div>
              <img src={imgPedro} alt="Pedro Gomes" />
              <p className="participant-name">
                Pedro Gomes
                <a href="https://www.linkedin.com/in/pedro-gomes-186872213" target="_blank" rel="noopener noreferrer">
                  <BsLinkedin className="linkedin-icon" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;