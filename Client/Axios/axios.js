import axios from 'axios'
import { BaseURL } from '../Constand/Constant';


const instance = axios.create({
    baseURL: BaseURL,
  });

export default instance


