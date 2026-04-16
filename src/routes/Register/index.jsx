import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MessagePopUp from "../../components/MessagePopUp";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { AuthService } from "../../service/AuthService";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const role = "aluno";
    const [showPassword, setShowPassword] = useState(false);
    const [showMessagePopUp, setShowMessagePopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState("");

    const navigate = useNavigate();
    const authService = new AuthService();

    const handleRegister = async (e) => {
        e.preventDefault();

        const registerResult = await authService.register(name, email, password, role);

        if (!registerResult.success) {
            setPopUpMessage(registerResult.message || "Erro ao cadastrar. Tente novamente.");
            setShowMessagePopUp(true);
            return;
        }

        setPopUpMessage("Cadastro realizado com sucesso! Redirecionando...");
        setShowMessagePopUp(true);
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };

    return (
        <div className="background">
            <div className="form-bg">
                <form onSubmit={handleRegister} data-testid="register-form">
                    <h2>Cadastre-se</h2>
                    <div>
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            minLength="3"
                            maxLength="30"
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-input"
                            data-testid="register-name-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            maxLength="100"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                            data-testid="register-email-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Senha</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                minLength="8"
                                maxLength="20"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-input"
                                data-testid="register-password-input"
                            />
                            <span
                                className="password-toggle"
                                tabIndex="0"
                                onClick={() => setShowPassword(!showPassword)}
                                data-testid="register-password-toggle"
                            >
                                {showPassword ? <BsEyeSlash /> : <BsEye />}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="btn" data-testid="register-submit-button">Cadastrar</button>
                </form>
                <span className="without-registration">Já tem cadastro? <Link to="/login">Faça Login</Link></span>
            </div>

            {showMessagePopUp && (
                <MessagePopUp
                    message={popUpMessage}
                    showPopUp={setShowMessagePopUp}
                />
            )}
        </div>
    );
}
