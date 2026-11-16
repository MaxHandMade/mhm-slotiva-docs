import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const CARDS = [
  {
    to: '/docs/intro',
    title: translate({ id: 'home.card.start.title', message: 'Get started' }),
    text: translate({
      id: 'home.card.start.text',
      message: 'What Slotiva does, how a booking flows, and how to set it up in a few minutes.',
    }),
  },
  {
    to: '/docs/daily-use/customer-checkout',
    title: translate({ id: 'home.card.daily.title', message: 'Daily use' }),
    text: translate({
      id: 'home.card.daily.text',
      message: 'What your customers see at checkout and how you manage appointments.',
    }),
  },
  {
    to: '/docs/license-support/license',
    title: translate({ id: 'home.card.license.title', message: 'License & support' }),
    text: translate({
      id: 'home.card.license.text',
      message: 'What a license gives you, what happens when it ends, and where to get help.',
    }),
  },
];

export default function Home() {
  const { i18n } = useDocusaurusContext();
  const banner = useBaseUrl(i18n.currentLocale === 'tr' ? '/img/banner-tr.webp' : '/img/banner.webp');
  return (
    <Layout
      title={translate({ id: 'home.meta.title', message: 'Hourly appointment booking for WooCommerce' })}
      description={translate({
        id: 'home.meta.description',
        message: 'MHM Slotiva documentation: customers pick their hours right at the WooCommerce checkout.',
      })}
    >
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <img
            className={styles.banner}
            src={banner}
            width="1544"
            height="500"
            alt={translate({
              id: 'home.banner.alt',
              message: 'MHM Slotiva — hourly appointment booking for WooCommerce. Customers pick their hours right at checkout.',
            })}
          />
          <p className={styles.lead}>
            <Translate id="home.lead">
              Sell appointments by the hour in your own WooCommerce store. Your customers choose one or more hours on the
              checkout page; Slotiva holds the time while they pay and you manage everything in WordPress.
            </Translate>
          </p>
          <Link className="button button--primary button--lg" to="/docs/intro">
            <Translate id="home.cta">Read the documentation</Translate>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.cards}>
          {CARDS.map((c) => (
            <Link key={c.title} to={c.to} className={styles.card}>
              <h2>{c.title}</h2>
              <p>{c.text}</p>
            </Link>
          ))}
        </div>
        <p className={styles.requires}>
          <Translate id="home.requires">
            Requires WordPress 7.0+, PHP 8.1+ and WooCommerce 11.2+ with the Checkout block.
          </Translate>
        </p>
      </main>
    </Layout>
  );
}
