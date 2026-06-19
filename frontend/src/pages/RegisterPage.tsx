import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (pass: string) => {
        if (pass.length < 12 || pass.length > 30) {
            return "Mật khẩu phải có độ dài từ 12 đến 30 ký tự.";
        }
        if (!/[A-Z]/.test(pass)) {
            return "Mật khẩu phải chứa ít nhất 1 ký tự viết hoa.";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
            return "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt.";
        }
        return "";
    };

    const handleRegister = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            setError('Vui lòng nhập Email.');
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        console.log("Đăng ký thành công với:", email, password);
        const newUser = { id: "999-xyz", email: email, role: "User" };
        localStorage.setItem('mockUser', JSON.stringify(newUser));

        alert("Đăng ký thành công!");
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Tạo tài khoản mới</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '24px', fontSize: '14px' }}>
                    Mật khẩu từ 12-30 ký tự, gồm chữ hoa & ký tự đặc biệt.
                </p>

                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input
                        type="email"
                        placeholder="Email của bạn"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                        className={styles.input}
                    />

                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Tạo mật khẩu mạnh"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            className={styles.input}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.eyeButton}
                        >
                            {showPassword ? 'Ẩn' : 'Hiện'}
                        </button>
                    </div>

                    {error && <span style={{ color: 'red', fontSize: '14px' }}>{error}</span>}

                    <button type="submit" className={styles.button}>Đăng ký</button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
                    Đã có tài khoản? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;