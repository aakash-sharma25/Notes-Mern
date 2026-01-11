import { useState, useEffect } from 'react';
import api from '../api/axios';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    const fetchNotes = async (query = '') => {
        try {
            const res = await api.get(`/notes?search=${query}`);
            setNotes(res.data);
        } catch (err) {
            console.error("Error fetching notes", err);
        }
    };

    useEffect(() => {
        fetchNotes(searchQuery);
    }, [searchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCreateNote = async (data) => {
        try {
            if (currentNote) {
                const res = await api.put(`/notes/${currentNote._id}`, data);
                setNotes(notes.map(n => n._id === currentNote._id ? res.data : n));
            } else {
                const res = await api.post('/notes', data);
                setNotes([res.data, ...notes]);
            }
        } catch (err) {
            console.error("Error saving note", err);
        }
    };

    const handleDeleteNote = async (id) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;
        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter(n => n._id !== id));
        } catch (err) {
            console.error("Error deleting note", err);
        }
    };

    const handlePinNote = async (note) => {
        try {
            const res = await api.put(`/notes/${note._id}`, { isPinned: !note.isPinned });
            setNotes(notes.map(n => n._id === note._id ? res.data : n));
        } catch (err) {
            console.error("Error pinning note", err);
        }
    };

    const openCreateModal = () => {
        setCurrentNote(null);
        setIsModalOpen(true);
    };

    const openEditModal = (note) => {
        setCurrentNote(note);
        setIsModalOpen(true);
    };

    const sortedNotes = [...notes].sort((a, b) => {
        if (a.isPinned === b.isPinned) return 0;
        return a.isPinned ? -1 : 1;
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8">
                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                        <div className="relative w-full sm:w-96">
                            <input
                                type="text"
                                placeholder="Search notes..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition shadow-sm"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <button
                            onClick={openCreateModal}
                            className="flex items-center gap-2 bg-primary-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-600 transition shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Note
                        </button>
                    </div>


                    {sortedNotes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {sortedNotes.map(note => (
                                <NoteCard
                                    key={note._id}
                                    note={note}
                                    onEdit={openEditModal}
                                    onDelete={handleDeleteNote}
                                    onPin={handlePinNote}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="bg-white p-6 rounded-full inline-block mb-4 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-lg">No notes found. Create your first note!</p>
                        </div>
                    )}
                </main>

                <NoteModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleCreateNote}
                    note={currentNote}
                />
        </div>
    );
};

export default Dashboard;
