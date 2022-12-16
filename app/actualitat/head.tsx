const Head = async () => {
    const title = 'Actualitat dels Castellers de Barcelona';
    const pageDescription = "Recull de l'Actualitat dels Castellers de Barcelona";
    const pageTitle = 'Actualitat';
    return (
        <>
            <title>{`${pageTitle} | ${title}`}</title>
            <meta name='description' content={pageDescription + ' | ' + title} />
        </>
    );
};

export default Head;
