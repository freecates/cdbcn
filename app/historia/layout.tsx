import OtherRoutes from '@components/otherroutes';
import api from '@libs/api.js';
import { IRoute } from '@interfaces/index';

const HistoriaLayout = async ({ children }: { children: React.ReactNode }) => {
    const { historiaRoutes }: { historiaRoutes: IRoute[] } = await getData();
    return (
        <>
            <>
                <h1 className='title'>Historia</h1>
                <OtherRoutes routes={historiaRoutes} />
            </>
            <div>{children}</div>

            <div>
                <OtherRoutes routes={historiaRoutes} isButton />
            </div>
        </>
    );
};

const getData = async () => {
    const historiaRoutes = await api.cdbData.getData('historiaRoutes');
    return {
        historiaRoutes,
    };
};

export default HistoriaLayout;
