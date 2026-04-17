import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useState } from "react";
import "./index.css";
import SelectCode from "../../components/selectCode/SelectCode";
import SecondaryHeader from "../../components/secondary-header/SecondaryHeader";

function Home() {
  const navigate = useNavigate();
  const [showSelectCode, setShowSelectCode] = useState(false);
  

  function selectTeacher() {
    navigate("/teacher");
  }

  return (
    <div className="background">
      <SecondaryHeader title="Vamos praticar sua compreensão sobre códigos?" />

      <section className="homeHero">
        <div className="homeCopy">
          <span className="homeEyebrow">Seus Estudos</span>
          <h2>Escolha como quer começar sua jornada nos estudos.</h2>
          <p>
            Navegue por professores ou encontre um tema específico para responder
            os exercícios propostos
          </p>
        </div>

        <div className="homeActions">
          <Button text="Escolher Professor" action={selectTeacher} />
          <Button text="Buscar Tema" action={() => setShowSelectCode(true)} />
        </div>
      </section>

      {showSelectCode && <SelectCode setSelectCode={setShowSelectCode} />}
    </div>
  );
}

export default Home;
