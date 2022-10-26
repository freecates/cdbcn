import Link from 'next/link';
import styles from './OtherRoutes.module.scss';
import { IRoute } from '@interfaces/index';

type Props = {
    routes: IRoute[]
    isButton?: boolean
  }

const OtherRoutes: React.FC<Props> = ({ routes, isButton }) => {
    return (
        <p className={styles.otherRoutesComponent}>
            <small>
                {routes.map((r, id) =>
                    r.route ? (
                        (<Link
                            href={r.route}
                            key={id}
                            className={`${isButton ? styles.button : null}`}
                            title={`Anar a ${r.name}`}>

                            {r.name}

                        </Link>)
                    ) : null
                )}
            </small>
        </p>
    );
};

export default OtherRoutes;
