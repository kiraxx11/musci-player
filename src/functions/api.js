import axios from 'axios'




const instance=axios.create({
    baseURL:'https://deezerdevs-deezer.p.rapidapi.com/',
    timeout: 3000,
    headers:{'X-RapidAPI-Key': 'd6bc9d4f6amshbe48caeeb2b964ep15cd34jsn72bd50f82654'}
});

const getAlbums= async (search,state)=>{
    const albums=await instance.get(`search?q=${search}&limit=20`)
    state(albums.data.data)
    
}
export {getAlbums}