import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const NoteCard = ({ note, onEdit, onDelete, onPin }) => {
    const { isPinned, title, content, tags, createdAt } = note;

    // Format date
    const date = new Date(createdAt).toLocaleDateString();

    return (
        <div className={`bg-white rounded-xl shadow-sm border ${isPinned ? 'border-primary-400 ring-1 ring-primary-100' : 'border-gray-200'} p-5 hover:shadow-md transition duration-200 flex flex-col h-full relative group`}>
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{title}</h3>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onPin(note)}
                        className={`p-1.5 rounded-full hover:bg-gray-100 ${isPinned ? 'text-primary-600' : 'text-gray-400'}`}
                        title="Pin Note"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isPinned ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onEdit(note)}
                        className="p-1.5 rounded-full hover:bg-blue-50 text-gray-400 hover:text-blue-600"
                        title="Edit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(note._id)}
                        className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600"
                        title="Delete"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow whitespace-pre-wrap">{content}</p>

            <div className="mt-auto">
                <div className="flex flex-wrap gap-1 mb-3">
                    {tags && tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="text-xs text-gray-400">
                    {date}
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
