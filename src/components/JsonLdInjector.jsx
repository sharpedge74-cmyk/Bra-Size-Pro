import { useEffect } from 'react';

export function JsonLdInjector({ type, url, title, description, data, breadcrumbLabel }) {
  useEffect(() => {
    // Remove existing dynamic jsonld scripts
    const existing = document.querySelectorAll('script[data-imrango-jsonld="true"]');
    existing.forEach((el) => el.remove());

    const absoluteUrl = `https://iamrango.com${url === '/' ? '' : url}`;

    // 1. Organization & WebSite
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'IMRango',
      url: 'https://iamrango.com',
      logo: 'https://iamrango.com/assets/img/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@iamrango.com',
        contactType: 'Customer Support',
      },
    };

    const siteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'IMRango',
      url: 'https://iamrango.com',
      description: 'Precision intimates sizing, sister sizing algorithms, and professional bra fit guides.',
    };

    // 2. BreadcrumbList
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://iamrango.com/',
        },
        ...(url !== '/'
          ? [
              {
                '@type': 'ListItem',
                position: 2,
                name: breadcrumbLabel || title,
                item: absoluteUrl,
              },
            ]
          : []),
      ],
    };

    const scriptsToInject = [orgSchema, siteSchema, breadcrumbSchema];

    // 3. WebApplication for tools
    if (type === 'tool') {
      scriptsToInject.push({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: title,
        url: absoluteUrl,
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        description: description,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        creator: {
          '@type': 'Organization',
          name: 'IMRango',
          url: 'https://iamrango.com',
        },
      });
    }

    // 4. Article for guides
    if (type === 'guide') {
      scriptsToInject.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': absoluteUrl,
        },
        author: {
          '@type': 'Organization',
          name: 'IMRango Fitting Editorial Board',
        },
        publisher: {
          '@type': 'Organization',
          name: 'IMRango',
        },
        datePublished: data?.lastReviewed || '2025-01-01',
        dateModified: data?.lastReviewed || '2026-03-30',
      });
    }

    // 5. FAQPage if FAQs present
    if (data?.faq && data.faq.length > 0) {
      scriptsToInject.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      });
    }

    // Append to document head
    scriptsToInject.forEach((obj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-imrango-jsonld', 'true');
      script.textContent = JSON.stringify(obj, null, 2);
      document.head.appendChild(script);
    });

    // Sync HTML document title and canonical tag
    document.title = `${title} | IMRango`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', absoluteUrl);

    return () => {
      const added = document.querySelectorAll('script[data-imrango-jsonld="true"]');
      added.forEach((el) => el.remove());
    };
  }, [type, url, title, description, data, breadcrumbLabel]);

  return null;
}
