const getMappedData = (data = []) => {
    const mappedData = {};
    data.forEach(d => mappedData[`${d.id}`] = d);
    return mappedData
};

const pairSearching = (arr = [], targetSum, psrs = []) => {
    const initialPassengers = getMappedData(arr);
    let passengers = [ ...psrs ];
    const pairs = [];
    let sum = 0;
    if ((arr && arr.length === 0) || targetSum === undefined) {
        return false;
    } else {
        if (targetSum === arr[0].number) {
            return { passengers: [ ...passengers, arr[0] ], sum }
        }

        if (targetSum < arr[0].number) {
            delete initialPassengers[arr[0].id];
            return pairSearching(Object.values(initialPassengers), targetSum - sum, passengers)
        }

        pairs.push(arr[0]);
        sum += arr[0].number;

        let partnerInPair = targetSum - arr[0].number;
        let start = 1;
        let end = (arr.length) - 1;

        while (start <= end) {
            let mid = parseInt(((start + end) / 2));
            if (arr[mid].number === partnerInPair) {
                pairs.push(arr[mid]);
                sum += arr[mid].number;
                passengers = [ ...pairs];
                break;
            } else if (partnerInPair < arr[mid].number) {
                end = mid - 1;
            } else if (partnerInPair > arr[mid].number) {
                start = mid + 1;
            }
        }

        if (targetSum > sum) {
            pairs.forEach(p => {
                passengers.push(p)
                delete initialPassengers[p.id];
            });

            if (Object.keys(initialPassengers).length === 0) {
                return { passengers, sum: targetSum - sum }
            }
            return pairSearching(Object.values(initialPassengers), targetSum - sum, passengers)
        }

        return { passengers, sum };
    }
};

const simplePassengersAggregation = (flights = {}, passengers = {}) => {
    let total = {};
    const mappedPassengers = { ...passengers };
    const emptyFlights = {};
    Object.values(flights).forEach(f => {
        const capacity = f.capacity;
        const actualPassengers = Object.values(mappedPassengers).filter(p => f.origin === p.origin && f.destination === p.destination);
        if (actualPassengers.length > 0) {
            const sortedPassengers = actualPassengers.sort((a, b) => b.number - a.number);
            const { passengers, sum } = pairSearching(sortedPassengers, capacity);
            if (passengers && passengers.length > 0) {
                passengers.forEach(p => delete mappedPassengers[p.id]);
                total[f.id] = { ...f, passengers, free: sum };
                if (sum !== 0 && sum < f.capacity) {
                    emptyFlights[f.id] = { ...f, sum }
                }
            } else {
                emptyFlights[f.id] = { ...f, sum }
            }
        }
    });

    const freePassengers = Object.values(mappedPassengers);
    if (freePassengers.length > 0) {
        total = updateUnfilledFlights(total, emptyFlights, freePassengers);
    }
    return total;
};

const updateUnfilledFlights = (total, flights = {}, freePassengers = []) => {
    const updatedFlights = { ...total };
    freePassengers.forEach(fp => {
        const lastFlights = Object.values(flights);
        const intermediateFlightsFrom = getIntermediateFlightsFrom(fp, lastFlights);
        const intermediateFlightsTo = getIntermediateFlightsTo(fp, lastFlights);

        if (intermediateFlightsFrom.length > 0 && intermediateFlightsTo.length > 0 && intermediateFlightsFrom[0].destination === intermediateFlightsTo[0].origin) {
            total = addPassengersToFlight(total, intermediateFlightsFrom[0], fp);
            total = addPassengersToFlight(total, intermediateFlightsTo[0], fp);
        }
    });
    return updatedFlights;
};

const getIntermediateFlightsFrom = (passenger, flights) => flights.filter(lf => lf.sum >= passenger.number && lf.origin === passenger.origin);
const getIntermediateFlightsTo = (passenger, flights) => flights.filter(lf => lf.sum >= passenger.number && lf.destination === passenger.destination);

const addPassengersToFlight = (total = {}, currentFlight, passenger) => {
    const flights = { ...total };
    let activeFlight = flights[currentFlight.id];
    if (activeFlight) {
        activeFlight.passengers = [ ...activeFlight.passengers, passenger ]
    } else {
        flights[currentFlight.id] = { ...currentFlight, passengers: [{ passenger }] }
    }
    flights[currentFlight.id].free -= passenger.number;
    return flights;
};

const flightsSearching = (flights, passengers) => simplePassengersAggregation(getMappedData(flights), getMappedData(passengers));

module.exports = {
    flightsSearching
};
