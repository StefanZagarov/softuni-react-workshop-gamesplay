// Abstracting the request logic to make it reusable for requests

// It takes the metod (GET, POST, etc.), the url and the data as arguments
export async function request(method, url, data) {
    try {
        // We need options for the fetch request
        const options = {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, options);

        const result = await response.json();

        return result;
    } catch (error) {
        return error;
    }
};