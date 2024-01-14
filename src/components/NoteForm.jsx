import {  useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatCreatedAt } from '../utils/date-format';
import useInput from '../lib/hooks/useInput';

const NoteForm = ({ onSubmit }) => {
    const [title, setTitle] = useInput('');
    const [body, setBody] = useInput('');
    const textareaRef = useRef(null);

    useEffect(() => {
        handleTextareaResize();
    }, [body]);

    const handleTextareaResize = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const formattedCreatedAt = formatCreatedAt(new Date().toISOString());
    const displayCreatedAt = formattedCreatedAt && formatCreatedAt(new Date().toISOString());

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, body });
    };

    return (
        <form onSubmit={handleSubmit} >
            <div>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="text-lg sm:text-3xl font-bold !outline-none bg-transparent"
                    value={title}
                    onChange={setTitle}
                    placeholder="Rahasia"
                />
            </div>
            <p className="text-sm">{displayCreatedAt}</p>
            <div>
                <textarea
                    id="body"
                    name="body"
                    className="!outline-none w-full pt-4 bg-transparent"
                    value={body}
                    onChange={setBody}
                    ref={textareaRef}
                    placeholder="Sebenarnya saya adalah ...."
                />
            </div>
            <button
                type="submit"
                className="btn btn-neutral btn-sm absolute top-4 right-0 mx-4"
            >
                Add
            </button>
        </form>
    );
};

NoteForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default NoteForm;
