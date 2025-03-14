// Abstracting the request logic to make it reusable for requests

// It takes the metod (GET, POST, etc.), the url and the data as arguments
async function request(method, url, data) {
    let options = {};

    // GET is the default request method, so we need to set method only when it's not GET
    if (method != `GET`) {
        options = {
            method
        };
    }

    // If we have data, then we take the above method and then add data to it
    if (data) {
        options = {
            // Keep the method from above
            ...options,
            // Add the data
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
    }

    try {
        const response = await fetch(url, options);

        const result = await response.json();

        return result;
    } catch (error) {
        return error;
    }
};

// Creating get, post, put and delete functions that use the request function
export default {
    // By binding the method, we create a partial application where we need to send only the url and data
    get: request.bind(null, "GET"),
    post: request.bind(null, "POST"),
    put: request.bind(null, "PUT"),
    delete: request.bind(null, "DELETE"),
};