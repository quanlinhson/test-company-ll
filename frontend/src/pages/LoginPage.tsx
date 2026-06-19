import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/auth.api';
import styles from './LoginPage.module.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email || !password) {
            setError('Vui lòng nhập lại Email và Mật khẩu.');
            return;
        }

        try {
            // 1. Gửi request lên Backend thật
            const response = await authApi.login({ email, password });

            // 2. Lưu token và user thật vào Context
            login(response.user, response.token);

            // 3. Chuyển hướng
            navigate('/');
        } catch (err) {
            setError('Email hoặc mật khẩu không chính xác!');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Đăng nhập</h2>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email của bạn"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            className={styles.input}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
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

                    <button type="submit" className={styles.button}>
                        Đăng nhập
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
                    Chưa có tài khoản? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;