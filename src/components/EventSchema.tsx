import type { Content } from "@/content";
import { SITE_URL, siteDescription, siteTitle } from "@/lib/site";

export function EventSchema({ content }: { content: Content }) {
  const { edition, speakers } = content;
  if (!edition.startsAt || !edition.endsAt) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: siteTitle(edition),
    description: siteDescription(edition),
    startDate: edition.startsAt,
    endDate: edition.endsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: true,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    inLanguage: "tr",
    location: {
      "@type": "Place",
      name: `${edition.venue.campus} · ${edition.venue.name}`,
      address: { "@type": "PostalAddress", addressLocality: "İstanbul", addressCountry: "TR" },
      geo: { "@type": "GeoCoordinates", latitude: edition.venue.lat, longitude: edition.venue.lng },
    },
    organizer: { "@type": "Organization", name: "YTÜ SKY LAB", url: "https://yildizskylab.com" },
    ...(edition.registrationUrl && {
      offers: { "@type": "Offer", price: 0, priceCurrency: "TRY", url: edition.registrationUrl, availability: "https://schema.org/InStock" },
    }),
    ...(speakers.length && { performer: speakers.map((s) => ({ "@type": "Person", name: s.name })) }),
  };

  // "<" is escaped so content from the CMS can never close the script tag early.
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}
