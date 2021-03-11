import Link from 'next/link';
import styles from './OtherRoutes.module.scss';

type Props = {
    routes: IRoute
    isButton?: boolean
  }

const OtherRoutes: React.FC<Props> = ({ routes, isButton }) => {
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

interface IRoute {
    map(arg0: (r: any, id: any) => JSX.Element): import("react").ReactNode;
    route: string
    name: string
}

export default OtherRoutes;
