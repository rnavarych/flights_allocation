const csv = require('fast-csv');

const { flightsSearching } = require('../algorithms/flightsSearching');
const { FLIGHTS, PNRS } = require('../constants/files');

const buildFlight = (data) => ({
    id: data[0],
    origin: data[1],
    destination: data[2],
    capacity: Number(data[3]) || 0
});

const buildPassenger = (data) => ({
    id: data[0],
    origin: data[2],
    destination: data[3],
    number: Number(data[1]) || 0
});

const csvParser = (req, res, err) => {
    const passengers = [];
    const flights = [];
    let fileNumber = 0;

    req.files.forEach((f, i) => {
        csv.parseFile(f.path)
            .on("data", (data) => {
                if (!data[0]) {
                    return false;
                }
                if (f.fieldname === FLIGHTS) {
                    flights.push(buildFlight(data));
                } else if (f.fieldname === PNRS) {
                    passengers.push(buildPassenger(data));
                }
            })
            .on("end", function (data) {
                fileNumber ++;
                if (fileNumber === req.files.length) {
                    res(flightsSearching(flights, passengers));
                }
            })
            .on('error', error => err(`Error of file parsing ${error}`));
    });
};

module.exports = {
    csvParser
};
