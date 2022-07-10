import { useContext, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userContext = useContext(UserContext); 

    async function Login(e){
        e.preventDefault();

        console.log(process.env.REACT_APP_DOMAIN);

        const res = await fetch(process.env.REACT_APP_DOMAIN+"/api/users/loginUser", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if(data !== undefined){
            userContext.setUserContext(data);
            userContext.user = data;
            console.log(userContext.user.accessToken)
            console.log(data)
        } else {
            setError("Invalid username or password");
        }
    }

    return (
        
        <form onSubmit={Login}>
            <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
            <p class="mb-3">Please enter your login and password!</p>
            {userContext.user ? <Navigate replace to="/" /> : ""}
            <input class="form-control mb-2" type="text" name="username" placeholder="Username"
             value={username} onChange={(e)=>(setUsername(e.target.value))}/>
             <input class="form-control" type="password" name="password" placeholder="Password"
             value={password} onChange={(e)=>(setPassword(e.target.value))}/>
             <input class="btn btn-dark my-4 logInBtns" type="submit" name="submit" value="Log in"/>
             <label>{error}</label>
        </form>
    );
}

export default Login;