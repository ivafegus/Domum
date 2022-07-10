import { useState, useEffect, useContext } from 'react';
import Apartment from './Apartment';
import { UserContext } from '../userContext';

function ListApartments(){
    let [apartments, setApartments] = useState([]);
    const userContext = useContext(UserContext);
    useEffect(function(){
        const getApartments = async function(){
            const res = await fetch(process.env.REACT_APP_DOMAIN+"/api/apartments", {
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


    return(
        <div className='container'>
            <ul>
                {apartments ? apartments.map(apartment => (<Apartment apartment={apartment} key={apartment._id}></Apartment>)) : <></>}
            </ul>
        </div>
    );

}

export default ListApartments;