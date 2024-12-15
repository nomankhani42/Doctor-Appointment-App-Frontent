import axios from "axios";



export const APIBASEURL= axios.create({
      baseURL:'https://doctorio.vercel.app/api/v1'
})