import Image from "next/image";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import ReelsGallery from "@/components/ReelsGallery";
import { MobileHeaderNav } from "@/components/site/mobile-header-nav";

const services = [
  "Reeducation apres blessure ou operation",
  "Douleurs du dos, cou et articulations",
  "Kinesitherapie du sport",
  "Reeducation respiratoire",
  "Suivi enfants et seniors",
  "Soins a domicile selon disponibilite",
];

const resultImages = [
  {
    src: "/images/results/result-1.png",
    title: "Evaluation initiale",
    desc: "Observation de la posture, de la mobilite et des zones a travailler.",
  },
  {
    src: "/images/results/result-2.png",
    title: "Travail manuel precis",
    desc: "Techniques adaptees pour soulager la douleur et guider la recuperation.",
  },
  {
    src: "/images/results/result-3.png",
    title: "Progression controlee",
    desc: "Exercices suivis et ajustes selon la reponse du patient.",
  },
  {
    src: "/images/results/result-4.png",
    title: "Resultat suivi",
    desc: "Un accompagnement regulier pour retrouver confort, force et confiance.",
  },
];

const hours = [
  ["Samedi", "09:00 - 12:30"],
  ["Dimanche", "Ferme"],
  ["Lundi", "09:00 - 18:00"],
  ["Mardi", "09:00 - 18:00"],
  ["Mercredi", "09:00 - 18:00"],
  ["Jeudi", "09:00 - 18:00"],
];

const steps = [
  "Vous contactez le cabinet.",
  "Nous confirmons le creneau.",
  "Le kine fait un bilan simple.",
  "Vous commencez le traitement adapte.",
];

const clinicName = "Cabinet Doumi Physio";
const clinicNameAr = "\u0627\u0644\u062A\u0631\u0648\u064A\u0636 \u0627\u0644\u0637\u0628\u064A \u0648 \u0639\u0644\u0627\u062C \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A";
const mapsSearchName = `${clinicName} ${clinicNameAr}`;
const mapsQuery = encodeURIComponent(mapsSearchName);
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&z=16&output=embed`;

export default function Home() {
  return (
    <div className="lux-brand-background min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
          <a href="#" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <Image
              src="/logo.png"
              alt="Doumi Physio"
              width={42}
              height={42}
              className="size-9 shrink-0 rounded-md sm:size-[42px]"
              priority
            />
            <span className="truncate text-base font-semibold sm:text-lg">Doumi Physio</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a className="hover:text-foreground" href="#services">
              Services
            </a>
            <a className="hover:text-foreground" href="#reels">
              Démonstrations
            </a>
            <a className="hover:text-foreground" href="#resultats">
              Resultats
            </a>
            <a className="hover:text-foreground" href="#infos">
              Infos
            </a>
            <a className="hover:text-foreground" href="#localisation">
              Localisation
            </a>
            <a className="hover:text-foreground" href="#contact">
              Contact
            </a>
          </nav>

          <a
            href="tel:+212649786068"
            className="hidden shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:inline-flex"
          >
            Appeler
          </a>

          <MobileHeaderNav />
        </div>
      </header>

      <main>
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-5 sm:py-14 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-10 md:py-20">
            <div>
              <p className="mb-4 text-sm font-medium text-primary">
                Centre de kinesitherapie a Agadir
              </p>
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                Des soins simples, clairs et adaptes a votre douleur.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-5 sm:text-lg sm:leading-8">
                Doumi Physio vous accompagne pour recuperer votre mobilite,
                soulager les douleurs et reprendre vos activites avec confiance.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="rounded-md bg-primary px-5 py-3 text-center font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Prendre rendez-vous
                </a>
                <a
                  href="#services"
                  className="rounded-md border border-border px-5 py-3 text-center font-medium hover:bg-secondary"
                >
                  Voir les services
                </a>
              </div>
            </div>

            <div className="touch-static flex items-center justify-center rounded-2xl border border-border bg-card p-3 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-5">
              <div className="relative aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-xl bg-muted/30 md:aspect-[3/4]">
                <Image
                  src="/images/office.jpg"
                  alt="Cabinet Doumi Physio"
                  fill
                  sizes="(min-width: 768px) 420px, 100vw"
                  className="object-cover object-center shadow-inner"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="border-b border-border py-14 md:py-18">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold">Ce que nous traitons</h2>
              <p className="mt-3 text-muted-foreground">
                Les soins les plus demandes, presentes simplement pour vous
                aider a choisir le bon rendez-vous.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service}
                  className="flex gap-3 rounded-lg border border-border bg-card p-5"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <p className="font-medium">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ReelsGallery />

        <section id="resultats" className="border-b border-border bg-card/80 py-14 backdrop-blur-sm md:py-18">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold">Resultats de notre travail</h2>
                <p className="mt-3 text-muted-foreground">
                  Une presentation visuelle du travail realise au cabinet, avec une
                  approche claire, suivie et adaptee a chaque patient.
                </p>
              </div>
              <a
                href="#contact"
                className="w-fit rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
              >
                Demander un avis
              </a>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {resultImages.map((item) => (
                <article
                  key={item.src}
                  className="overflow-hidden rounded-lg border border-border bg-card"
                >
                  <div className="relative aspect-[4/5] bg-muted">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="infos" className="border-b border-border py-14 md:py-18">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold">Comment ca se passe</h2>
              <div className="mt-7 space-y-4">
                {steps.map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-sm font-semibold">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-primary" />
                <h3 className="text-xl font-semibold">Horaires</h3>
              </div>
              <div className="mt-5 divide-y divide-border">
                {hours.map(([day, time]) => (
                  <div
                    key={day}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <span className="font-medium">{day}</span>
                    <span className="text-right text-muted-foreground">
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="localisation" className="border-b border-border bg-card/80 py-14 backdrop-blur-sm md:py-18">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground">
                  <MapPin className="size-4" />
                  Localisation du cabinet
                </div>
                <h2 className="mt-5 text-3xl font-semibold">
                  Trouvez facilement Cabinet Doumi Physio
                </h2>
                <p className="mt-3 leading-7 text-muted-foreground">
                  La localisation exacte s ouvre directement dans Google Maps avec
                  le nom officiel du cabinet. Utilisez le bouton itineraire depuis
                  votre telephone pour arriver au bon endroit.
                </p>

                <div className="mt-6 space-y-3 rounded-lg border border-border bg-card p-5">
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold">Nom sur Google Maps</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        <span className="block">{clinicName}</span>
                        <span className="block text-right" dir="rtl">{clinicNameAr}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold">Contact direct</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        +212 6 49 78 60 68
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Navigation className="size-5" />
                  Ouvrir l itineraire
                </a>
              </div>

              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <iframe
                  title="Localisation Cabinet Doumi Physio"
                  src={googleMapsEmbedUrl}
                  className="h-[300px] w-full border-0 sm:h-[420px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="border-t border-border p-4">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    <Navigation className="size-5" />
                    Ouvrir dans Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-14 md:py-18">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-semibold">Contact</h2>
              <p className="mt-3 text-muted-foreground">
                Appelez-nous ou envoyez un message. Nous vous recontactons pour
                confirmer le rendez-vous.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="tel:+212649786068"
                className="rounded-lg border border-border bg-card p-5 hover:bg-secondary"
              >
                <Phone className="mb-4 size-5 text-primary" />
                <p className="font-semibold">Telephone</p>
                <p className="mt-1 text-muted-foreground">+212 6 49 78 60 68</p>
              </a>
              <a
                href="mailto:contact@doumiphysio.ma"
                className="rounded-lg border border-border bg-card p-5 hover:bg-secondary"
              >
                <Mail className="mb-4 size-5 text-primary" />
                <p className="font-semibold">Email</p>
                <p className="mt-1 text-muted-foreground">
                  contact@doumiphysio.ma
                </p>
              </a>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-border bg-card p-5 hover:bg-secondary sm:col-span-2"
              >
                <MapPin className="mb-4 size-5 text-primary" />
                <p className="font-semibold">Adresse</p>
                <p className="mt-1 text-muted-foreground">
                  {clinicName}
                </p>
              </a>
              <a
                href="tel:+212649786068"
                className="flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-4 font-medium text-primary-foreground hover:bg-primary/90 sm:col-span-2"
              >
                <CalendarDays className="size-5" />
                Reserver par telephone
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Doumi Physio</p>
          <p>Centre de kinesitherapie a Agadir</p>
        </div>
      </footer>
    </div>
  );
}
