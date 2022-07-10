import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'


function Apartment(props){
    return (
        <div className="container cardAll text-white mb-4 py-4">
            <div className='row'>
                <div className='col-6'>
                    <img className="cardAll-img" src={props.apartment.roomImages.other.images[0]} width={200} height={200} alt='No photos available'/>
                </div>
                <div className='col-6'>
                    <h4 className="cardAll-title">{props.apartment.address}</h4>
                    <h5 className="cardAll-title">PRICE: {props.apartment.price.$numberDecimal}€</h5>
                    <h5 className="cardAll-title">{props.apartment.type}</h5>
                    <Link to={"ShowApartment"} state={{ from: props.apartment._id }}><button className='btn btn-light mt-5'>Show more</button></Link>
                </div>
            </div>
        </div>
    );
}
export default Apartment;