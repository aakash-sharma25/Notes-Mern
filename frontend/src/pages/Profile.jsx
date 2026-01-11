import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Profile = () => {
    const { user } = useAuth();

    if (!user) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-10">
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-primary-500 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white">My Profile</h1>
                    </div>
                    <div className="p-8">
                        <div className="flex flex-col items-center sm:flex-row gap-6 mb-8">
                            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-3xl font-bold border-4 border-white shadow-lg">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                                <p className="text-gray-500">{user.email}</p>
                                <div className="mt-2 inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
                                    Active User
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">User ID</p>
                                    <p className="font-mono text-sm text-gray-700 truncate" title={user.id || user._id}>{user.id || user._id}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Joined</p>
                                    <p className="text-sm text-gray-700">Just now</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
