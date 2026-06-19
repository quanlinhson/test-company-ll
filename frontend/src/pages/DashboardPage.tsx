import { useNavigate } from 'react-router-dom';

function DashboardPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Đã đăng xuất!');
        navigate('/login');
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui' }}>
            <h1>Bảng điều khiển (Dashboard)</h1>
            <p style={{ color: '#555', fontSize: '18px' }}>
                Chào mừng bạn đã đăng nhập thành công vào hệ thống.
            </p>

            <div style={{ marginTop: '32px', padding: '24px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
                <h3>Thông tin cá nhân (Giả lập)</h3>
                <p><strong>Email:</strong> user@example.com</p>
                <p><strong>Quyền hạn:</strong> User</p>
            </div>

            <button
                onClick={handleLogout}
                style={{ marginTop: '24px', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
                Đăng xuất
            </button>
        </div>
    );
}

export default DashboardPage;