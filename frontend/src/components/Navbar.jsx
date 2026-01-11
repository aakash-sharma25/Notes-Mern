import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-primary-500 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold flex items-center gap-2">
                    <span className="bg-white text-primary-500 rounded px-2 py-1 text-sm">N</span>
                    MyNotes
                </Link>
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link to="/" className="hover:text-primary-100 transition">Dashboard</Link>
                            <Link to="/profile" className="hover:text-primary-100 transition">Profile</Link>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-primary-600 px-4 py-1.5 rounded-md font-medium hover:bg-primary-50 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-primary-100 transition">Login</Link>
                            <Link
                                to="/signup"
                                className="bg-white text-primary-600 px-4 py-1.5 rounded-md font-medium hover:bg-primary-50 transition"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
