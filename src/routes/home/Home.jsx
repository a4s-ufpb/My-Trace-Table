import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="background">
        <Button text="Exercícios" action={() => navigate("/users")}/>
        <Button text="Sobre" action={() => navigate("/about")}/>
    </div>
  );
}

export default Home;
