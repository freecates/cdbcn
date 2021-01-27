import styles from './Footer.module.scss';
import OtherRoutes from '@components/otherroutes';

const Footer = ({ footerLinks }) => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            {footerLinks ? (
                <div className={styles.container}>
                    <OtherRoutes routes={footerLinks} isButton />
                </div>
            ) : null}
            <div className={styles.wrapper}>
                <a href='https://www.instagram.com/castellersdebarcelona/'>
                    <small>Instagram</small>
                </a>
                <a href='https://www.youtube.com/user/arxiucdb'>
                    <small>Youtube</small>
                </a>
                <a href='https://twitter.com/cdbcn'>
                    <small>Twitter</small>
                </a>
                <a href='https://www.facebook.com/castellersdebarcelona'>
                    <small>Facebook</small>
                </a>
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
