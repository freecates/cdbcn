import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Nav.module.scss';

const Nav = ({ navRoutes }) => {
    const routesNav = navRoutes.filter((x) => x.route !== '/');
    const router = useRouter();

    return (
        <nav className={styles.nav}>
                    <ul className={styles.secondary}>
                        {routesNav.map((r, index) => (
                            <li
                                key={index}
                                className={`${
                                    router.pathname.includes(r.route) ? styles.active : ''
                                }`}
                            >
                                <Link href={r.route}>
                                    <a>{r.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
        </nav>
    );
};

export default Nav;
