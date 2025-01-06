import axios from "axios";
const baseUrl = "http://localhost:3001"; // for now sha...

const getGreetings = async () => {
    let greetings = await axios.get(baseUrl); // nice and easy
    return greetings.data; // it's not a method tho...
}

const computeVal = async (data) => {
    let val = await axios.post(`${baseUrl}/parse`, data); // normally...
    if (val.status == 200) {
        return val.data; // hmmm...
    } else {
        return null;
    }
}

export default {
    getGreetings,
    computeVal
}