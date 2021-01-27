import Link from 'next/link';
import styles from './OtherRoutes.module.scss';

const OtherRoutes = ({ routes, isButton }) => {
    return (
        <p className={styles.otherRoutesComponent}>
            <small>
                {routes.map((r, id) =>
                    r.route ? (
                        <Link href={r.route} key={id}>
                            <a
                                className={`${isButton ? styles.button : null}`}
                                title={`Anar a ${r.name}`}
                            >
                                {r.name}
                            </a>
                        </Link>
                    ) : null
                )}
            </small>
        </p>
    );
};

export default OtherRoutes;
