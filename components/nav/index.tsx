import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Nav.module.scss';
import { IRoute } from '@interfaces/index';

type NavProps = {
    navRoutes: IRoute[];
    small: boolean;
};

const Nav: React.FC<NavProps> = ({ navRoutes, small }) => {
    const routesNav = navRoutes.filter((x) => x.route !== '/');
    const router = useRouter();

    return (
        <nav className={`${styles.nav} ${small ? styles.small : ''}`}>
                    <ul className={styles.secondary}>
                        {routesNav.map((r, index) => (
                            <li
                                key={index}
                                className={`${
                                    router.pathname.includes(r.route) ? styles.active : ''
                                }`}
                            >
                                <Link href={r.route}>
                                    {r.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
        </nav>
    );
};

export default Nav;
