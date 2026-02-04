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
import imgKawe from "/kawe.png";
import Student from "../../components/Student";

function About() {
  return (
    <div className="background">
      <SecondaryHeader showBackButton={true} title="Sobre" />
      <div className="center-content">
        <div className="wrapper">
          <p className="description">O <span>My Trace Table Manager</span> é uma aplicação desenvolvida como parte do projeto <span>Apps4Society</span>, da UFPB Campus IV, que tem como objetivo construir aplicativos e sistemas que impactam positivamente a sociedade. Esta aplicação surgiu como parte do projeto de TCC do aluno <a href="https://drive.google.com/file/d/1Ka-vqvY3T3M0S7I3xjbJQK_2u7MB_d4W/view">Diego Tavares</a>. Inspirado pela
            necessidade de uma ferramenta interativa e educacional, Diego concebeu a ideia do projeto e foi responsável
            por criar a interface inicial, imaginando uma plataforma que facilitasse o aprendizado e aprimorasse a prática dos usuários.</p>

          <p className="description">A ideia de testes de mesa digitais vem de trabalhos de TCC orientados pela professora Ayla Dantas Rebouças, como o de <a href="https://drive.google.com/file/d/1jctcgeqFaJXe99s-YR-gyrm4B-C9Fsi9/view" target="_blank">Josinaldo Silva</a>, <a href="https://drive.google.com/file/d/1Ka-vqvY3T3M0S7I3xjbJQK_2u7MB_d4W/view" target="_blank">Diego Tavares</a> e <a href="https://drive.google.com/file/d/1Ez-aqusmi8qApLEDX7I4CKMjVeZx4Z3f/view" target="_blank">Pedro Gomes</a>, inspirados em atividades realizadas pela professora Vanessa Dantas. No projeto Apps4Society, na vigência 2024-2025, o desenvolvimento deste sitema Web foi conduzido incialmente pelo estudante Ronyelison Abreu e em seguida pelos estudantes Anna Gabriela e José Elksandro, do curso de Sistemas de Informação, e na  vigência 2025-2026, o desenvolvimento deste sitema Web foi conduzido pelo estudante Victor Kawê, do curso de Sistemas de Informação. O My Trace Table Manager foi construido sob orientação da professora Ayla Dantas Rebouças, coordenadora do projeto.</p>

          <div className="participant-container">
            <Student img={imgAyla} name="Ayla Rebouças" linkedin="https://www.linkedin.com/in/ayla-dantas-reboucas" />
          <Student img={imgVanessa} name="Vanessa Dantas" linkedin="https://www.linkedin.com/in/vanessafdantas" />

          <Student img={imgJosinaldo} name="Josinaldo Silva"/>
          <Student img={imgDiego} name="Diego Tavares" linkedin="https://www.linkedin.com/in/diegotav" />
          <Student img={imgPedro} name="Pedro Gomes" linkedin="https://www.linkedin.com/in/pedro-gomes-186872213" />

          <Student img={imgRony} name="Ronyelison Abreu" linkedin="https://www.linkedin.com/in/ronyelison-de-oliveira-abreu" />
          <Student img={imgAnna} name="Ana Gabriela" linkedin="https://www.linkedin.com/in/anna-gabriela-ms" />
          <Student img={imgElk} name="José Elksandro" linkedin="https://www.linkedin.com/in/elksandro" />

          <Student img={imgKawe} name="Victor Kawê" linkedin="https://www.linkedin.com/in/victorkawe" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;