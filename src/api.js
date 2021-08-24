const API_URL="https://strangers-things.herokuapp.com/api/2105-SJS-RM-WEB-PT/"


const APIFetch = async (
    {
        url:url,
        method:method,
        token:token,
        body:body
    })=>
{
    try
    {
        const response = await fetch(API_URL+url,
        {
            method:method ? method.toUpperCase():"GET",
            headers:
            {
                    'Content-Type':'application/json',
                    ...(token && {'Authorization':'Bearer '+token}),
            },
            body:JSON.stringify(body)
        });
        return await response.json();

    }
    catch(error)
    {
        throw error;
    }
}

export default APIFetch;