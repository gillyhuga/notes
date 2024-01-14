import PropTypes from 'prop-types';
import { formatCreatedAt } from '../utils/date-format';

const NoteDetail = ({ note }) => {
    const formattedCreatedAt = formatCreatedAt(note.createdAt);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">{note.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{formattedCreatedAt}</p>
            <p>{note.body}</p>
        </div>
    );
};

NoteDetail.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string.isRequired,
        createdAt: PropTypes.string,
        body: PropTypes.string.isRequired,
    }),
};

export default NoteDetail;
