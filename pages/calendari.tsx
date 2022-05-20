import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import { GetStaticProps } from 'next';
import { IMeta, IRoute, ISupporter } from '@interfaces/index';
import ResponsiveCalendar from '@components/responsivecalendar';

type CalendarProps = {
    calendari: {
        meta: IMeta;
        calendarSrc: string;
    };
    footer: { routes: IRoute[]; supporters: ISupporter[] };
    routes: IRoute[];
    mdFileContent: string;
};

const Calendar: React.FC<CalendarProps> = ({ calendari, footer, routes }) => {
    const { title, pageTitle, pageDescription } = calendari.meta;
    const { routes: footerLinks, supporters } = footer;
    const { calendarSrc } = calendari;
    return (
        <Layout
            pageTitle={pageTitle}
            titlePage={title}
            navRoutes={routes}
            pageDescription={pageDescription}
            footerLinks={footerLinks}
            supporters={supporters}
        >
            <div className={`${styles.container}`}>
                <main>
                    <h1>{pageTitle}</h1>
                    <ResponsiveCalendar src={calendarSrc} />
                </main>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [calendari, footer, routes] = await Promise.all([
        api.calendari.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);

    return {
        props: {
            calendari: { ...calendari[0] },
            footer: { ...footer[0] },
            routes,
        },
        revalidate: 60,
    };
};

export default Calendar;
