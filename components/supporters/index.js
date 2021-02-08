import styles from './Supporters.module.scss';

const staticDataUrl = `https://cdbdata.vercel.app/static`;

const Supporters = ({ supporters }) => {
    return supporters && supporters.length ? (
        <div className={styles.supportersComponent}>
            {supporters.map((s, i) => (
                <div key={s.type} className={styles.supporter}>
                    <p>{s.type}:</p>
                    <ul>
                        {s.list.map((l, i) => (
                            <li key={l.name}>
                                <img
                                    alt={l.name}
                                    src={`${staticDataUrl}${l.logo}`}
                                    width={120}
                                    height={120}
                                    title={l.name}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    ) : null;
};

export default Supporters;
