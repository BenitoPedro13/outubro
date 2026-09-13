import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { site } from "@/content/home";
import { siteUrl } from "@/lib/site-url";

// The real site's chrome (docs/tasks/TASK-home-static.md §2.1). /apresentacao lives in
// its own (preview) group and never gets this header, footer or structured data.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-azul.png`,
  slogan: site.tagline,
  foundingDate: "2018",
  sameAs: [site.instagram],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-21-92011-5154",
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="has-mobile-cta lg:pb-0">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <script
        type="application/ld+json"
        // Next.js JSON-LD guide: escape "<" so the payload can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <MobileCtaBar />
      <SmoothScroll />
    </div>
  );
}
