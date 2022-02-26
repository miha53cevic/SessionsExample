import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Index() {
    const route = useNavigate();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    React.useEffect(() => {

        const getUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API}/user`, { withCredentials: true });
                // Ako user ima session salji ga na /user inace ne radi nikaj
                if (res.status === 200) route('/user');
                else console.error(res);
            } catch (error) { /* Error ako je vracen status kod koji nije 200 */ }
        };
        getUser();
    }, []);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const usernameRef = React.useRef<HTMLInputElement>(null);
    const [error, setError] = React.useState<boolean>(false);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const data = { username: usernameRef.current?.value };
            const res = await axios.post(`${import.meta.env.VITE_API}/login`, data, { withCredentials: true });

            // If login successful go to user page
            if (res.status === 200) route('/user');
            else console.error(res);

        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

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