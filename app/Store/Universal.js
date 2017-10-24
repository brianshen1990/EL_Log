import Reflux from 'reflux';
import config from '../public/config.json'

const Universal = {
    Config(){
        return config;
    }
}

export default Universal