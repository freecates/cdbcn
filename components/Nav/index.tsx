'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.scss';
import { IRoute } from '@interfaces/index';

type NavProps = {
    navRoutes: IRoute[];
    small: boolean;
};

const Nav: React.FC<NavProps> = ({ navRoutes, small }) => {
    const routesNav = navRoutes.filter((x) => x.route !== '/');
    const pathname = usePathname();

    return (
        <nav className={`${styles.nav} ${small ? styles.small : ''}`}>
            <ul className={styles.secondary}>
                {routesNav.map((r, index) => (
                    <li
                        key={index}
                        className={`${pathname.includes(r.route) ? styles.active : ''}`}
                    >
                        <Link prefetch={true} href={r.route}>
                            {r.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
