import { MetadataRoute } from "next";
import { COMPANY } from "./company-info";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${COMPANY.url}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${COMPANY.url}/portfolio/signage`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${COMPANY.url}/portfolio/branding`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
