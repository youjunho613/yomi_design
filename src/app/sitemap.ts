import { MetadataRoute } from "next";

const DOMAIN = "https://yomi-design.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${DOMAIN}/board`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
