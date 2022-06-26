
export const getCurrentLocationData = async (latitude, longitude, date) => {
    const location = `${latitude},${longitude}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9c11d4b42emsh370397659cb4b9dp10e65bjsn12e8d52ffd11',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    try {
        const res = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&dt=${date}`, options)
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const getData = async (cityname, date) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9c11d4b42emsh370397659cb4b9dp10e65bjsn12e8d52ffd11',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    try {
        const res = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityname}&dt=${date}`, options)
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}