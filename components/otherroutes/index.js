import Link from 'next/link';
import styles from './OtherRoutes.module.scss';

const OtherRoutes = ({ routes }) => {
    return (
        <p className={styles.otherRoutesComponent}>
            <small>
                {routes.map((r, id) => (
                    <Link href={r.route} key={id}>
                        <a title={`Anar a ${r.name}`}>{r.name}</a>
                    </Link>
                ))}
            </small>
        </p>
    );
};

export default OtherRoutes;
