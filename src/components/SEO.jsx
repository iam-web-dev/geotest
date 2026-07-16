import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Geo-Test';
const BASE_URL = 'https://geo-test.uz';
const DEFAULT_IMAGE = `${BASE_URL}/main_logo.png`;
const DEFAULT_DESCRIPTION =
  "Geo-Test — geografiyani o'rganish uchun zamonaviy platforma. DTM, Milliy Sertifikat, Olimpiada testlari, interaktiv viktorinalar, o'yinlar va raqamli kutubxona.";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} – Interaktiv Geografiya O'rganish Platformasi`;
  const canonicalUrl = url ? `${BASE_URL}${url}` : BASE_URL;

  return (
    <Helmet>
      <html lang="uz" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="geografiya, Geo-Test, O'zbekiston geografiyasi, DTM, Milliy Sertifikat, geografiya testlari, viktorina, olimpiada, geografiya kitoblari, interaktiv ta'lim" />
      <meta name="author" content="Geo-Test Team" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="theme-color" content="#2F80ED" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="uz_UZ" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

export const BASE_URL_EXPORT = BASE_URL;
