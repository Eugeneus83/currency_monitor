import {useState, useCallback} from 'react';

const useHttp = () => {

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const sendHttpRequest = useCallback(async (url, setup = {}, manageData = null) => {
        setIsLoading(true);

        let headers = setup.headers ? setup.headers : {};

        headers['Accept'] = 'application/json';

        try {
            const response = await fetch(url,
                {
                    method: setup.method ? setup.method : 'GET',
                    headers: headers,
                    body: setup.data ? JSON.stringify(setup.data) : null
                });

            setIsLoading(false);

            if (!response.ok) {
                throw new Error('Http request error');
            }

            const data = await response.json();
            if (manageData) {
                manageData(data);
            }

        }catch (e) {
            setError(e.message || 'Something went wrong');
        }
    }, []);

    return {
        isLoading,
        error,
        sendHttpRequest
    }
}

export default useHttp;
