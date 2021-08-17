export const API_URL="https://strangers-things.herokuapp.com/api/2105-SJS-RM-WEB-PT/"
export async function fetchPosts()
{
    try{
        const response = await fetch(API_URL+"posts/");
        const jdata= await response.json();
//        console.log(data);
        return jdata.data.posts;
    }
    catch(error)
    {
        throw error;
    }
}