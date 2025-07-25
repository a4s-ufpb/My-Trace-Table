import "./About.css";
import SecondaryHeader from "../../components/secondary-header/SecondaryHeader";

function About() {
  return (
    <div className="background">
      <SecondaryHeader showBackButton={true} title="Sobre" />
      <div className="center-content">
        <div className="wrapper">
          <div className="about-section">
            <img src="/diego.webp" alt="Diego Tavares" className="about-image" />
            <p>
              Esta aplicação surgiu como parte do projeto de <a href="https://drive.google.com/file/d/1Ka-vqvY3T3M0S7I3xjbJQK_2u7MB_d4W/view" target="_blank">TCC</a> do aluno <span>Diego Tavares</span>. Inspirado pela
              necessidade de uma ferramenta interativa e educacional, Diego concebeu a ideia do projeto e foi responsável
              por criar a interface inicial, imaginando uma plataforma que facilitasse o aprendizado e aprimorasse a prática dos usuários.
            </p>
          </div>

          <div className="about-section">
            <img src="/ayla.jpg" alt="Ayla Dantas" className="about-image" />
            <p>
              O projeto foi orientado pela professora <span>Ayla Dantas</span>, que guiou o desenvolvimento da ideia e coordenou
              os aspectos pedagógicos e estruturais do TCC, contribuindo para a concretização do projeto.
            </p>
          </div>

          <div className="about-section">
            <img src="/ronyelison.jpg" alt="Ronyelison Abreu" className="about-image" />
            <p>
              O desenvolvimento da aplicação foi realizado por <span>Ronyelison Abreu</span>, que implementou e aperfeiçoou as funcionalidades,
              transformando a ideia inicial em uma ferramenta prática e acessível para os usuários.
            </p>
          </div>

          <div className="about-section">
            <div className="container-img">
              <img src="/anna.jpg" alt="Anna Gabriela" className="about-image" />
              <img src="/elksandro.jpg" alt="José Elksandro" className="about-image" />
            </div>
            <p>
              A continuidade do trabalho foi conduzida por <span>Anna Gabriela</span> e <span>José Elksandro</span>, que deram sequência ao desenvolvimento da plataforma,
              implementando melhorias e acrescentando novas funcionalidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;