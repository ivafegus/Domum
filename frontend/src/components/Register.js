import { useState } from 'react';

function Register() {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [error, setError] = useState([]);

    async function Register(e){
        e.preventDefault();
        const res = await fetch(process.env.REACT_APP_DOMAIN+"/api/users", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        const data = await res.json();
        if(data._id !== undefined){
            window.location.href="/";
        }
        else{
            setUsername("");
            setEmail("");
            setPassword("");
            setError("Registration failed");
        }
    }

    return(
        <form onSubmit={Register}>
            <h2 class="fw-bold mb-2 text-uppercase">Sign up</h2>
            <p class="mb-3">Please enter a username, email and password to create an account!</p>
            <input class="form-control mb-2" type="text" name="username" placeholder="Username" value={username} onChange={(e)=>(setUsername(e.target.value))}/>
            <input class="form-control mb-2" type="text" name="email" placeholder="Email" value={email} onChange={(e)=>(setEmail(e.target.value))} />
            <input class="form-control" type="password" name="password" placeholder="Password" value={password} onChange={(e)=>(setPassword(e.target.value))} />
            <input class="btn btn-dark my-4 logInBtns" type="submit" name="submit" value="Register" />
            <label>{error}</label>
        </form>
    );
}

export default Register;