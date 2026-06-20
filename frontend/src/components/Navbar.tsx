import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
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
    );
}

export default Navbar;