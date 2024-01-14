import PropTypes from 'prop-types';
import NoteCard from './NoteCard';
import NoNotesMessage from './NoNotesMessage';
import { useTheme } from '../lib/context/ThemeContext';

const NoteList = ({ notes, onNoteArchive, onNoteUnarchive, onNoteDelete }) => {
    const { theme } = useTheme();
    const notesColors = ['bg-red-200', 'bg-amber-200', 'bg-sky-200'];
    const notesDarkColors = ['bg-red-500', 'bg-amber-500', 'bg-sky-500'];

    return (
        <div className="grid gap-4 py-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notes.length === 0 ? (
                <div className="col-span-full">
                    <NoNotesMessage />
                </div>
            ) : (
                notes.map((note, index) => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        color={theme === 'dark' ? notesDarkColors[index % notesDarkColors.length] : notesColors[index % notesColors.length]}
                        onNoteArchive={onNoteArchive}
                        onNoteUnarchive={onNoteUnarchive}
                        onNoteDelete={onNoteDelete}
                    />
                ))
            )}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired,
    onNoteArchive: PropTypes.func,
    onNoteUnarchive: PropTypes.func,
    onNoteDelete: PropTypes.func,
};

export default NoteList;
