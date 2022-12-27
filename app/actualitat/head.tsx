const Head = async () => {
    const title = 'Actualitat dels Castellers de Barcelona';
    const pageDescription = "Recull de l'Actualitat dels Castellers de Barcelona";
    const pageTitle = 'Actualitat';
    return (
        <>
            <title>{`${pageTitle} | ${title}`}</title>
            <meta name='description' content={pageDescription + ' | ' + title} />
            <meta
                name='viewport'
                content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
            />
        </>
    );
};

export default Head;
