import { UserContext } from "../userContext";
import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";

function Admin(props) {
    const [parameter, setParameter] = useState("")
    const [error, setError] = useState("");
    const userContext = useContext(UserContext); 

    async function scrap(e){
        console.log(parameter)
        setError("scraping in progress.....")
        e.preventDefault();
        const res = await fetch(process.env.REACT_APP_DOMAIN+"/api/apartments/scrap", {
            method: "POST",
            credentials: "include",
            headers: { 
                'Authorization': 'Bearer ' + userContext.user.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parameter: parameter
            })
        });
        const data = await res.json();
        if(data === undefined){
            setError("Error scraping!");
        }else{
            setError("scraping successful!")
            console.log(data)
        }
    }

    return (
        <header>
            <h1>{props.title}</h1>
            <nav>
                <ul>
                    <UserContext.Consumer>
                        {context => (
                            context.user && context.user.admin ?
                                <>
                                    <form onSubmit={scrap}>
                                        <input class="form-control mb-2" type="text" name="parameter" placeholder="Parameter"
                                        value={parameter} onChange={(e)=>(setParameter(e.target.value))}/>
                                        <input class="btn btn-dark logInBtns" type="submit" name="submit" value="Scrap"/>
                                        <label>{error}</label>
                                    </form>
                                </>
                            : <Navigate to="/"></Navigate>
                        )}
                    </UserContext.Consumer>
                </ul>
            </nav>
        </header >
    );
}

export default Admin;