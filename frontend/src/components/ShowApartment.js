import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useLocation } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import ShowApartmentOne from './ShowApartmentOne';
import { UserContext } from '../userContext';


function ShowApartment(props){
    const location = useLocation()
    const { from } = location.state
    let [apartments, setApartments] = useState("");
    const userContext = useContext(UserContext);
    useEffect(function(){
        const getApartments = async function(){
            const res = await fetch(process.env.REACT_APP_DOMAIN+`/api/apartments/${from}`, {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer: ' + userContext.user.accessToken
                })
            });
            const data = await res.json();
            console.log(userContext.user.accessToken)
            console.info(data)
            setApartments(data);
        }
        getApartments();
        
    }, []);
    return (
        <ul>
                {apartments ? <ShowApartmentOne apartment={apartments}></ShowApartmentOne> : <></>}
    </ul>    );
}
export default ShowApartment;