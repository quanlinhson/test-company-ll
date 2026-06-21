import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/auth.api';
import axios from 'axios';
import InputField from '../components/FloatingInput';
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

        try {
            const response = await authApi.login({ email, password });

            login(response.user, response.token, response.refreshToken);

            navigate('/');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const backendError = err.response?.data;

                if (typeof backendError === 'string') {
                    setError(backendError);
                } else {
                    setError('Kết nối đến máy chủ thất bại, vui lòng thử lại!');
                }
            } else {
                setError('Có lỗi bất ngờ xảy ra trên trình duyệt!');
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Đăng nhập</h2>
                {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '16px' }}>{error}</p>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <InputField
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn..."
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <InputField
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu..."
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.eyeButton}
                        >
                            {showPassword ? 'Ẩn' : 'Hiện'}
                        </button>
                    </div>

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