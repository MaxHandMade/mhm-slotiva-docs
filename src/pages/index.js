import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Translate, { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

// Homepage layout follows the sibling MHM docs sites (hero with H1, subtitle, "Get started" and the banner as a card,
// then three screenshot cards). Screenshots exist per locale (-en / -tr), so each card picks the image for the
// current language.
const CARDS = [
  {
    img: 'img/docs/checkout/picker-two-hours',
    to: '/docs/daily-use/customer-checkout',
    alt: translate({
      id: 'home.card.checkout.alt',
      message: 'The time picker inside the WooCommerce checkout, with two hours chosen on the same day',
    }),
    title: <Translate id="home.card.checkout.title">Customers pick their hours at checkout</Translate>,
    body: (
      <Translate id="home.card.checkout.body">
        Your customer chooses a day and one or more times right on the WooCommerce checkout page and pays in one step.
        The time is held while the payment is pending, so two customers never book the same time.
      </Translate>
    ),
  },
  {
    img: 'img/docs/wizard/step-2',
    to: '/docs/getting-started/setup-wizard',
    alt: translate({
      id: 'home.card.wizard.alt',
      message: "The setup wizard's working hours step, with a preview of what customers see at checkout",
    }),
    title: <Translate id="home.card.wizard.title">Set up in about three minutes</Translate>,
    body: (
      <Translate id="home.card.wizard.body">
        A five-step wizard opens right after activation: your service, working hours, the bookable product and the
        checkout. Every answer can be changed later.
      </Translate>
    ),
  },
  {
    img: 'img/docs/admin/appointments',
    to: '/docs/daily-use/appointments',
    alt: translate({
      id: 'home.card.appointments.alt',
      message: 'The Slotiva Appointments screen with its counters and the upcoming appointments list',
    }),
    title: <Translate id="home.card.appointments.title">Appointments in WordPress</Translate>,
    body: (
      <Translate id="home.card.appointments.body">
        See today's, upcoming, past and cancelled appointments in one list. Change a time, cancel, add an appointment
        by hand or export the list as CSV.
      </Translate>
    ),
  },
];

export default function Home() {
  const { i18n } = useDocusaurusContext();
  const suffix = i18n.currentLocale === 'tr' ? '-tr.webp' : '-en.webp';
  const banner = useBaseUrl(i18n.currentLocale === 'tr' ? '/img/banner-tr.webp' : '/img/banner.webp');
  const baseUrl = useBaseUrl('/');
  return (
    <Layout
      title={translate({ id: 'home.title', message: 'MHM Slotiva Documentation' })}
      description={translate({
        id: 'home.meta.description',
        message: 'MHM Slotiva documentation: customers pick their hours right at the WooCommerce checkout.',
      })}
    >
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className={styles.heroTitle}>
            <Translate id="home.hero.title">MHM Slotiva Documentation</Translate>
          </Heading>
          <p className="hero__subtitle">
            <Translate id="home.hero.subtitle">Hourly appointment booking for WooCommerce</Translate>
          </p>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            <Translate id="home.hero.cta">Get started</Translate>
          </Link>
          <div className={styles.heroBannerFrame}>
            <img
              className={styles.heroBannerImage}
              src={banner}
              width="1544"
              height="500"
              alt={translate({
                id: 'home.banner.alt',
                message:
                  'MHM Slotiva — hourly appointment booking for WooCommerce. Customers pick their hours right at checkout.',
              })}
            />
          </div>
        </div>
      </header>
      <main>
        <div className={styles.cards}>
          {CARDS.map((c) => (
            <Link className={styles.card} key={c.img} to={c.to}>
              <img src={`${baseUrl}${c.img}${suffix}`} alt={c.alt} loading="lazy" />
              <div className={styles.cardBody}>
                <Heading as="h3">{c.title}</Heading>
                <p>{c.body}</p>
              </div>
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
