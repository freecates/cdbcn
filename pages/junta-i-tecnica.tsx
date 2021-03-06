import Layout from '@components/layout';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import Figure from '@components/figure';
import BoardList from '@components/boardlist';
import { GetStaticProps } from 'next';

const JuntaITecnica = ({ footer, routes, juntaITecnica }) => {
    const { title, pageTitle, pageDescription } = juntaITecnica.meta;
    const boardMembers = juntaITecnica.members.boardMembers;
    const techMembers = juntaITecnica.members.techMembers;
    const { routes: footerLinks, supporters } = footer;
    const mainImage = juntaITecnica.images.mainImage;
    return (
        <Layout
            titlePage={title}
            pageTitle={pageTitle}
            pageDescription={pageDescription}
            navRoutes={routes}
            footerLinks={footerLinks}
            supporters={supporters}
        >
            <div className={`${styles.container} ${styles.withOverlay}`}>
                <main className={`${styles.main} ${styles.withUnderlay}`}>
                    <h1>{title}</h1>
                </main>
            </div>
            <Figure data={mainImage} quality={75} layout={'responsive'} />
            <div className={styles.container}>
                <BoardList title={'Junta'} data={boardMembers} />
                <BoardList title={'Tècnica'} data={techMembers} />
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [juntaITecnica, footer, routes] = await Promise.all([
        api.juntaITecnica.getData(),
        api.footer.getData(),
        api.routes.getData(),
    ]);
    return {
        props: {
            footer: { ...footer[0] },
            juntaITecnica: { ...juntaITecnica[0] },
            routes,
        },
    };
};

export default JuntaITecnica;
