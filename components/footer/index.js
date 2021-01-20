import styles from './Footer.module.scss';

const Footer = () => (
    <footer className={styles.footer}>
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
    </footer>
);

export default Footer;
