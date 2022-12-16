import '@styles/globals.scss';
import api from '@libs/api.js';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Layout.module.scss';
import Footer from '@components/footer';
import Nav from './Nav/index';
import { IRoute, ISupporter } from '@interfaces/index';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const {
        routes: navRoutes,
        footer: { routes: footerLinks, supporters },
    }: {
        routes: IRoute[];
        footer: {
            routes: IRoute[];
            supporters: ISupporter[];
        };
    } = await getData();
    return (
        <html lang='ca'>
            <head />
            <body>
                <h1 className={styles.wrapperLogo}>
                    <Link href={'/'} passHref>
                        <Image
                            width='320'
                            height='128'
                            loading='lazy'
                            alt={'Logo de la Colla Castellers de Barcelona'}
                            src={'/logo-castellers-de-barcelona.png'}
                        />
                    </Link>
                </h1>
                <Nav small={false} navRoutes={navRoutes} />

                <div>{children}</div>

                <div className={styles.container}>
                    <Footer footerLinks={footerLinks} supporters={supporters} />
                    <Nav navRoutes={navRoutes} small />
                </div>
            </body>
        </html>
    );
};

const getData = async () => {
    const [footer, routes] = await Promise.all([api.cdbData.getData('footer'), api.cdbData.getData('routes')]);

    return {
        footer: { ...footer[0] },
        routes,
    };
};

export default RootLayout;
