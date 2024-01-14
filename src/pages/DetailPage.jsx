import { useParams } from 'react-router-dom';
import { getNote } from '../utils/network-data';
import { useState, useEffect } from 'react';
import NoteDetail from '../components/NoteDetail';
import Loader from '../components/Loader';

const DetailPage = () => {
    const { id } = useParams();
    const [note, setNote] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const fetchedNote = await getNote(id);
                setNote(fetchedNote.data);
            } catch (error) {
                console.error('Error fetching note:', error);
            } finally {
                setLoading(false);
            }
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
