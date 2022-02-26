import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function User() {
    const route = useNavigate();

    const [user, setUser] = useState<{ username: string } | undefined>();

    useEffect(() => {

        const getUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API}/user`, { withCredentials: true });
                // Ako user ima session salji ga na /user inace ne radi nikaj
                if (res.status === 200) setUser(res.data);
                else console.error(res);
            } catch (error) { route('/'); }
        };
        getUser();
    }, []);

    const handleDelete = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API}/logout`, { withCredentials: true });
            if (res.status === 200) route('/');
            else console.error(res);
        } catch (error) { console.error(error); }
    };

    return (
        <div className="flex-col-center">
            <h1>Hello, {user?.username}</h1>
            <button onClick={() => handleDelete()}>Delete Session</button>
        </div>
    );
};

export default User;