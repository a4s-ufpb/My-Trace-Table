import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MessagePopUp from "../../components/MessagePopUp";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { AuthService } from "../../service/AuthService";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
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

        const result = await authService.sendPasswordResetCode(email);

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
        const result = await authService.sendPasswordResetCode(email);
        setLoading(false);

        showMessage(
            result.success
                ? "Novo código enviado para o seu email."
                : result.message || "Erro ao reenviar o código."
        );
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await authService.confirmPasswordReset(email, code, newPassword);

        setLoading(false);

        if (!result.success) {
            showMessage(result.message || "Erro ao redefinir a senha. Tente novamente.");
            return;
        }

        showMessage("Senha redefinida com sucesso! Redirecionando...");
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };

    return (
        <div className="background">
            <div className="form-bg">
                {step === 1 ? (
                    <form onSubmit={handleSendCode} data-testid="forgot-password-form">
                        <h2>Esqueci minha senha</h2>
                        <p>Informe seu email para receber um código de verificação.</p>
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
                                data-testid="forgot-password-email-input"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn"
                            disabled={loading}
                            data-testid="forgot-password-send-code-button"
                        >
                            {loading ? "Enviando..." : "Enviar código"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} data-testid="reset-password-form">
                        <h2>Redefinir senha</h2>
                        <p>Digite o código de 6 dígitos enviado para <strong>{email}</strong> e sua nova senha.</p>
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
                                data-testid="reset-password-code-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="newPassword">Nova senha</label>
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="newPassword"
                                    name="newPassword"
                                    minLength="8"
                                    maxLength="20"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="form-input"
                                    data-testid="reset-password-new-password-input"
                                />
                                <span
                                    className="password-toggle"
                                    tabIndex="0"
                                    onClick={() => setShowPassword(!showPassword)}
                                    data-testid="reset-password-toggle"
                                >
                                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                                </span>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn"
                            disabled={loading}
                            data-testid="reset-password-submit-button"
                        >
                            {loading ? "Redefinindo..." : "Redefinir senha"}
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
                                    setNewPassword("");
                                }}
                            >
                                Voltar
                            </a>
                        </span>
                    </form>
                )}
                <span className="without-registration">
                    Lembrou a senha? <Link to="/login">Faça Login</Link>
                </span>
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
