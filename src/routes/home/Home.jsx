import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useState } from "react";
import "./index.css";
import SelectCode from "../../components/selectCode/SelectCode";
import SecondaryHeader from "../../components/secondary-header/SecondaryHeader";

function Home() {
  const navigate = useNavigate();
  const [showSelectCode, setShowSelectCode] = useState(false);
  const role = localStorage.getItem("userRole") || "user";
  const creatorId = location.state?.creatorId || localStorage.getItem("userId");


  function selectTeacher() {
    navigate("/teacher");
  }

  return (
    <div className="background">
      <SecondaryHeader title="Vamos praticar sua compreensão sobre códigos?" />

      <section className="homeHero">
        <div className="homeCopy">
          <span className="homeEyebrow"> {
            role === "admin" ? "Sua Área"
              : role === "professor" ? "Suas Atividades"
                : "Seus Estudos"}
          </span>
          <h2>{
            role === "admin" ? "Administre todos os professores e exercícios daqui!"
              : role === "professor" ? "Crie seus próprios exercícios e temas!"
                : "Escolha como quer começar sua jornada nos estudos."}
          </h2>
          <p>
            {
              role === "admin" ? "Administre todos os professores da sua instituição e seus exercícios daqui!"
                : role === "professor" ? "Faça os seus próprios exercícios e crie temas para que seus alunos possam praticar os códigos!"
                  : "Navegue por professores ou procure por um tema em específico para responder os exercícios propostos!"
            }
          </p>
        </div>

        <div className="homeActions">
          {(role === "admin" || role === "professor") && (
            <>
              <Button text="Cadastrar Tema" action={() => navigate("/new-theme")} />
              <Button text="Cadastrar Exercicio" action={() => navigate("/new-exercise")} />
              <Button text="Ver Exercicios" action={() => navigate(`/exercises/all`)} />
              <Button text="Ajuda" action={() => navigate("/help-page")} />
            </>
          )}
          <Button text="Escolher Professor" action={selectTeacher} />
          <Button text="Buscar Tema" action={() => setShowSelectCode(true)} />
          <Button text="Sobre" action={() => navigate("/about")} />

        </div>
      </section>

      {showSelectCode && <SelectCode setSelectCode={setShowSelectCode} />}
    </div>
  );
}

export default Home;
