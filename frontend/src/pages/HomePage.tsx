import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import type { User, UserRole } from '../types/auth.types';

function HomePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('mockUser');
        setUser(null);
    }

    return (
        <div>
            <header style={styles.header}>
                <h2 style={{ margin: 0, color: '#007bff' }}>MyProject</h2>

                <div>
                    {user ? (
                        <div style={styles.userInfo}>
                            <span style={{ fontSize: '15px' }}>
                                <strong>{user.email}</strong>
                                <span style={styles.roleBadge}>{user.role}</span>
                            </span>
                            <button onClick={handleLogout} style={styles.logoutBtn}>
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} style={styles.loginBtn}>
                            Đăng nhập
                        </button>
                    )}
                </div>
            </header>

            <main style={styles.main}>
                <h1>Chào mừng đến với Trang Chủ</h1>
                <p style={{ color: '#555', fontSize: '18px' }}>
                    Đây là không gian công khai. Nội dung này ai cũng có thể xem được.
                </p>
            </main>
        </div>
    );
}

const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', backgroundColor: '#fff', borderBottom: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    userInfo: { display: 'flex', alignItems: 'center', gap: '16px' },
    roleBadge: { marginLeft: '8px', padding: '4px 8px', backgroundColor: '#e9ecef', borderRadius: '4px', fontSize: '12px', color: '#333' },
    loginBtn: { padding: '8px 24px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    logoutBtn: { padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    main: { padding: '40px 32px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' as const }
};

export default HomePage;