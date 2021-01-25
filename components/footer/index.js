import styles from './Footer.module.scss';
import OtherRoutes from '@components/otherroutes';

const Footer = ({ footerLinks }) => (
    <footer className={styles.footer}>
        {footerLinks ? (
            <div className={styles.container}>
                <OtherRoutes routes={footerLinks} />
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
    </footer>
);

export default Footer;
