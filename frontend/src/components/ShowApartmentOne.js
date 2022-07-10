import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import L from 'leaflet';
import {
    MapContainer, TileLayer, Marker, Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../App.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { UserContext } from '../userContext';
import { useState, useEffect, useContext } from 'react';

let DefaultIcon = L.icon({
    iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|198754&chf=a,s,ee00FFFF",
});

let ApartmentLocation = L.icon({
    iconUrl: "https://chart.apis.google.com/chart?chst=d_map_spin&chld=0.7|0|D10000|13|b|•",
});

let NearbyLocation = L.icon({
    iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|48FFA3&chf=a,s,ee00FFFF",
});

L.Marker.prototype.options.icon = DefaultIcon;

var carouselSettings = {
    dots: true,
    arrows: false
  };

function Apartment(props){
    const position = [props.apartment.location.coordinates[0], props.apartment.location.coordinates[1]]

    let [apartments, setApartments] = useState([]);
    const userContext = useContext(UserContext);
    useEffect(function(){
        const getApartments = async function(){
            const res = await fetch(process.env.REACT_APP_DOMAIN+`/api/apartments/${props.apartment._id}`, {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer: ' + userContext.user.accessToken
                })
            });
            const data = await res.json();
            console.log(userContext.user.accessToken)
            console.info(data.closeBuildings)
            setApartments(data);
        }
        getApartments();
        
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="card text-white col-5 pt-3 mb-5">
                    <h4 className="card-title text-dark mb-4">{props.apartment.address}</h4>
                    <h6 className="card-title">PRICE: {props.apartment.price.$numberDecimal}€</h6>
                    <h6 className="card-title">SIZE: {props.apartment.size}m²</h6>
                    <h6 className="card-title">AMOUNT OF ROOMS: {props.apartment.amountOfRooms}</h6>
                    <h6 className="card-title">{props.apartment.type}</h6>
                </div>

                <div className="col-7">
                    <Slider {...carouselSettings}>
                            {props.apartment.roomImages.other.images.map(image => (<div><img src = {image}></img></div>))}
                    </Slider>
                </div>
            </div>
            <MapContainer center={position} zoom={17} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {apartments.closeBuildings ? apartments.closeBuildings.map(image => (<Marker position={[image.location.coordinates[0],image.location.coordinates[1]]} icon={ NearbyLocation } key={image._id}>
            <Popup>
                {image.name}
            </Popup>
        </Marker>
        )) : <></>}
                <Marker position={position} icon={ ApartmentLocation }>
                </Marker>
            </MapContainer>  
        
        </div>
    );
}
export default Apartment;