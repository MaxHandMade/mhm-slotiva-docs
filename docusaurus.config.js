// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

const ACCOUNT_URL = 'https://wpalemi.com/account/';
// Same store as the sibling docs sites' "Official Website" (Currency Switcher). Slotiva has no product page there yet.
const OFFICIAL_URL = 'https://wpalemi.com/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MHM Slotiva Documentation',
  tagline: 'Hourly appointment booking for WooCommerce',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://MaxHandMade.github.io',
  baseUrl: '/mhm-slotiva-docs/',
  organizationName: 'MaxHandMade',
  projectName: 'mhm-slotiva-docs',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    localeConfigs: {
      en: { label: 'English', htmlLang: 'en-US' },
      tr: { label: 'Türkçe', htmlLang: 'tr-TR' },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/MaxHandMade/mhm-slotiva-docs/tree/main/',
        },
        // Release notes: one post per plugin release, for shop owners.
        blog: {
          routeBasePath: 'release-notes',
          blogTitle: 'Release notes',
          blogDescription: 'What changes for your shop in each MHM Slotiva release.',
          blogSidebarTitle: 'All releases',
          blogSidebarCount: 'ALL',
          showReadingTime: false,
          onUntruncatedBlogPosts: 'ignore',
          editUrl: 'https://github.com/MaxHandMade/mhm-slotiva-docs/tree/main/',
          feedOptions: { type: ['rss', 'atom'], xslt: true },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        // Icon + title text, like the sibling MHM docs sites (Rentiva, Currency Switcher). No GitHub item: the plugin
        // repository is private, so a link would 404 for readers.
        title: 'MHM Slotiva',
        logo: {
          alt: 'MHM Slotiva',
          src: 'img/icon-512.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          { to: '/release-notes', label: 'Release Notes', position: 'left' },
          { type: 'localeDropdown', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              { label: 'Quick start', to: '/docs/getting-started/installation' },
              { label: 'Setup wizard', to: '/docs/getting-started/setup-wizard' },
              { label: 'Managing appointments', to: '/docs/daily-use/appointments' },
            ],
          },
          {
            title: 'Reference',
            items: [
              { label: 'FAQ', to: '/docs/faq/faq' },
              { label: 'License', to: '/docs/license-support/license' },
              { label: 'Release Notes', to: '/release-notes' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Account and support', href: ACCOUNT_URL },
              { label: 'Official Website', href: OFFICIAL_URL },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MaxHandMade.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      // Same options as the sibling docs sites: both locales indexed, release notes findable.
      { hashed: true, language: ['en', 'tr'], indexBlog: true },
    ],
  ],
};

export default config;
