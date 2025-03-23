// Abstracting the request logic to make it reusable for requests

// It takes the metod (GET, POST, etc.), the url, the data, and optionally options as arguments
async function request(method, url, data, options = {}) {
    // GET is the default request method, so we need to set method only when it's not GET
    if (method != `GET`) {
        options.method = method;
    }

    //* We won't be using this since we have implemented similar logic in useAuth.js
    //* Checking for access token in the local storage
    // const authData = JSON.parse(localStorage.getItem("auth"));
    //* If we have a token, then we add it to the options
    // if (authData.accessToken) {
    //     options = {
    //         ...options,
    //         headers: {
    //             'X-Authorization': authData.accessToken,
    //             ...options.headers,
    //         },
    //     };
    // }

    // If we have data, then we take the above method and then add data to it
    if (data) {
        options = {
            // Keep the method from above
            ...options,
            // Add the data
            headers: {
                "Content-Type": "application/json",
                // After adding the above to the headers, we add the headers from the options
                ...options.headers
            },
            body: JSON.stringify(data)
        };
    }

    try {
        const response = await fetch(url, options);
        // We try to get the content type of the header
        const responseContentType = response.headers.get('Content-Type');
        // If the response does not have a content type (in the case of a logout), then we return
        if (!responseContentType) {
            return;
        }

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
    baseRequest: request
};
