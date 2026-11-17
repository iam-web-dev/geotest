import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'GEOBEK';
const BASE_URL = 'https://geobek.uz';
const DEFAULT_IMAGE = `${BASE_URL}/logo.svg`;
const DEFAULT_DESCRIPTION =
  "GEOBEK — Oʻzbekiston va jahon geografiyasini oʻrganish uchun zamonaviy taʼlim portali. Maktab darslik taqdimotlari (7–11-sinf), DTM, Milliy Sertifikat, Olimpiada testlari, interaktiv viktorinalar va raqamli kutubxona.";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} – Geografiya Taʼlim Portali`;
  const canonicalUrl = url ? `${BASE_URL}${url}` : BASE_URL;

  return (
    <Helmet>
      <html lang="uz" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="geografiya, GEOBEK, Oʻzbekiston geografiyasi, maktab taʼlimi, 7 sinf geografiya, 8 sinf geografiya, 9 sinf geografiya, 10 sinf geografiya, 11 sinf geografiya, taqdimotlar, DTM, Milliy Sertifikat, geografiya testlari, kutubxona, interaktiv taʼlim" />
      <meta name="author" content="GEOBEK Jamoasi" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="theme-color" content="#2563EB" />
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
