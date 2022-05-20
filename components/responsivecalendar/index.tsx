import styles from './Calendar.module.scss';

type Props = {
    src: string;
};

const ResponsiveCalendar: React.FC<Props> = ({ src }) => {
    return (
        <div className={styles['calendar-component']}>
            <div className={`${styles['responsive-iframe-container']} ${styles['big-container']}`}>
                <iframe
                    src={`https://calendar.google.com/calendar/embed?showTitle=0&showNav=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&height=700&wkst=1&bgcolor=%23d9001d&src=${src}&color=%23d9001d&ctz=Europe%2FAndorra`}
                    width='100%'
                    height='650'
                    frameBorder='0'
                    scrolling='no'
                />
            </div>
            <div className={`${styles['responsive-iframe-container']} ${styles['small-container']}`}>
                <iframe
                    src={`https://calendar.google.com/calendar/embed?showTitle=0&showNav=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=AGENDA&height=800&wkst=1&bgcolor=%23d9001d&src=${src}&color=%23D9001d&ctz=Europe%2FAndorra`}
                    width='100%'
                    height='650'
                    frameBorder='0'
                    scrolling='no'
                />
            </div>
        </div>
    );
};

export default ResponsiveCalendar;
