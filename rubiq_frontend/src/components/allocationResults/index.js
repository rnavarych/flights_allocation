import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const renderPassengers = (passenger) => (
    <ul className='passengers'  key={passenger.id}>
        <li>id:           {passenger.id}</li>
        <li>origin:       {passenger.origin}</li>
        <li>destination:  {passenger.destination}</li>
        <li>number:       {passenger.number}</li>
    </ul>
);

const renderFlight = (flight) => (
    <div key={flight.id}>
        <ul className='flightDetails'>
            <li>{flight.id}</li>
            <li>{flight.origin}</li>
            <li>{flight.destination}</li>
            <li>{flight.capacity}</li>
            <li id='free'>free: {flight.free}</li>
        </ul>
        { flight.passengers.map(p => renderPassengers(p)) }
    </div>
);

const Results = ({ flights = [] }) => {
    return (
        <div className='flight'>
            <h2>Flights</h2>
            { flights.map(f => renderFlight(f)) }
        </div>
    );
};

Results.propTypes = {
    flights: PropTypes.array.isRequired
};

export default Results;