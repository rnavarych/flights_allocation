import { BASE_URL } from '../configs/urls';
import { REQUEST_TIMEOUT } from '../configs/settings';

async function getFetchAction(endpoint, method, body) {
    let headers = {
        'Accept': 'application/json',
        'credentials': 'same-origin',
    };

    const formData = new FormData();
    formData.append('pnrs', body.passengers);
    formData.append('flights', body.flights);

    return fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: formData,
    });
}

const timeoutAction = reject => setTimeout(() => reject(new Error('request timeout')), REQUEST_TIMEOUT);

export function callApi(endpoint, method, body) {
    return Promise.race([
        getFetchAction(endpoint, method, body),
        new Promise((resolve, reject) => timeoutAction(reject)),
    ]).then((response) => {
        return response.json().then((json) => {
            return { json, response }
        });
    }).then(({ json, response }) => {
        if (!response.ok || !json) {
            json.code = response.status;
            return Promise.reject(json);
        }
        return json;
    });
}

export const apiMiddleware = store => next => action => {
    let { endpoint } = action;
    const { body, types, method } = action;

    if (!endpoint && !method && !types && action.type) {
        return next(action);
    }

    const state = store.getState();

    if (typeof endpoint === 'function') {
        endpoint = endpoint(state);
    }

    if (!method) {
        throw new Error('method is not exist');
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    const [requestType, successType, failureType] = types;

    next(Object.assign({}, { type: requestType }));
    return callApi(endpoint, method, body)
        .then(response => {
                const result = response;
                next(Object.assign({}, { type: successType, result }));
                return result;
            },
            (error) => {
                console.log(error)
                next(Object.assign(
                    {},
                    {
                        type: failureType,
                        status: 'ERROR',
                        errorCode: error.code,
                        description: error.data
                    },
                ));
            },
        );
};
