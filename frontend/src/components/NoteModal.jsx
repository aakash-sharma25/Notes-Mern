import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const NoteModal = ({ isOpen, onClose, onSave, note }) => {
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        if (note) {
            setValue('title', note.title);
            setValue('content', note.content);
            setValue('tags', note.tags ? note.tags.join(', ') : '');
        } else {
            reset({ title: '', content: '', tags: '' });
        }
    }, [note, isOpen, reset, setValue]);

    const onSubmit = (data) => {
        const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        onSave({ ...data, tags: tagsArray });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
                <div className="bg-primary-50 px-6 py-4 border-b border-primary-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-primary-800">{note ? 'Edit Note' : 'Add New Note'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            {...register('title', { required: true })}
                            type="text"
                            placeholder="Enter title..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            {...register('content', { required: true })}
                            rows="4"
                            placeholder="What's on your mind?"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                        ></textarea>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                        <input
                            {...register('tags')}
                            type="text"
                            placeholder="work, personal, ideas (comma separated)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition shadow-sm"
                        >
                            {note ? 'Save Changes' : 'Create Note'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteModal;
