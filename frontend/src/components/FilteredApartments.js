import { useState, useEffect, useContext } from 'react';
import Apartment from './Apartment';
import { UserContext } from '../userContext';

function FilteredApartments(){
    let [apartments, setApartments] = useState([]);
    const userContext = useContext(UserContext);
    useEffect(function(){
        const getApartments = async function(){
            const res = await fetch(process.env.REACT_APP_DOMAIN+"/api/apartments/filteredApartments" + window.location.search, {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer: ' + userContext.user.accessToken
                })
            });
            const data = await res.json();
            
            console.info(window.location.search)
            setApartments(data);
        }
        getApartments();
        
    }, []);


    return(
            <div className='container filterFont'>
                <form method="get">
                    <div class="row">
                        <div class="col-2"></div>
                        <div class="col-4 py-3 filterBorder">

                            <label>Price</label><br></br> 
                            <input type="number" name="lowPrice" placeholder="Low price"></input>
                            <input type="number" name="highPrice" placeholder="High price"></input><br></br>
                            <label class="pt-2">Size</label><br></br>
                            <input type="number" name="lowSize" placeholder="Low size"></input>
                            <input type="number" name="highSize" placeholder="High size"></input><br></br> 
                            </div>
                            
                            <div class="col-4 filterBorder py-3">
                            <input type="radio" id="owned" name="type" value="OWNED"></input>
                            <label htmlFor="owned">OWNED </label><br></br>
                            <input type="radio" name="type" value="RENT"></input>
                            <label htmlFor="rent">RENT</label>
                            <hr></hr>
                            <input type="checkbox" id="vehicle3" name="amountOfRooms1" value="1"></input>
                            <label htmlFor="amountOfRooms1">1-Sobno</label><br></br> 
                            <input type="checkbox" id="vehicle3" name="amountOfRooms2" value="2"></input>
                            <label htmlFor="amountOfRooms2">2-Sobno</label><br></br>
                            <input type="checkbox" id="vehicle3" name="amountOfRooms3" value="3"></input>
                            <label htmlFor="amountOfRooms3">3-Sobno</label><br></br>
                            <input type="checkbox" id="vehicle3" name="amountOfRooms4" value="4"></input>
                            <label htmlFor="amountOfRooms4">4-Sobno</label><br></br>
                            <input type="checkbox" id="vehicle3" name="amountOfRooms5" value="5"></input>
                            <label htmlFor="amountOfRooms5">5-Sobno</label><br></br>
                            <div class="col-2"></div>
                            </div>
                    </div>
                    <input className="btn btn-dark searchBtn mt-4" type="submit" value="Search"></input>
                    <input className="btn btn-dark searchBtn mt-4" type="submit" value="Refresh"></input>
                </form>
            <ul className='mt-4'>
                {apartments ? apartments.map(apartment => (<Apartment apartment={apartment} key={apartment._id}></Apartment>)) : <></>}
            </ul>
        </div>
    );

}

export default FilteredApartments;