import Navbar from '../components/Navbar';
import styles from './HomePage.module.css';

function HomePage() {
    return (
        <div>
            <Navbar />
            <main className={styles.main}>
                <h1>Chào mừng đến với Trang Chủ</h1>
                <p style={{ color: '#555', fontSize: '18px' }}>
                    Chúc bạn một ngày tốt lành
                </p>
            </main>
        </div>
    );
}

export default HomePage;