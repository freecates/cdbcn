import { notFound } from 'next/navigation';
import MDFileContent from '@components/mdncontentparser';
import styles from '@styles/Home.module.scss';
import api from '@libs/api.js';
import { IMeta, IDataFigure, IRoute, IMember } from '@interfaces/index';
import Figure from '@components/figure';
import OtherRoutes from '@components/otherroutes';
import { FaMapSigns } from 'react-icons/fa';
import ResponsiveCalendar from '@components/responsivecalendar';
import BoardList from '@components/boardlist';

type SlugPageProps = {
    pageData: {
        meta: IMeta & {
            mobile: { href: string; number: string; name?: string };
            email: { href: string; address: string };
            name: string;
            phone: { href: string; number: string };
            web: string;
            address: string;
            map: { url: string; title: string };
            location: {
                address: { addressLocality: string; postalCode: string; streetAddres: string };
                alternateName: string;
            };
            otherRoutes: IRoute[];
        };
        images: { mainImage: IDataFigure };
        calendarSrc: string;
        members: { boardMembers: IMember[]; techMembers: IMember[] };
    };
    mdFileContent: string;
};

const SlugPage = async ({ params }) => {
    const { slug } = params;
    const { pageData, mdFileContent }: SlugPageProps = await getData(slug);
    if (!pageData) {
        notFound();
      }
    const {
        pageTitle,
        pageDescription,
        name,
        address,
        phone,
        mobile,
        web,
        email,
        map,
        location,
        otherRoutes,
    } = pageData.meta;
    const mainImage = pageData.images?.mainImage;
    const boardMembers = pageData.members?.boardMembers;
    const techMembers = pageData.members?.techMembers;
    const calendarSrc = pageData.calendarSrc;
    return (
        <>
            {otherRoutes && !location ? (
                <>
                    <div className={styles.container}>
                        <OtherRoutes routes={otherRoutes} />
                    </div>
                    <div className={`${styles.container} ${styles.withOverlay}`}>
                        <main className={`${styles.main} ${styles.withUnderlay}`}>
                            <p>{pageDescription}</p>
                        </main>
                    </div>
                    <Figure data={mainImage} quality={75} layout={'responsive'} />
                    <div className={styles.container}>
                        <OtherRoutes routes={otherRoutes} />
                    </div>
                </>
            ) : null}
            {!mobile ? null : mobile && !phone ? (
                <>
                    <div className={`${styles.container} ${styles.withOverlay}`}>
                        <main className={`${styles.main} ${styles.withUnderlay}`}>
                            <h1>{pageTitle}</h1>

                            <p className={styles.description}>
                                <strong>Contractacions</strong>:<br />
                                <a href={mobile.href}>{mobile.number}</a> [{mobile.name}
                                ]
                                <br />
                                <a href={email.href}>{email.address}</a>
                                <br />
                                <br />
                                <small
                                    className={styles.title}
                                    dangerouslySetInnerHTML={{
                                        __html: pageDescription,
                                    }}
                                />
                            </p>
                        </main>
                    </div>
                    {mainImage ? (
                        <Figure data={mainImage} quality={75} layout={'responsive'} />
                    ) : null}
                </>
            ) : (
                <>
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
                                    rel={'noopener noreferrer'}
                                    href={map.url}
                                >
                                    <FaMapSigns />
                                </a>
                            </p>
                        </main>
                    </div>
                    <Figure data={mainImage} quality={75} layout={'responsive'} />
                </>
            )}

            {!mobile || !otherRoutes ? null : <h1 className={styles.title}>{pageTitle}</h1>}

            {mdFileContent && !location ? (
                <div className={`${styles.container}`}>
                    <main className={styles.main}>
                        <MDFileContent content={mdFileContent} />
                    </main>
                </div>
            ) : null}

            {location && mdFileContent && otherRoutes ? (
                <>
                    <div className={`${styles.container} ${styles.withOverlay}`}>
                        <main className={`${styles.main} ${styles.withUnderlay}`}>
                            <h1>{pageTitle}!</h1>
                            <div className={styles.container}>
                                <OtherRoutes routes={otherRoutes} />
                            </div>
                            <MDFileContent content={mdFileContent} />
                            <p>
                                {' '}
                                Ens trobaràs a {location.alternateName},{' '}
                                {location.address.streetAddres}, {location.address.postalCode}{' '}
                                {location.address.addressLocality}
                            </p>
                            <h2 className={styles.title}>
                                <a
                                    title={map.title}
                                    target={'_blank'}
                                    rel={'noopener noreferrer'}
                                    href={map.url}
                                >
                                    <FaMapSigns />
                                </a>
                            </h2>
                        </main>
                    </div>
                    <Figure data={mainImage} quality={75} layout={'responsive'} />
                </>
            ) : null}

            {calendarSrc ? (
                <div className={`${styles.container}`}>
                    <main>
                        <h1>{pageTitle}</h1>
                        <ResponsiveCalendar src={calendarSrc} />
                    </main>
                </div>
            ) : null}

            {boardMembers ? (
                <>
                    <div className={`${styles.container} ${styles.withOverlay}`}>
                        <main className={`${styles.main} ${styles.withUnderlay}`}>
                            <h1>{pageTitle}</h1>
                        </main>
                    </div>
                    <Figure data={mainImage} quality={75} layout={'responsive'} />
                    <div className={styles.container}>
                        <BoardList title={'Junta'} data={boardMembers} />
                        <BoardList title={'Tècnica'} data={techMembers} />
                    </div>
                </>
            ) : null}
        </>
    );
};

const getData = async (slug: string) => {
    const camelCased = slug.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
    const data = await api.cdbData.getData(camelCased);
    const mdData = await api.mdContent.getData(slug);
    return {
        pageData: !data ? null : { ...data[0] },
        mdFileContent: mdData,
    };
};

export const generateStaticParams = async () => {
    return [
        { slug: 'politica-de-cookies' },
        { slug: 'avis-legal' },
        { slug: 'participa' },
        { slug: 'galeria' },
        { slug: 'contacte' },
        { slug: 'fes-castells' },
        { slug: 'calendari' },
        { slug: 'junta-i-tecnica' },
    ];
};

//export const dynamicParams = false;

export const revalidate = 30;

export default SlugPage;
