import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useState } from "react";
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
      <Button text="Escolher Professor" action={selectTeacher} />
      <Button text="Buscar Tema" action={() => setShowSelectCode(true)} />

      {showSelectCode && <SelectCode setSelectCode={setShowSelectCode} />}
    </div>
  );
}

export default Home;