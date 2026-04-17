import styles from "./styles.module.css";
import HelpSection from "../../components/help-section/HelpSection";

import exerciseInitialSettingsImage from "../../assets/help/exercise-initial-settings.png";
import shownTableImage from "../../assets/help/shown-table.png";
import expectedTableImage from "../../assets/help/expected-table.png";
import typeTableImage from "../../assets/help/type-table.png";
import editProfileImage from "../../assets/help/edit-profile.png";
import listExercisesImage from "../../assets/help/list-exercises.png";
import registerThemeImage from "../../assets/help/register-theme.png";
import editThemeImage from "../../assets/help/edit-theme.png";
import { BsArrowUp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function HelpPage() {

    const navigate = useNavigate();

    function handleScroll(id) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="background">
            <div className={styles.wrapper}>
                <h2 id="top">Tópicos de Ajuda</h2>

                <nav className={styles.summary}>
                    <h4>Sumário</h4>
                    <ol className={styles.summaryList}>
                        <li onClick={() => handleScroll("initial-settings")}>Como preencher as configurações iniciais de um novo exercício</li>
                        <li onClick={() => handleScroll("shown-table")}>Como preencher a tabela mostrada</li>
                        <li onClick={() => handleScroll("expected-table")}>Como preencher a tabela esperada</li>
                        <li onClick={() => handleScroll("type-table")}>Como preencher a tabela de tipos</li>
                        <li onClick={() => handleScroll("edit-profile")}>Como alterar os dados do perfil</li>
                        <li onClick={() => handleScroll("role")}>Tipos de usuário</li>
                        <li onClick={() => handleScroll("list-exercises")}>Visualização de exercícios</li>
                        <li onClick={() => handleScroll("themes-page")}>Funcionalidades da página de temas</li>
                    </ol>
                </nav>

                <div className="btn-container">
                    <button type="button" onClick={() => navigate("/")} className="btn">Voltar</button>
                </div>

                <HelpSection
                    sectionId="initial-settings"
                    title="1. Como preencher as configurações iniciais de um novo exercício"
                    text={
                        <>
                            O professor deve fornecer a imagem do código que o aluno vai utilizar
                            para preencher a trace table. Além disso, é necessário informar a quantidade
                            de variáveis (máximo de 4) e a quantidade de passos (máximo de 10) que serão
                            exibidos na tabela. Também é preciso que o professor defina o(s) tema(s)
                            relacionado(s) ao exercício.
                        </>
                    }
                    images={{ src: exerciseInitialSettingsImage, alt: "Imagem de exemplo de configurações iniciais de exercício" }}
                />

                <HelpSection
                    sectionId="shown-table"
                    title="2. Como preencher a tabela mostrada"
                    text={
                        <>
                            A tabela mostrada será visualizada pelo aluno e deve conter os espaços de edição necessários.
                            O professor deve marcar as células que o aluno pode editar com <strong>?</strong>.
                            Já as células que não podem ser alteradas devem ser preenchidas com <strong>#</strong>.
                        </>
                    }
                    images={{ src: shownTableImage, alt: "Imagem de exemplo de tabela mostrada" }}
                />

                <HelpSection
                    sectionId="expected-table"
                    title="3. Como preencher a tabela esperada"
                    text={
                        <>
                            A tabela esperada deve conter os valores corretos para a atividade. Essa tabela será usada como
                            referência para a correção automática, comparando as respostas do aluno com os resultados esperados.
                        </>
                    }
                    images={{ src: expectedTableImage, alt: "Imagem de exemplo de tabela esperada" }}
                />

                <HelpSection
                    sectionId="type-table"
                    title="4. Como preencher a tabela de tipos"
                    text={
                        <>
                            O professor pode preencher a tabela de tipos com o respectivo tipo de valor esperado em cada célula. Caso opte em não preencher a tabela de tipos, todas as células serão consideradas 'String' por padrão. Posteriormente, qualquer valor de qualquer célula na tabela de tipos poderá ser alterado durante a edição, ainda que não tenha optado em preenchê-la. A tipagem é interessante para a correção, pois permite que o sistema verifique se o tipo de dado enviado pelo aluno corresponde ao esperado, fornecendo um feedback mais preciso.
                        </>
                    }
                    images={[
                        { src: expectedTableImage, alt: "Imagem de exemplo de tabela esperada" },
                        { src: typeTableImage, alt: "Imagem de exemplo de tabela de tipos" }
                    ]}
                />

                <HelpSection
                    sectionId="edit-profile"
                    title="5. Como alterar os dados do perfil"
                    text={
                        <>
                            O usuário pode alterar o 'Nome', 'Email' e 'Senha' apenas digitando a nova informação desejada em seu respectivo campo e clicando no botão de salvar. A senha atual nunca é exibida, então caso o usuário opte em não realizar nenhuma alteração neste campo, sua senha permanecerá a mesma.
                        </>
                    }
                    images={{ src: editProfileImage, alt: "Imagem de exemplo de edição de perfil" }}
                />

                <HelpSection
                    sectionId="role"
                    title="6. Tipos de usuário"
                    text={
                        <>
                            O sistema possui três tipos de usuários: <strong>Professores</strong>, <strong>Alunos</strong> e <strong>Administradores</strong>. O Professor pode criar, editar e visualizar seus exercícios, pode também criar temas e editar seu perfil. Já o Aluno pode visualizar e responder aos exercícios, pode também editar seu perfil. O Administrador pode criar, editar e visualizar todos os exercícios, professores e alunos, pode também criar temas e editar seu perfil.
                        </>
                    }
                />

                <HelpSection
                    sectionId="list-exercises"
                    title="7. Visualização de exercícios"
                    text={
                        <>
                            O professor pode visualizar todos os seus exercícios organizados por temas, facilitando a busca. Além disso, é possível apagar exercícios que não são mais necessários e realizar outras ações de gerenciamento ao clicar em "ver" no exercício desejado.
                        </>
                    }
                    images={{ src: listExercisesImage, alt: "Imagem de exemplo de lista de exercícios" }}
                />

                <HelpSection
                    sectionId="themes-page"
                    title="8. Funcionalidades da página de temas"
                    text={
                        <>
                            Para cadastrar um novo tema, o professor deve informar o nome no campo indicado e clicar no botão "Cadastrar". Caso deseje editar um tema já existente, basta clicar no ícone de lápis ao lado do tema, fazer a alteração desejada e, em seguida, salvar ou cancelar a edição. Para remover um tema, é só clicar no ícone de lixeira correspondente. O número exibido à esquerda de cada tema representa o código identificador do tema. A navegação entre os temas cadastrados pode ser feita pelos botões "Anterior" e "Próximo", localizados na parte inferior da tela.
                        </>
                    }
                    images={[
                        { src: registerThemeImage, alt: "Imagem de exemplo de cadastro de tema" },
                        { src: editThemeImage, alt: "Imagem de exemplo de edição de tema" }]}
                />
            </div>

            <button onClick={() => handleScroll("top")} className={styles.scrollToTop}>
                <BsArrowUp />
            </button>
        </div>
    )
}
