import Link from 'next/link';

const Mitjans = () => (
    <div>
        <h1>Mitjans</h1>
        <p>
            <Link href={`/mitjans/la-primera-aparicio`}>
                <a title={`Veure la fitxa de: la primera`}>[+]</a>
            </Link>
        </p>
    </div>
);

export default Mitjans;
