import axios from "axios"

export const GET_COUNTRIES = "GET_COUNTRIES"
export const ERROR_GET_COUNTRIES = "ERROR_GET_COUNTRIES"
export const GET_MORTALITY = "GET_MORTALITY"

const API_END_POINT = "http://api.population.io:80/1.0/"
const DEFAULT_PARAM = "25/today"
export function getCountries() {
    return function (dispatch) {
        axios(`${API_END_POINT}countries`).then(function(response) {
            dispatch({type:GET_COUNTRIES,payload:response.data.countries})
        }).catch(function(error) {
            dispatch({type:ERROR_GET_COUNTRIES,error:error.response.data.detail})
        })
    }
}

export function getMortality(country) {
    return function (dispatch) {
        return axios(`${API_END_POINT}mortality-distribution/${country}/male/${DEFAULT_PARAM}`).then((responseMale) => {
            axios(`${API_END_POINT}mortality-distribution/${country}/female/${DEFAULT_PARAM}`).then((responseFemale) => {
                console.log('------------------------------------');
                console.log(responseMale);
                console.log('------------------------------------');
                console.log('------------------------------------');
                console.log(responseFemale);
                console.log('------------------------------------');
                dispatch(
                    {
                        type : GET_MORTALITY,
                        payload : {
                            country : country,
                            male : responseMale.data.mortality_distribution,
                            female : responseFemale.data.mortality_distribution
                        }
                    }
                )
            })
        })
    }
}
