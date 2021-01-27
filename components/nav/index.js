import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Nav.module.scss';

const Nav = ({ navRoutes }) => {
    const routes = navRoutes.filter((x) => x.route !== '/');
    const router = useRouter();

    return (
        <nav className={styles.nav}>
            <ul className={styles.main}>
                <li>
                    <ul className={styles.secondary}>
                        {routes.map((route, index) => (
                            <li
                                key={index}
                                className={`${router.pathname == route.route ? styles.active : ''}`}
                            >
                                <Link href={route.route}>{route.name}</Link>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
