import Link from 'next/link';

export default function NotFound() {
    return (
        <>
            <div className={`${'container'}`}>
                <main className={'main'}>
                    <h1 className={'title'}>
                        S&apos;ha produït un error 404
                        <br />
                        <small>[Pàgina no trobada]</small>
                    </h1>
                    <p>
                        Si us plau, torna a la pàgina d&apos;
                        <Link href='/'>
                            Inici
                        </Link>
                        .
                    </p>
                </main>
            </div>
        </>
    );
}
