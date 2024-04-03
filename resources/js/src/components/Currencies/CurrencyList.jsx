import {useState, useEffect} from 'react';
import styles from './CurrencyList.module.css';
import CurrencyItem from './CurrencyItem/CurrencyItem';
import Card from '../UI/Card';
import useHttp from "../../hooks/http";
import {useLocation, Link} from 'react-router-dom';

import Echo from "laravel-echo";

const CurrencyList = () => {
    const sortCurrencyRates = (rateList, sortBy, isAscending) => {
        let sortedRateList = [...rateList];
        sortedRateList.sort((rate1, rate2) => {
            let value1 = rate1[sortBy];
            let value2 = rate2[sortBy];
            if (value1 === undefined) {
                value1 = 0;
            }
            if (value2 === undefined) {
                value2 = 0;
            }

            if (isAscending) {
                return value1 > value2 ? 1 : -1;
            }else {
                return value1 < value2 ? 1 : -1;
            }
        });
        return sortedRateList;
    }

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sortBy = queryParams.get('sortBy');
    const sortOrder = queryParams.get('sortOrder');

    const [rates, setRates] = useState([]);
    const [isWebsocketConnectionFailed, setIsWebsocketConnectionFailed] = useState(false);

    const {isLoading, error: httpErrorMessage, sendHttpRequest: fetchCurrencyRates} = useHttp();
    const manageCurrencyRates = (ratesData) => {
        let loadedRates = [];
        for (const key in ratesData) {
            loadedRates.push({
                id: ratesData[key]['currencyCodeA'] + '' + ratesData[key]['currencyCodeB'],
                ...ratesData[key]
            });
        }
        setRates(loadedRates);
    }

    useEffect(() => {

        fetchCurrencyRates('/api/rates', {}, manageCurrencyRates);

    }, [fetchCurrencyRates]);


    useEffect(() => {

        window.Pusher = require('pusher-js');
        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: process.env.MIX_PUSHER_APP_KEY,
            cluster: process.env.MIX_PUSHER_APP_CLUSTER,
            wsHost: window.location.hostname,
            wsPort: 6001,
            forceTLS: false,
            disableStats: true,
            enabledTransports: ['ws']
        });

        window.Echo.connector.pusher.connection.bind('unavailable', (payload) => {
            console.log('unavailable', payload);
            setIsWebsocketConnectionFailed(true);
        });

        window.Echo.channel('currency-rates-channel').listen('.currency.updated', (e) => {
            manageCurrencyRates(e.data);
            console.log('Updated currencies');
        });

    }, []);

    if (isWebsocketConnectionFailed) {
        return (<section className={styles.loading}>
            Websocket connection failed
        </section>);
    }

    if (isLoading) {
        return (<section className={styles.loading}>
            Extracting data from server
        </section>);
    }

    if (httpErrorMessage) {
        return (<section className={styles.error}>
            {httpErrorMessage}
        </section>);
    }

    let sortedCurrencyRateList = rates;
    if (sortBy) {
        sortedCurrencyRateList = sortCurrencyRates(rates, sortBy, sortOrder === 'asc');
    }

    const CurrencyRateList = sortedCurrencyRateList.map(rate => <CurrencyItem key={rate.id} rate={rate}/>);

    const columns = [
        {width: 10, title: 'A', index: 'currencyCodeA'},
        {width: 10, title: 'B', index: 'currencyCodeB'},
        {width: 15, title: 'Rate Buy', index: 'rateBuy'},
        {width: 15, title: 'Rate Sell', index: 'rateSell'},
        {width: 20, title: 'Rate Cross', index: 'rateCross'},
        {width: 30, title: 'Last Updated', index: 'date'}
    ];

    const columnsList = columns.map((col, index) => {
        const columnSortOrder = sortBy === col.index && sortOrder === 'asc' ? 'desc' : 'asc';
        const columnSortIcon = sortBy === col.index ? (sortOrder === 'asc' ? '▲' : '▼') : '▲▼';
        const columnSortLink = '/?sortBy=' + col.index + '&sortOrder=' + columnSortOrder;
        return <th key={index} width={`${col.width}%`}>{col.title}<Link to={columnSortLink}>{columnSortIcon}</Link></th>;
    });

    return <section className={styles['rates-list']}>
        <Card>
            <div>
                <table>
                    <thead>
                    <tr>
                    {columnsList}
                    </tr>
                    </thead>
                    <tbody>
                    {CurrencyRateList}
                    </tbody>
                </table>
            </div>
        </Card>
    </section>
};

export default CurrencyList;
