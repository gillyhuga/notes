import PropTypes from 'prop-types';
import { formatCreatedAt } from '../../utils/date-format';

const NoteTitle = ({ title, createdAt, archived }) => {
    const formattedCreatedAt = formatCreatedAt(createdAt);
    return (
        <>
            {archived && <span className="badge absolute top-2 right-2">Archived</span>}
            <h2 className="card-title text-xl sm:text-2xl font-semibold mt-3">{title}</h2>
            <p className="text-xs mb-4">{formattedCreatedAt}</p>
        </>
    );

};

NoteTitle.propTypes = {
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
};

export default NoteTitle;
