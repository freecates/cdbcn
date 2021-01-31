import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';
import styles from './SocialSharer.module.scss';

const SocialSharer = ({ type, id, slug, title }) => {
    return (
        <div className={`${styles.socialShareComponent}`}>
            <div className={styles.PostSomeNetwork}>
                {type === 'videos' ? (
                    <FacebookShareButton
                        url={`https://castellersdebarcelona.cat/${type}/${id}`}
                        className='Post__some-network__share-button'
                    >
                        <FacebookIcon size={25} round />
                    </FacebookShareButton>
                ) : (
                    <FacebookShareButton
                        url={`https://castellersdebarcelona.cat/${type}/${id}/${slug}`}
                        className='Post__some-network__share-button'
                    >
                        <FacebookIcon size={25} round />
                    </FacebookShareButton>
                )}
            </div>

            <div className={styles.PostSomeNetwork}>
                {type === 'videos' ? (
                    <TwitterShareButton
                        url={`https://castellersdebarcelona.cat/${type}/${id}`}
                        title={title}
                        hashtags={['BeneidaBogeria']}
                        via='cdbcn'
                        className='Post__some-network__share-button'
                    >
                        <TwitterIcon size={25} round />
                    </TwitterShareButton>
                ) : (
                    <TwitterShareButton
                        url={`https://castellersdebarcelona.cat/${type}/${id}/${slug}`}
                        title={title}
                        hashtags={['BeneidaBogeria']}
                        via='cdbcn'
                        className='Post__some-network__share-button'
                    >
                        <TwitterIcon size={25} round />
                    </TwitterShareButton>
                )}
            </div>

            <div className={styles.PostSomeNetwork}>
                {type === 'videos' ? (
                    <LinkedinShareButton
                        url={`https://castellersdebarcelona.cat/${type}/${id}`}
                        title={title}
                        className='Post__some-network__share-button'
                    >
                        <LinkedinIcon size={25} round />
                    </LinkedinShareButton>
                ) : (
                    <LinkedinShareButton
                        url={`https://castellersdebarcelona.cat/${type}/${id}/${slug}`}
                        title={title}
                        className='Post__some-network__share-button'
                    >
                        <LinkedinIcon size={25} round />
                    </LinkedinShareButton>
                )}
            </div>

            <div className={styles.PostSomeNetwork}>
                {type === 'videos' ? (
                    <WhatsappShareButton
                        url={`https://castellersdebarcelona.cat/${type}/${id}`}
                        title={title}
                        className='Post__some-network__share-button'
                    >
                        <WhatsappIcon size={25} round />
                    </WhatsappShareButton>
                ) : (
                    <WhatsappShareButton
                        url={`https://castellersdebarcelona.cat/${type}/${id}/${slug}`}
                        title={title}
                        className='Post__some-network__share-button'
                    >
                        <WhatsappIcon size={25} round />
                    </WhatsappShareButton>
                )}
            </div>

            <div className={styles.PostSomeNetwork}>
                {type === 'videos' ? (
                    <EmailShareButton
                        url={`https://castellersdebarcelona.cat/${type}/${id}`}
                        subject={title}
                        body={`Fes-li un cop d'ull a: "${title}"`}
                        className='Post__some-network__share-button'
                    >
                        <EmailIcon size={25} round />
                    </EmailShareButton>
                ) : (
                    <EmailShareButton
                        url={`https://castellersdebarcelona.cat/${type}/${id}/${slug}`}
                        subject={title}
                        body={`Fes-li un cop d'ull a: "${title}"`}
                        className='Post__some-network__share-button'
                    >
                        <EmailIcon size={25} round />
                    </EmailShareButton>
                )}
            </div>
        </div>
    );
};

export default SocialSharer;
