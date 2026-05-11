/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://wtcnepal.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://wtcnepal.com/sitemap.xml',
    ],
  },
};
