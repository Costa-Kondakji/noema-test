import { useState, useEffect } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Spinner } from "reactstrap";
import { getAllCountries, getAllCurrencies } from "../../services/RequestService";
import RequestForm from "./RequestForm/RequestForm";
import styles from './Requests.module.scss'

import mockCountries from '../../static/countries.json'
import mockCurrencies from '../../static/currencties.json'


const Requests = (props) => {


    const [isLoading, setIsLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const axios = useAxios();

    useEffect(() => {

        const getFormData = async () => {

            setIsLoading(true);

            let countriesOptions = getAllCountries();
            // const countryResults = axios(countriesOptions);


            let currenciesOptions = getAllCurrencies();
            // const currencyResults = axios(currenciesOptions);


            Promise.all([
                /*
                Unfortunately the country API has gone under maintance on Monday 29 May
                Visit https://restcountries.com/

                The data used in the application is hard coded in static files
                However the original logic used for fetching the API is still in the code for review.

                */

                // countryResults,
                // currencyResults,
            ])
                .then(results => {

                    // setCountries(results[0].data)
                    // setCurrencies(results[1].data)

                    setCountries(mockCountries.countries)
                    setCurrencies(mockCurrencies.currencies)
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        getFormData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (

        <div className={` ${styles["request-container"]} container`}>

            <h1>Noema Financial Request</h1>
            <p>Please complete the form in order to create a request.</p>

            {isLoading ?
                <Spinner color="danger" className={styles["spinner"]}>
                    Loading...
                </Spinner> :
                <RequestForm
                    countries={countries}
                    currencies={currencies}

                />
            }


        </div>

    )
}
export default Requests;