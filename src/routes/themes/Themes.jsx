import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/button/Button"
import { ThemeService } from './../../service/ThemeService';
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";

function Themes() {
    const navigate = useNavigate();
    const {id : userId} = useParams();

    const [themes, setThemes] = useState([]);

    const themeService = new ThemeService();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchThemes();
    }, []);

    async function fetchThemes() {
      try {
        setLoading(true);

        const themeResponse = await themeService.findThemesByUser(userId);

        if(!themeResponse.success) {
          setThemes([]);
          return;
        }

        setThemes(themeResponse.data.content);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setThemes([]);
      }
    }

  return (
    <div className="background">
        <h1 className="title">Selecione o tema do seu Teste de Mesa</h1>
        {themes && themes.length > 0 && themes.map((theme) => (
          <div key={theme.id}>
            <Button text={theme.name} action={() => navigate(`/exercices/${theme.id}`)}/>
          </div>
        ))}

        {loading && <Loading />}

        {!loading && themes.length == 0 && <h2>O usuário não possui temas cadastrados!</h2>}
    </div>
  )
}

export default Themes