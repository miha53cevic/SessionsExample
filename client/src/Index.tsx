import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Index() {
    const route = useNavigate();

    React.useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/user`,
            {
                withCredentials: true
            }
        ).then((res) => {
            route('/user');
        })
        .catch(error => {
            // User not found wait at login
        });
    }, []);

    const usernameRef = React.useRef<HTMLInputElement>(null);
    const [error, setError] = React.useState<boolean>(false);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/login', { username: usernameRef.current?.value },
                {
                    withCredentials: true
                }
            );
            console.log(res);

            // If login successful go to user page
            if (res.status === 200) {
                route('/user');
            }

        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    return (
        <div className='flex-col-center'>
            <form className="login" onSubmit={(e) => handleSubmit(e)}>
                <input ref={usernameRef} type={'text'} placeholder='Username' />
                <input type={'submit'} value='Login' />
            </form>
            {error ? <p className='error'>Incorrect login!</p> : null}
        </div>
    );
};

export default Index;