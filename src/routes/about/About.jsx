import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-section">
        <img src="/diego.webp" alt="Diego Tavares" className="about-image" />
        <p>
          Esta aplicação surgiu como parte do projeto de TCC do aluno <strong>Diego Tavares</strong>. Inspirado pela
          necessidade de uma ferramenta interativa e educacional, Diego concebeu a ideia do projeto e foi responsável
          por criar a interface inicial, imaginando uma plataforma que facilitasse o aprendizado e aprimorasse a prática dos usuários.
        </p>
      </div>

      <div className="about-section">
        <img src="/ayla.jpg" alt="Ayla Dantas" className="about-image" />
        <p>
          O projeto foi orientado pela professora <strong>Ayla Dantas</strong>, que guiou o desenvolvimento da ideia e coordenou
          os aspectos pedagógicos e estruturais do TCC, contribuindo para a concretização do projeto.
        </p>
      </div>

      <div className="about-section">
        <img src="/ronyelison.jpg" alt="Ronyelison Abreu" className="about-image" />
        <p>
          O desenvolvimento da aplicação foi realizado por <strong>Ronyelison Abreu</strong>, que implementou e aperfeiçoou as funcionalidades,
          transformando a ideia inicial em uma ferramenta prática e acessível para os usuários.
        </p>
      </div>
    </div>
  );
}

export default About;