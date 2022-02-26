import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function User() {
    const route = useNavigate();

    const [user, setUser] = useState<{ username: string } | undefined>();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/user`,
            {
                withCredentials: true
            }
        ).then((res) => {
            setUser(res.data);
        })
        .catch(error => {
            route('/');
        });
    }, []);

    const handleDelete = () => {
        axios.get(`${import.meta.env.VITE_API}/logout`,
            {
                withCredentials: true
            }
        ).then((res) => {
            route('/');
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="flex-col-center">
            <h1>Hello, {user?.username}</h1>
            <button onClick={() => handleDelete()}>Delete Session</button>
        </div>
    );
};

export default User;