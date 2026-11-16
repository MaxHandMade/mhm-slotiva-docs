// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

const ACCOUNT_URL = 'https://wpalemi.com/account/';

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
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'MHM Slotiva',
        logo: {
          alt: 'MHM Slotiva',
          src: 'img/logo.png',
          srcDark: 'img/logo-dark.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          { type: 'localeDropdown', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              { label: 'What is Slotiva?', to: '/docs/intro' },
            ],
          },
          {
            title: 'Your account',
            items: [
              { label: 'Account and support (wpalemi)', href: ACCOUNT_URL },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} MaxHandMade.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
