import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { formatCreatedAt } from '../utils/date-format';
import { addNote } from '../utils/local-data';

const NoteForm = ({ note, isEditMode, onUpdateNote, onCreateNote }) => {
    const navigate = useNavigate();
    const [editedNote, setEditedNote] = useState({ ...note });
    const [isUpdated, setIsUpdated] = useState(false);
    const textareaRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedNote((prevNote) => ({ ...prevNote, [name]: value }));
        setIsUpdated(true);
    };

    const handleTextareaResize = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
        handleTextareaResize();
    }, [editedNote.body]);

    const formattedCreatedAt = formatCreatedAt(editedNote.createdAt);
    const displayCreatedAt = formattedCreatedAt && formatCreatedAt(new Date().toISOString());

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditMode) {
            onUpdateNote(editedNote);
            toast.success('Successfully Updated!');
        } else if (onCreateNote) {
            addNote({
                title: editedNote.title,
                body: editedNote.body,
            });
            toast.success('Successfully Created!');
        }
        setIsUpdated(false);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="text-lg sm:text-3xl font-bold !outline-none pb"
                    value={editedNote.title}
                    onChange={handleChange}
                    placeholder="Rahasia"
                />
            </div>
            <p className="text-sm">{displayCreatedAt}</p>
            <div>
                <textarea
                    id="body"
                    name="body"
                    className="!outline-none w-full pt-4"
                    value={editedNote.body}
                    onChange={handleChange}
                    ref={textareaRef}
                    placeholder="Sebenarnya saya adalah ...."
                />
            </div>
            <button
                type="submit"
                className={`btn btn-neutral btn-sm absolute top-0 right-0 mx-4 ${!isUpdated && 'opacity-50 cursor-not-allowed'}`}
                disabled={!isUpdated}
            >
                {isEditMode ? 'Save' : 'Add'}
            </button>
        </form>
    );
};

NoteForm.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string.isRequired,
        createdAt: PropTypes.string,
        body: PropTypes.string.isRequired,
    }).isRequired,
    isEditMode: PropTypes.bool.isRequired,
    onUpdateNote: PropTypes.func,
    onCreateNote: PropTypes.func,
};

export default NoteForm;