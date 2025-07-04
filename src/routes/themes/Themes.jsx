import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import { ThemeService } from "./../../service/ThemeService";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import NavigateButton from "../../components/navigateButton/NavigateButton";
import InfoBox from "../../components/infoBox/InfoBox";

function Themes() {
    const navigate = useNavigate();
    const { id: userId } = useParams();

    const [themes, setThemes] = useState([]);

    const [creatorName, setCreatorName] = useState("");

    const themeService = new ThemeService();
    const [loading, setLoading] = useState(false);

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
            const creatorName = themesList[0].creator.name
            setThemes(themesList);
            setCreatorName(creatorName);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setThemes([]);
        }
    }

    return (
        <div className="background">
            <NavigateButton />
            <h1 className="title">Selecione o tema dos Exercícios</h1>
            {themes &&
                themes.length > 0 &&
                themes.map((theme) => (
                    <div key={theme.id}>
                        <Button
                            text={theme.name}
                            action={() => navigate(`/exercices/${theme.id}`)}
                        />
                    </div>
                ))}

            {loading && <Loading />}

            {!loading && themes.length == 0 && (
                <h2>O usuário não possui temas cadastrados!</h2>
            )}

            <InfoBox title="Professor" content={creatorName} />
        </div>
    );
}

export default Themes;