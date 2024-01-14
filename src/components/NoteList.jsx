import PropTypes from 'prop-types';
import NoteCard from './NoteCard';
import NoNotesMessage from './NoNotesMessage';

const NoteList = ({ notes, onNoteArchive, onNoteUnarchive, onNoteDelete }) => {
    const notesColors = ['bg-red-200', 'bg-amber-200', 'bg-sky-200'];

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
                        color={notesColors[index % notesColors.length]}
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
