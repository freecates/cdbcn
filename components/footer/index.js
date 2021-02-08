import styles from './Footer.module.scss';
import OtherRoutes from '@components/otherroutes';
import Supporters from '@components/supporters';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = ({ footerLinks, supporters }) => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            {footerLinks ? (
                <div className={styles.container}>
                    <OtherRoutes routes={footerLinks} isButton />
                </div>
            ) : null}
            <div className={styles.wrapper}>
                <a
                    target='_blank'
                    rel={'noopener nofollow'}
                    href='https://www.instagram.com/castellersdebarcelona/'
                >
                    <span>
                        <FaInstagram />
                    </span>
                </a>
                <a
                    target='_blank'
                    rel={'noopener nofollow'}
                    href='https://www.youtube.com/user/arxiucdb'
                >
                    <span>
                        <FaYoutube />
                    </span>
                </a>
                <a target='_blank' rel={'noopener nofollow'} href='https://twitter.com/cdbcn'>
                    <span>
                        <FaTwitter />
                    </span>
                </a>
                <a
                    target='_blank'
                    rel={'noopener nofollow'}
                    href='https://www.facebook.com/castellersdebarcelona'
                >
                    <span>
                        <FaFacebook />
                    </span>
                </a>
            </div>
            <div className={styles.container}>
                <Supporters supporters={supporters} />
            </div>
            <div className={styles.container}>
                <p className={styles.alignCenter}>
                    <small>
                        &copy; {currentYear} Associació Colla Castellers de Barcelona. Entitat
                        d'Utilitat Pública (
                        <a
                            rel={'noopener nofollow'}
                            href='http://dogc.gencat.cat/ca/pdogc_canals_interns/pdogc_resultats_fitxa/?action=fitxa&amp;mode=single&amp;documentId=580319&amp;language=ca_ES'
                            target='_blank'
                        >
                            DOGC 5880
                        </a>
                        )
                    </small>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
