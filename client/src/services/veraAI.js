import axios from "axios";
// const baseUrl = "http://localhost:3001"; // for now sha...
const baseUrl = "https://veraai.onrender.com"
// this is wonderful.....

const computeVal = async (data) => {
    let val = await axios.post(`${baseUrl}/parse`, data); // normally...
    if (val.status == 200) {
        return val.data; // hmmm...
    } else {
        return null;
    }
}

export default {
    computeVal
}