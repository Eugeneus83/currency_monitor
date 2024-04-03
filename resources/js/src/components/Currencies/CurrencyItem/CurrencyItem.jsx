import styles from './CurrencyItem.module.css';

const CurrencyItem = (props) => {

    const rate = props.rate;

    return <tr className={styles.currency}>
        <td>{rate.currencyCodeA}</td>
        <td>{rate.currencyCodeB}</td>
        <td className={styles.rate}>{rate.rateBuy}</td>
        <td className={styles.rate}>{rate.rateSell}</td>
        <td className={styles.rate}>{rate.rateCross}</td>
        <td>{new Date(rate.date * 1000).toLocaleString()}</td>
    </tr>;
};

export default CurrencyItem;
