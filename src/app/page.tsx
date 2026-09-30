import Image from "next/image";
import { Activity, ArrowUpRight, Bone, Check, Clock3, Dumbbell, HeartPulse, Mail, MapPin, Navigation, PersonStanding, Phone, Sparkles } from "lucide-react";
import ReelsGallery from "@/components/ReelsGallery";
import { BrandMark } from "@/components/site/brand-mark";
import { MobileHeaderNav } from "@/components/site/mobile-header-nav";

const services = [
  { icon: Bone, title: "Douleurs musculo-articulaires", text: "Dos, cervicales, épaule, genou ou cheville : identifier la cause et retrouver un mouvement plus confortable." },
  { icon: PersonStanding, title: "Rééducation fonctionnelle", text: "Après une blessure ou une opération, reconstruire mobilité, stabilité et autonomie progressivement." },
  { icon: Dumbbell, title: "Kinésithérapie du sport", text: "Prévenir les récidives, récupérer vos capacités et préparer un retour au terrain en toute confiance." },
  { icon: HeartPulse, title: "Accompagnement adapté", text: "Une prise en charge ajustée aux enfants, aux adultes, aux seniors et à chaque rythme de récupération." },
];

const resultImages = [
  { src: "/images/results/result-1.png", title: "Évaluer", desc: "Comprendre votre posture et votre mobilité." },
  { src: "/images/results/result-2.png", title: "Soulager", desc: "Agir avec des techniques manuelles ciblées." },
  { src: "/images/results/result-3.png", title: "Renforcer", desc: "Progresser avec des exercices bien dosés." },
  { src: "/images/results/result-4.png", title: "Retrouver confiance", desc: "Reprendre vos activités avec sérénité." },
];

const hours = [["Lundi — Jeudi", "09:00 — 18:00"], ["Samedi", "09:00 — 12:30"], ["Dimanche", "Fermé"]];
const steps = [
  ["Un premier échange", "Vous nous expliquez votre besoin et nous trouvons le bon créneau."],
  ["Un bilan précis", "Le kinésithérapeute observe, écoute et mesure votre mobilité."],
  ["Votre plan de soin", "Vous avancez à votre rythme avec un suivi clair et personnalisé."],
];

const clinicName = "Cabinet Doumi Physio";
const clinicNameAr = "الترويض الطبي و علاج الفيزيائي";
const mapsQuery = encodeURIComponent(`${clinicName} ${clinicNameAr}`);
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&z=16&output=embed`;

export default function Home() {
  return (
    <div className="site-shell min-h-screen">
      <header className="site-header">
        <div className="site-container flex h-[76px] items-center justify-between gap-5">
          <a href="#accueil" aria-label="Doumi Physio — Accueil"><BrandMark /></a>
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex" aria-label="Navigation principale">
            <a href="#services">Nos soins</a><a href="#reels">En pratique</a><a href="#resultats">La méthode</a><a href="#localisation">Le cabinet</a>
          </nav>
          <a href="tel:+212649786068" className="header-call hidden md:inline-flex"><Phone className="size-4" />+212 6 49 78 60 68</a>
          <MobileHeaderNav />
        </div>
      </header>

      <main>
        <section id="accueil" className="hero-section">
          <svg className="hero-motion-line" viewBox="0 0 1000 500" aria-hidden="true"><path d="M-80 390 C170 115 335 110 480 240 S770 420 1080 74" /></svg>
          <div className="site-container hero-grid">
            <div className="hero-copy">
              <div className="hero-kicker"><span /> Cabinet de kinésithérapie à Agadir</div>
              <h1>Comprendre votre douleur. Rééduquer le mouvement.</h1>
              <p>Un bilan précis, des techniques manuelles et des exercices adaptés pour vous aider à bouger avec moins de douleur et plus de confiance.</p>
              <div className="hero-actions"><a href="#contact" className="button button--primary">Prendre rendez-vous <ArrowUpRight className="size-5" /></a><a href="#services" className="button button--ghost">Découvrir nos soins</a></div>
              <div className="hero-proof"><span><Check className="size-4" /> Bilan fonctionnel individualisé</span><span><Check className="size-4" /> Suivi de votre progression</span></div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-wrap"><Image src="/images/office.jpg" alt="Cabinet Doumi Physio à Agadir" fill priority sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" /></div>
              <div className="hero-assessment">
                <div className="assessment-title"><Activity className="size-5" /><span>Bilan fonctionnel</span></div>
                <div className="assessment-arc"><span>Mobilité</span><i /><span>Force</span><i /><span>Douleur</span></div>
                <p>Le point de départ de chaque prise en charge.</p>
              </div>
              <div className="hero-availability"><span /> Rendez-vous disponibles cette semaine</div>
            </div>
          </div>
          <div className="clinical-strip"><span>Dos & cervicales</span><i /><span>Genou & cheville</span><i /><span>Épaule & coude</span><i /><span>Rééducation sportive</span></div>
        </section>

        <section id="services" className="section section--services"><div className="site-container">
          <div className="section-heading split-heading"><div><p className="section-kicker">Vos besoins, notre expertise</p><h2>Ce que nous prenons en charge.</h2></div><p>La séance ne commence pas par une technique, mais par l’écoute et l’évaluation de votre mouvement.</p></div>
          <div className="service-list">{services.map((service) => { const Icon = service.icon; return <article key={service.title} className="service-row"><span className="service-icon"><Icon /></span><h3>{service.title}</h3><p>{service.text}</p><ArrowUpRight className="service-arrow" /></article>; })}</div>
        </div></section>

        <ReelsGallery />

        <section id="resultats" className="section section--dark"><div className="site-container">
          <div className="section-heading split-heading"><div><p className="section-kicker">La méthode Doumi</p><h2>Du premier bilan au retour en mouvement.</h2></div><a href="#contact" className="text-link">Parler de votre situation <ArrowUpRight className="size-4" /></a></div>
          <div className="result-grid">{resultImages.map((item, index) => <article key={item.src} className="result-card"><div className="result-image"><Image src={item.src} alt={item.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-top" /><span>0{index + 1}</span></div><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div>
        </div></section>

        <section id="infos" className="section section--process"><div className="site-container process-grid">
          <div className="process-intro"><p className="section-kicker">Simple dès le départ</p><h2>Votre parcours, sans complication.</h2><p>Vous savez toujours où vous en êtes, pourquoi vous faites chaque exercice et quelle est la prochaine étape.</p><div className="hours-card"><div className="hours-title"><Clock3 className="size-5" /> Horaires du cabinet</div>{hours.map(([day, time]) => <div className="hours-row" key={day}><span>{day}</span><strong>{time}</strong></div>)}</div></div>
          <div className="process-steps">{steps.map(([title, text], index) => <article key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div></section>

        <section id="localisation" className="section section--location"><div className="site-container location-grid">
          <div className="location-copy"><div className="location-icon"><MapPin /></div><p className="section-kicker">Doumi Physio, Agadir</p><h2>Un cabinet accessible, un accueil humain.</h2><p>Ouvrez l’itinéraire directement sur votre téléphone et laissez Google Maps vous guider jusqu’à nous.</p><div className="clinic-name"><strong>{clinicName}</strong><span dir="rtl">{clinicNameAr}</span></div><a href={googleMapsUrl} target="_blank" rel="noreferrer" className="button button--primary">Ouvrir l’itinéraire <Navigation className="size-5" /></a></div>
          <div className="map-frame"><iframe title="Localisation Cabinet Doumi Physio" src={googleMapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="map-label"><Sparkles className="size-4" /> Nous vous attendons ici</div></div>
        </div></section>

        <section id="contact" className="contact-section"><div className="site-container contact-inner"><BrandMark compact inverse className="contact-mark" /><p>Prêt à retrouver votre mouvement ?</p><h2>Commençons par en parler.</h2><div className="contact-actions"><a href="tel:+212649786068" className="button button--light"><Phone className="size-5" /> Appeler le cabinet</a><a href="mailto:contact@doumiphysio.ma" className="button button--outline-light"><Mail className="size-5" /> Envoyer un email</a></div></div></section>
      </main>

      <footer className="site-footer"><div className="site-container footer-inner"><BrandMark inverse /><p>Centre de kinésithérapie à Agadir</p><p>© {new Date().getFullYear()} Doumi Physio</p></div></footer>
    </div>
  );
}
