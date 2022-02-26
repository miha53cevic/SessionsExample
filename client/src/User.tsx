import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function User() {
    const route = useNavigate();

    const [user, setUser] = useState<{ username: string } | undefined>();

    useEffect(() => {
        axios.get('http://localhost:3001/user',
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

    return (
        <h1>Hello, {user?.username}</h1>
    );
};

export default User;