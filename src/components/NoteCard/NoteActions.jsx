import { FaArchive, FaTrash, FaRedo } from 'react-icons/fa';
import PropTypes from 'prop-types';

const NoteActions = ({ isArchived, toggleArchive, handleDelete }) => (
    <div className="absolute bottom-4 right-4 flex items-center space-x-2">
        {isArchived ? (
            <FaRedo
                className="text-neutral cursor-pointer"
                onClick={toggleArchive}
            />
        ) : (
            <FaArchive
                className="text-neutral cursor-pointer"
                onClick={toggleArchive}
            />
        )}
        <FaTrash
            className="text-neutral cursor-pointer"
            onClick={handleDelete}
        />
    </div>
);

NoteActions.propTypes = {
    isArchived: PropTypes.bool.isRequired,
    toggleArchive: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default NoteActions;
