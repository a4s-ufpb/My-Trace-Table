import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../components/button/Button";
import { ThemeService } from "./../../service/ThemeService";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import SecondaryHeader from "../../components/secondary-header/SecondaryHeader";

function Themes() {
    const navigate = useNavigate();
    const { id: userId } = useParams();
    const [searchParams] = useSearchParams();

    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(false);

    const creatorName = searchParams.get("userName") || "Não encontrado";

    const themeService = new ThemeService();

    useEffect(() => {
        fetchThemes();
    }, []);


    async function fetchThemes() {
        try {
            setLoading(true);

            const themeResponse = await themeService.findThemesByUser(userId);

            if (!themeResponse.success) {
                setThemes([]);
                return;
            }

            const themesList = themeResponse.data.content;
            setThemes(themesList);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setThemes([]);
        }
    }

    return (
        <div className="background">
            <SecondaryHeader
                showBackButton={true}
                title="Selecione o tema dos Exercícios"
                rightText={`Professor: ${creatorName}`}
            />

            <div className="center-content">
                {themes &&
                    themes.length > 0 &&
                    themes.map((theme) => (
                        <Button
                            key={theme.id}
                            text={theme.name}
                            action={() => navigate(`/exercices/${theme.name}`, { state: { creatorId: userId } })}
                        />
                    ))}

                {loading && <Loading />}

                {!loading && themes.length == 0 && (
                    <h3>O usuário não possui temas cadastrados!</h3>
                )}
            </div>

        </div>
    );
}

export default Themes;