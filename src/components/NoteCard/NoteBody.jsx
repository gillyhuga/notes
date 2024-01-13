import PropTypes from 'prop-types';

const NoteBody = ({ body }) => (
    <p className="text-sm sm:text-base line-clamp-3 mb-4">{body}</p>
);

NoteBody.propTypes = {
    body: PropTypes.string.isRequired,
};

export default NoteBody;
