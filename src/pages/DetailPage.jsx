import { useParams } from 'react-router-dom';
import { getNote } from '../utils/network-data';
import { useState, useEffect } from 'react';
import NoteDetail from '../components/NoteDetail';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const DetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [note, setNote] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNote = () => {
            getNote(id)
                .then(({ error, data }) => {
                    if (!error) {
                        setNote(data);
                    } else {
                        navigate('/notes');
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        };
        fetchNote();
    }, [id]);




    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <NoteDetail note={note} />
                </>
            )}
        </div>
    );
};

export default DetailPage;
