import Link from 'next/link';

const Noticies = () => (
    <div>
        <h1>Noticies</h1>
        <p>
            <Link href={`/noticies/la-primera-noticia`}>
                <a title={`Veure la fitxa de: la primera`}>[+]</a>
            </Link>
        </p>
    </div>
);

export default Noticies;
