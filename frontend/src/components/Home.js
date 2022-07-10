import React, { Component } from 'react';
import L from 'leaflet';
import {
    MapContainer, TileLayer, Marker, Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../App.css';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import { Link } from 'react-router-dom';


let DefaultIcon = L.icon({
    iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|198754&chf=a,s,ee00FFFF",
});

L.Marker.prototype.options.icon = DefaultIcon;

const position = [46.5547, 15.6459]

function Home(props) {
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
            console.log(data[0].location.coordinates)
            setApartments(data);
        }
        getApartments();
        
    }, []);

    return (<>
        <UserContext.Consumer>
{context => (
    context.user ? (
        <>
        </>
    ) : (
        <>
            <h2>You can't view apartments without being logged in!</h2>
        </>
    )
)}
</UserContext.Consumer>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        {apartments ? apartments.map(image => (<Marker position={[image.location.coordinates[0],image.location.coordinates[1]]} key={image._id}>
            <Popup>
                <Link to={"/listApartments/ShowApartment"} state={{ from: image._id }}>{image.address}</Link>
            </Popup>
        </Marker>
        )) : <></>}
  </MapContainer>   
    </>
    );
}

export default Home;
