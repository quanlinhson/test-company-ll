import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './HomePage.module.css';

function HomePage() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            <header className={styles.header}>
                <h2 style={{ margin: 0, color: '#007bff' }}>MyProject</h2>

                <div>
                    {user ? (
                        <div className={styles.userInfo}>
                            <span style={{ fontSize: '15px' }}>
                                <strong>{user.email}</strong>
                                <span className={styles.roleBadge}>{user.role}</span>
                            </span>
                            <button onClick={handleLogout} className={styles.logoutBtn}>
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} className={styles.loginBtn}>
                            Đăng nhập
                        </button>
                    )}
                </div>
            </header>

            <main className={styles.main}>
                <h1>Chào mừng đến với Trang Chủ</h1>
                <p style={{ color: '#555', fontSize: '18px' }}>
                    Đây là không gian công khai. Nội dung này ai cũng có thể xem được.
                </p>
            </main>
        </div>
    );
}

export default HomePage;