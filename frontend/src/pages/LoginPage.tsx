import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email || !password) {
            setError('Vui lòng nhập lại Email và Mật khẩu.');
            return;
        }

        const fakeUser = {
            id: "123-abc",
            email: email,
            role: "Admin"
        };

        localStorage.setItem('mockUser', JSON.stringify(fakeUser));

        console.log('Đang gửi dữ liệu đăng nhập:', { email, password });

        navigate('/');
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
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
                            style={styles.input}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            style={styles.input}
                        />
                    </div>

                    {error && <span style={{ color: 'red', fontSize: '14px' }}>{error}</span>}

                    <button type="submit" style={styles.button}>
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
    card: { padding: '32px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
    input: { width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' as const, fontSize: '16px' },
    button: { padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }
};

export default LoginPage;