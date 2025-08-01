import "./About.css";
import SecondaryHeader from "../../components/secondary-header/SecondaryHeader";

function About() {
  return (
    <div className="background">
      <SecondaryHeader showBackButton={true} title="Sobre" />
      <div className="center-content">
        <div className="wrapper">
          <p className="description">O <span>My Trace Table Manager</span> é uma aplicação desenvolvida como parte do projeto <span>Apps4Society</span>, da UFPB Campus IV, que tem como objetivo construir aplicativos e sistemas que impactam positivamente a sociedade. Esta aplicação surgiu como parte do projeto de TCC do aluno <a href="https://drive.google.com/file/d/1Ka-vqvY3T3M0S7I3xjbJQK_2u7MB_d4W/view">Diego Tavares</a>. Inspirado pela
            necessidade de uma ferramenta interativa e educacional, Diego concebeu a ideia do projeto e foi responsável
            por criar a interface inicial, imaginando uma plataforma que facilitasse o aprendizado e aprimorasse a prática dos usuários.</p>

          <p className="description">A ideia de testes de mesa digitais vem também de outros trabalhos de TCC orientados pela professora Ayla Dantas Rebouças, como o de <a href="https://drive.google.com/file/d/1jctcgeqFaJXe99s-YR-gyrm4B-C9Fsi9/view" target="_blank">Josinaldo Silva</a> e <a href="https://drive.google.com/file/d/1Ez-aqusmi8qApLEDX7I4CKMjVeZx4Z3f/view" target="_blank">Pedro Gomes</a>, inspirados em atividades realizadas pela professora Vanessa Dantas. No projeto Apps4Society, na vigência 2024-2025, o desenvolvimento deste sitema Web foi conduzido incialmente pelo estudante Ronyelison Abreu (<a href="https://www.linkedin.com/in/ronyelison-de-oliveira-abreu" target="_blank">linkedin</a>) e em seguida pelos estudantes Anna Gabriela (<a href="https://www.linkedin.com/in/anna-gabriela-ms" target="_blank">linkedin</a>) e José Elksandro (<a href="https://www.linkedin.com/in/elksandro" target="_blank">linkedin</a>), do curso de Sistemas de Informação. O My Trace Table foi construido sob orientação da professora Ayla Dantas Rebouças, coordenadora do projeto.</p>
        </div>
      </div>
    </div>
  );
}

export default About;