import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import Figure from '@components/figure';
import { FaMapSigns } from 'react-icons/fa';
import { GetStaticProps } from 'next';

const Contacte = ({ contacte, footer, routes }) => {
    const {
        title,
        pageTitle,
        pageDescription,
        name,
        address,
        phone,
        mobile,
        web,
        email,
        map,
    } = contacte.meta;
    const mainImage = contacte.images.mainImage;
    const { routes: footerLinks, supporters } = footer;
    return (
        <Layout
            title={title}
            pageTitle={pageTitle}
            pageDescription={pageDescription}
            contacte
            navRoutes={routes}
            footerLinks={footerLinks}
            supporters={supporters}
        >
            <div className={`${styles.container} ${styles.withOverlay}`}>
                <main className={`${styles.main} ${styles.withUnderlay}`}>
                    <p className={styles.description}>
                        <strong>{name}</strong>
                        <br />
                        <br />
                        {address}
                        <br />
                        T. <a href={phone.href}>{phone.number}</a>
                        <br />
                        M. <a href={mobile.href}>{mobile.number}</a> [premsa]
                        <br />
                        {web}
                        <br />
                        <a href={email.href}>{email.address}</a>
                        <br />
                        <a
                            title={map.title}
                            target={'_blank'}
                            rel={'noopener norefer'}
                            href={map.url}
                        >
                            <FaMapSigns />
                        </a>
                    </p>
                </main>
            </div>
            <Figure data={mainImage} quality={100} layout={'responsive'} />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [contacte, footer, routes] = await Promise.all([
        api.contacte.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    return {
        props: {
            contacte: { ...contacte[0] },
            footer: { ...footer[0] },
            routes,
        },
    };
};

export default Contacte;
