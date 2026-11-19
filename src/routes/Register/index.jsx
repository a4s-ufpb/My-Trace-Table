import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MessagePopUp from "../../components/MessagePopUp";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { AuthService } from "../../service/AuthService";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const role = "aluno";
    const [showPassword, setShowPassword] = useState(false);
    const [showMessagePopUp, setShowMessagePopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const authService = new AuthService();

    const showMessage = (message) => {
        setPopUpMessage(message);
        setShowMessagePopUp(true);
    };

    const handleSendCode = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await authService.sendRegistrationCode(email);

        setLoading(false);

        if (!result.success) {
            showMessage(result.message || "Erro ao enviar o código. Tente novamente.");
            return;
        }

        setStep(2);
        showMessage("Código enviado para o seu email. Verifique a caixa de entrada.");
    };

    const handleResendCode = async () => {
        setLoading(true);
        const result = await authService.sendRegistrationCode(email);
        setLoading(false);

        showMessage(
            result.success
                ? "Novo código enviado para o seu email."
                : result.message || "Erro ao reenviar o código."
        );
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const registerResult = await authService.register(name, email, password, role, code);

        setLoading(false);

        if (!registerResult.success) {
            showMessage(registerResult.message || "Erro ao cadastrar. Tente novamente.");
            return;
        }

        showMessage("Cadastro realizado com sucesso! Redirecionando...");
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };

    return (
        <div className="background">
            <div className="form-bg">
                {step === 1 ? (
                    <form onSubmit={handleSendCode} data-testid="register-form">
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
                        <button
                            type="submit"
                            className="btn"
                            disabled={loading}
                            data-testid="register-send-code-button"
                        >
                            {loading ? "Enviando..." : "Enviar código"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} data-testid="register-confirm-form">
                        <h2>Confirme seu email</h2>
                        <p>Digite o código de 6 dígitos enviado para <strong>{email}</strong>.</p>
                        <div>
                            <label htmlFor="code">Código de verificação</label>
                            <input
                                type="text"
                                id="code"
                                name="code"
                                value={code}
                                inputMode="numeric"
                                pattern="\d{6}"
                                minLength="6"
                                maxLength="6"
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                                required
                                className="form-input"
                                data-testid="register-code-input"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn"
                            disabled={loading}
                            data-testid="register-submit-button"
                        >
                            {loading ? "Cadastrando..." : "Cadastrar"}
                        </button>
                        <span className="without-registration">
                            Não recebeu?{" "}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!loading) handleResendCode();
                                }}
                            >
                                Reenviar código
                            </a>
                        </span>
                        <span className="without-registration">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep(1);
                                    setCode("");
                                }}
                            >
                                Voltar
                            </a>
                        </span>
                    </form>
                )}
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
