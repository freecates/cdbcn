import Link from 'next/link';

const Mitjans = () => (
    <div>
        <h1>Mitjans</h1>
        <p>
            <Link
                href={`/mitjans/la-primera-aparicio`}
                title={`Veure la fitxa de: la primera`}>
                [+]
            </Link>
        </p>
    </div>
);

export default Mitjans;
