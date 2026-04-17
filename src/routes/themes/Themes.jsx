import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Loading from "../../components/loading/Loading";
import SecondaryHeader from "../../components/secondary-header/SecondaryHeader";
import { ThemeService } from "../../service/ThemeService";

function Themes() {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [searchParams] = useSearchParams();

  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const creatorName =
    searchParams.get("userName") ||
    searchParams.get("creatorName") ||
    "Nao encontrado";

  const themeService = new ThemeService();

  useEffect(() => {
    fetchThemes();
  }, [userId]);

  function buildExercisesSearch(themeName) {
    const params = new URLSearchParams();
    params.set("creatorId", userId);
    params.set("creatorName", creatorName);

    if (themeName) {
      params.set("themeName", themeName);
    }

    return params.toString();
  }

  async function fetchThemes() {
    try {
      setLoading(true);

      const themeResponse = await themeService.findAllThemesByUser(userId);

      if (!themeResponse.success) {
        setThemes([]);
        return;
      }

      setThemes(themeResponse.data.content || []);
    } catch (error) {
      console.log(error);
      setThemes([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="background">
      <SecondaryHeader
        showBackButton={true}
        title="Selecione o tema dos Exercicios"
        rightText={`Professor: ${creatorName}`}
      />

      <div className="center-content">
        <Button
          text="Ver todos os exercicios"
          action={() =>
            navigate(`/exercises/all?${buildExercisesSearch()}`, {
              state: { creatorId: userId, creatorName },
            })
          }
        />

        {themes.length > 0 &&
          themes.map((theme) => (
            <Button
              key={theme.id}
              text={theme.name}
              action={() =>
                navigate(`/exercices/${theme.id}?${buildExercisesSearch(theme.name)}`, {
                  state: {
                    creatorId: userId,
                    creatorName,
                    initialTheme: { id: theme.id, name: theme.name },
                  },
                })
              }
            />
          ))}

        {loading && <Loading />}

        {!loading && themes.length === 0 && (
          <h3>O usuario nao possui temas cadastrados!</h3>
        )}
      </div>
    </div>
  );
}

export default Themes;
