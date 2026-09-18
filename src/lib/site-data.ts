import {
  Activity,
  HeartPulse,
  Dumbbell,
  Baby,
  Bone,
  Brain,
  Waves,
  Stethoscope,
  HandHeart,
  Footprints,
  Clock,
  ShieldCheck,
  Microscope,
  Users,
  HeartHandshake,
  Award,
  Sparkles,
  CalendarClock,
  ClipboardList,
  PackageCheck,
  HomeIcon,
  Accessibility,
  Car,
  Bus,
  Ear,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory =
  | "Traumatologie & Sport"
  | "Douleurs chroniques"
  | "Neuro & Ã‰quilibre"
  | "Respiratoire & PÃ©diatrie"
  | "SantÃ© femme";

export const serviceCategories: { id: ServiceCategory | "Tous"; label: string; desc: string }[] = [
  { id: "Tous", label: "Tous", desc: "Toutes nos spÃ©cialitÃ©s" },
  { id: "Traumatologie & Sport", label: "Trauma & Sport", desc: "RÃ©Ã©ducation post-op et performance" },
  { id: "Douleurs chroniques", label: "Douleurs chroniques", desc: "Rhumatologie et pathologies chroniques" },
  { id: "Neuro & Ã‰quilibre", label: "Neuro & Ã‰quilibre", desc: "RÃ©Ã©ducation neurologique et vestibulaire" },
  { id: "Respiratoire & PÃ©diatrie", label: "Respi & PÃ©diatrie", desc: "Soins respiratoires et pÃ©diatriques" },
  { id: "SantÃ© femme", label: "SantÃ© femme", desc: "RÃ©Ã©ducation pÃ©rinÃ©ale et post-natale" },
];

export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  short: string;
  description: string;
  points: string[];
  category: ServiceCategory;
  indications?: string[];
  techniques?: string[];
  duration?: string;
};

export const services: Service[] = [
  {
    id: "traumatologie",
    icon: Bone,
    title: "Traumatologie & OrthopÃ©die",
    short: "RÃ©Ã©ducation post-traumatique et post-opÃ©ratoire",
    category: "Traumatologie & Sport",
    description:
      "Prise en charge complÃ¨te aprÃ¨s fracture, entorse, luxation ou intervention chirurgicale orthopÃ©dique pour retrouver mobilitÃ© et force.",
    points: [
      "Post-opÃ©ratoire (ligaments, prothÃ¨ses)",
      "Fractures et immobilisations",
      "Entorses et luxations",
      "RÃ©Ã©ducation de l'Ã©paule, du genou, de la cheville",
    ],
    indications: [
      "Suite d'entorse ou de fracture",
      "Post-opÃ©ratoire orthopÃ©dique",
      "LÃ©sion du ligament croisÃ©",
      "ProthÃ¨se de hanche ou de genou",
    ],
    techniques: [
      "Mobilisation passive et active",
      "Renforcement isocinÃ©tique",
      "Proprioception",
      "Ã‰lectrothÃ©rapie antalgique",
    ],
    duration: "45â€“60 min / sÃ©ance",
  },
  {
    id: "sport",
    icon: Dumbbell,
    title: "KinÃ©sithÃ©rapie du sport",
    short: "PrÃ©paration, rÃ©cupÃ©ration et performance",
    category: "Traumatologie & Sport",
    description:
      "Accompagnement des sportifs amateurs et confirmÃ©s dans la prÃ©vention des blessures, la rÃ©cupÃ©ration et le retour Ã  la performance.",
    points: [
      "Bilan fonctionnel et isocinÃ©tique",
      "PrÃ©vention des blessures",
      "RÃ©cupÃ©ration post-effort",
      "Retour au sport aprÃ¨s blessure",
    ],
    indications: [
      "Tendinopathie chronique",
      "LÃ©sion musculaire",
      "PrÃ©paration compÃ©tition",
      "Reprise aprÃ¨s convalescence",
    ],
    techniques: [
      "Bilan isocinÃ©tique Biodex",
      "PressothÃ©rapie de rÃ©cupÃ©ration",
      "Travail excentrique",
      "Stretching analytique",
    ],
    duration: "60 min / sÃ©ance",
  },
  {
    id: "rhumatologie",
    icon: HeartPulse,
    title: "Rhumatologie",
    short: "Soulager les douleurs articulaires et musculaires",
    category: "Douleurs chroniques",
    description:
      "Soins destinÃ©s aux pathologies chroniques et dÃ©gÃ©nÃ©ratives : arthrose, lombalgie, cervicalgie, tendinopathies et inflammations articulaires.",
    points: [
      "Lombalgies et cervicalgies chroniques",
      "Arthrose et polyarthrite",
      "Tendinopathies et epicondylites",
      "Douleurs du rachis",
    ],
    indications: [
      "Lombalgie chronique",
      "Nervalgie sciatique",
      "Cervicalgie et torticolis",
      "Arthrose du genou ou de la hanche",
    ],
    techniques: [
      "MassothÃ©rapie transverse profonde",
      "Mobilisation articulaire douce",
      "ThÃ©rapie manuelle",
      "Injections de PRP (partenariat)",
    ],
    duration: "45 min / sÃ©ance",
  },
  {
    id: "neurologie",
    icon: Brain,
    title: "Neurologie",
    short: "RÃ©Ã©ducation neurologique sur mesure",
    category: "Neuro & Ã‰quilibre",
    description:
      "Accompagnement des patients atteints de pathologies neurologiques pour favoriser la plasticitÃ© cÃ©rÃ©brale et l'autonomie fonctionnelle.",
    points: [
      "Post-AVC (hÃ©miplÃ©gie)",
      "Maladie de Parkinson",
      "SclÃ©rose en plaques",
      "RÃ©Ã©ducation de la marche et de l'Ã©quilibre",
    ],
    indications: [
      "Suites d'accident vasculaire cÃ©rÃ©bral",
      "Maladie de Parkinson",
      "SclÃ©rose en plaques",
      "Troubles de l'Ã©quilibre",
    ],
    techniques: [
      "MÃ©thode Bobath",
      "RÃ©Ã©ducation de la marche",
      "Stimulation proprioceptive",
      "Travail de la prÃ©hension",
    ],
    duration: "60 min / sÃ©ance",
  },
  {
    id: "respiratoire",
    icon: Waves,
    title: "KinÃ©sithÃ©rapie respiratoire",
    short: "AmÃ©liorer la fonction respiratoire",
    category: "Respiratoire & PÃ©diatrie",
    description:
      "Techniques manuelles et instrumentales pour libÃ©rer les voies respiratoires et amÃ©liorer la capacitÃ© pulmonaire, enfants et adultes.",
    points: [
      "Bronchite et encombrement",
      "Asthme et BPCO",
      "Post-opÃ©ratoire thoracique",
      "Drainage bronchique",
    ],
    indications: [
      "Encombrement bronchique",
      "Asthme sÃ©vÃ¨re",
      "BPCO (bronchopneumopathie chronique)",
      "Post-opÃ©ratoire thoracique",
    ],
    techniques: [
      "Drainage bronchique manuel",
      "Augmentation du flux expiratoire",
      "DÃ©sencombrement instrumental",
      "RÃ©Ã©ducation Ã  l'effort",
    ],
    duration: "30â€“45 min / sÃ©ance",
  },
  {
    id: "pediatrie",
    icon: Baby,
    title: "KinÃ©sithÃ©rapie pÃ©diatrique",
    short: "Accompagnement bienveillant des enfants",
    category: "Respiratoire & PÃ©diatrie",
    description:
      "Soins adaptÃ©s aux nourrissons et enfants : plagiocÃ©phalie, retard moteur, troubles du dÃ©veloppement et affections respiratoires.",
    points: [
      "PlagiocÃ©phalie et torticolis congÃ©nital",
      "Retard d'acquisition motrice",
      "RÃ©Ã©ducation respiratoire du nourrisson",
      "Accompagnement des troubles posturaux",
    ],
    indications: [
      "PlagiocÃ©phalie du nourrisson",
      "Torticolis congÃ©nital",
      "Retard psychomoteur",
      "Bronchiolite du nourrisson",
    ],
    techniques: [
      "Mobilisation douce cervicale",
      "Stimulation sensorimotrice",
      "Drainage rhino-pharyngÃ©",
      "Conseils aux parents",
    ],
    duration: "30 min / sÃ©ance",
  },
  {
    id: "vestibulaire",
    icon: Activity,
    title: "RÃ©Ã©ducation vestibulaire",
    short: "Vertiges, Ã©quilibre et marche",
    category: "Neuro & Ã‰quilibre",
    description:
      "Prise en charge des vertiges, troubles de l'Ã©quilibre et des chutes par protocoles de rÃ©habilitation vestibulaire personnalisÃ©s.",
    points: [
      "Vertiges positionnels (VPPB)",
      "Troubles de l'Ã©quilibre",
      "PrÃ©vention des chutes (sÃ©nior)",
      "RÃ©Ã©ducation oculomotrice",
    ],
    indications: [
      "Vertige positionnel paroxystique",
      "InstabilitÃ© posturale",
      "Risque de chute chez le senior",
      "Post-commotion cÃ©rÃ©brale",
    ],
    techniques: [
      "ManÅ“uvre d'Epley",
      "RÃ©Ã©ducation oculomotrice",
      "Plateforme de posturographie",
      "Programme de marche adaptÃ©",
    ],
    duration: "45 min / sÃ©ance",
  },
  {
    id: "pÃ©rinÃ©ologie",
    icon: Footprints,
    title: "PÃ©rinÃ©ologie & SantÃ© femme",
    short: "RÃ©Ã©ducation pÃ©rinÃ©ale et abdominale",
    category: "SantÃ© femme",
    description:
      "RÃ©Ã©ducation postnatale et prise en charge des troubles pÃ©rinÃ©aux et abdominaux, dans le respect et l'Ã©coute de chaque femme.",
    points: [
      "RÃ©Ã©ducation pÃ©rinÃ©ale post-natale",
      "Incontinence urinaire",
      "Diastasis des muscles abdominaux",
      "Syndrome de Maigne",
    ],
    indications: [
      "Suites d'accouchement",
      "Incontinence urinaire d'effort",
      "Diastasis des grands droits",
      "Douleurs pelviennes chroniques",
    ],
    techniques: [
      "Biofeedback pÃ©rinÃ©al",
      "RÃ©Ã©ducation par sonde",
      "Renforcement du transverse",
      "Hypopressifs",
    ],
    duration: "45 min / sÃ©ance",
  },
];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  initials: string;
  photo: string;
};

export const team: TeamMember[] = [
  {
    id: "youssef",
    name: "Dr. Youssef Doumi",
    role: "KinÃ©sithÃ©rapeute-ostÃ©opathe Â· Fondateur",
    specialties: ["Traumatologie", "Sport", "OstÃ©opathie"],
    bio: "DiplÃ´mÃ© de l'Institut de KinÃ©sithÃ©rapie, Youssef a exercÃ© en milieu hospitalier avant de fonder Doumi Physio. PassionnÃ© par la mÃ©canique du corps, il conjugue technique et Ã©coute.",
    initials: "YD",
    photo: "/images/team/youssef.png",
  },
  {
    id: "sara",
    name: "Sara Benali",
    role: "KinÃ©sithÃ©rapeute Â· RÃ©fÃ©rente sport",
    specialties: ["Sport", "RÃ©cupÃ©ration", "Bilan isocinÃ©tique"],
    bio: "Ancienne athlÃ¨te, Sara accompagne les sportifs de tous niveaux. Sa mÃ©thode associe prÃ©vention, renforcement et rÃ©cupÃ©ration active.",
    initials: "SB",
    photo: "/images/team/sara.png",
  },
  {
    id: "imane",
    name: "Imane Tahiri",
    role: "KinÃ©sithÃ©rapeute Â· PÃ©rinÃ©ologie & pÃ©diatrie",
    specialties: ["SantÃ© femme", "PÃ©diatrie", "Respiratoire"],
    bio: "SpÃ©cialisÃ©e en rÃ©Ã©ducation pÃ©rinÃ©ale et pÃ©diatrique, Imane apporte une approche douce et respectueuse, particuliÃ¨rement en post-partum.",
    initials: "IT",
    photo: "/images/team/imane.png",
  },
  {
    id: "karim",
    name: "Karim Alaoui",
    role: "KinÃ©sithÃ©rapeute Â· Neurologie & vestibulaire",
    specialties: ["Neurologie", "Ã‰quilibre", "Post-AVC"],
    bio: "Karim consacre sa pratique Ã  la rÃ©Ã©ducation neurologique et vestibulaire. Il aide ses patients Ã  retrouver autonomie et confiance.",
    initials: "KA",
    photo: "/images/team/karim.png",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  context: string;
  quote: string;
  rating: number;
  service?: ServiceCategory;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Nadia M.",
    context: "RÃ©Ã©ducation Ã©paule post-opÃ©ratoire",
    quote:
      "AprÃ¨s mon opÃ©ration de la coiffe des rotateurs, l'Ã©quipe m'a accompagnÃ©e avec patience et professionnalisme. Aujourd'hui je retrouve toute ma mobilitÃ©. Merci infiniment.",
    rating: 5,
    service: "Traumatologie & Sport",
  },
  {
    id: "t2",
    name: "Rachid B.",
    context: "PrÃ©paration marathon",
    quote:
      "Sara a suivi ma prÃ©paration au marathon. Les sÃ©ances de rÃ©cupÃ©ration et les conseils m'ont permis de finir sans blessure. Un accompagnement vraiment sur-mesure.",
    rating: 5,
    service: "Traumatologie & Sport",
  },
  {
    id: "t3",
    name: "Lalla F.",
    context: "RÃ©Ã©ducation pÃ©rinÃ©ale post-natale",
    quote:
      "Un grand merci Ã  Imane pour sa douceur et son Ã©coute. La rÃ©Ã©ducation post-natale s'est faite dans le respect de mon corps. Je recommande Ã  toutes les jeunes mamans.",
    rating: 5,
    service: "SantÃ© femme",
  },
  {
    id: "t4",
    name: "Hassan A.",
    context: "Lombalgie chronique",
    quote:
      "AprÃ¨s des annÃ©es de douleurs au dos, le protocole proposÃ© par le Dr. Doumi a changÃ© ma vie. Je reviens chaque mois pour un entretien. Une Ã©quipe formidable.",
    rating: 5,
    service: "Douleurs chroniques",
  },
  {
    id: "t5",
    name: "Salma E.",
    context: "RÃ©Ã©ducation post-AVC",
    quote:
      "Le parcours de mon pÃ¨re aprÃ¨s son AVC a Ã©tÃ© remarquable. Karim a su trouver les mots justes et les bons exercices. On ne vous remerciera jamais assez.",
    rating: 5,
    service: "Neuro & Ã‰quilibre",
  },
];

export type PricingPlan = {
  id: string;
  label: string;
  duration: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
};

export const pricing: PricingPlan[] = [
  {
    id: "consultation",
    label: "Consultation simple",
    duration: "â‰ˆ 30 min",
    price: "250 MAD",
    description: "SÃ©ance de soins ciblÃ©e pour un suivi rÃ©gulier.",
    features: [
      "Soins ciblÃ©s sur une zone",
      "Conseils d'auto-exercices",
      "Suivi de l'Ã©volution",
    ],
  },
  {
    id: "seance",
    label: "SÃ©ance complÃ¨te",
    duration: "â‰ˆ 45â€“60 min",
    price: "350 MAD",
    description: "SÃ©ance complÃ¨te de rÃ©Ã©ducation avec bilan.",
    features: [
      "Bilan articulaire et musculaire",
      "Travail actif et passif",
      "Plan de traitement personnalisÃ©",
      "Conseils ergonomiques",
    ],
    highlight: true,
  },
  {
    id: "bilan",
    label: "Bilan & protocole",
    duration: "â‰ˆ 75 min",
    price: "500 MAD",
    description: "Bilan approcli + protocole sur plusieurs semaines.",
    features: [
      "Bilan isocinÃ©tique complet",
      "Protocole de rÃ©Ã©ducation dÃ©taillÃ©",
      "Coordination avec le mÃ©decin",
      "Suivi de progression mensuel",
    ],
  },
];

export type FaqItem = {
  q: string;
  a: string;
};

export const faq: FaqItem[] = [
  {
    q: "Comment prendre rendez-vous ?",
    a: "Vous pouvez rÃ©server directement en ligne via le formulaire de prise de rendez-vous, par tÃ©lÃ©phone au 06 49 78 60 68, ou en vous prÃ©sentant au cabinet. Un accusÃ© de rÃ©ception vous est envoyÃ© sous 24h ouvrÃ©es.",
  },
  {
    q: "Faut-il une ordonnance mÃ©dicale ?",
    a: "Pour les soins remboursÃ©s par l'assurance maladie, une ordonnance de votre mÃ©decin est requise. Pour les sÃ©ances de bien-Ãªtre ou de prÃ©vention, vous pouvez venir sans ordonnance.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous ?",
    a: "Nous acceptons les espÃ¨ces, les cartes bancaires, les chÃ¨ques ainsi que les virements. Des facilitÃ©s de paiement peuvent Ãªtre accordÃ©es pour les protocoles longs.",
  },
  {
    q: "Combien de temps dure une sÃ©ance ?",
    a: "Une consultation dure environ 30 minutes, une sÃ©ance complÃ¨te 45 Ã  60 minutes, et un bilan approfondi 75 minutes. La durÃ©e est adaptÃ©e Ã  votre pathologie.",
  },
  {
    q: "Proposez-vous des soins Ã  domicile ?",
    a: "Oui, pour les patients Ã  mobilitÃ© rÃ©duite ou en post-opÃ©ratoire rÃ©cent, nous proposons des sÃ©ances Ã  domicile dans le secteur de Douars. Contactez-nous pour vÃ©rifier la zone couverte.",
  },
  {
    q: "Quels dÃ©lais pour un rendez-vous ?",
    a: "Pour les cas urgents (post-opÃ©ratoire, douleur aiguÃ«), nous gardons des crÃ©neaux quotidiens. Sinon, comptez en moyenne 2 Ã  5 jours pour un premier rendez-vous.",
  },
];

export type HourEntry = {
  day: string;
  hours: string;
  closed?: boolean;
};

export const openingHours: HourEntry[] = [
  { day: "Lundi", hours: "08:30 â€“ 19:00" },
  { day: "Mardi", hours: "08:30 â€“ 19:00" },
  { day: "Mercredi", hours: "08:30 â€“ 19:00" },
  { day: "Jeudi", hours: "08:30 â€“ 19:00" },
  { day: "Vendredi", hours: "08:30 â€“ 12:00" },
  { day: "Samedi", hours: "09:00 â€“ 14:00" },
  { day: "Dimanche", hours: "FermÃ©", closed: true },
];

export const cabinetInfo = {
  name: "Doumi Physio",
  subtitle: "Centre mÃ©dical",
  tagline: "La kinÃ©sithÃ©rapie au service de votre mouvement.",
  phone: "+212 6 49 78 60 68",
  phoneHref: "+212649786068",
  email: "contact@doumiphysio.ma",
  address: "12, Rue des Oliviers, Quartier MaÃ¢mora",
  city: "14000 Douars, Maroc",
  mapUrl: "https://maps.google.com/?q=Douars",
  emergency: "Urgences post-opÃ©ratoires : 7j/7 sur rendez-vous",
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  },
};

export const stats = [
  { label: "Patients accompagnÃ©s", value: "12 000+" },
  { label: "AnnÃ©es d'expÃ©rience", value: "15" },
  { label: "Praticiens diplÃ´mÃ©s", value: "4" },
  { label: "Satisfaction patient", value: "98%" },
];

export type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const features: Feature[] = [
  {
    icon: Award,
    title: "Praticiens diplÃ´mÃ©s",
    desc: "Une Ã©quipe formÃ©e en milieu hospitalier, en formation continue permanente, Ã  jour des protocoles les plus rÃ©cents.",
  },
  {
    icon: Microscope,
    title: "Ã‰quipement de pointe",
    desc: "Biodex, Ã©lectrothÃ©rapie, ondes de choc, pressothÃ©rapie, plateforme de posturographie : un plateau technique complet.",
  },
  {
    icon: Clock,
    title: "DisponibilitÃ© & urgences",
    desc: "CrÃ©neaux quotidiens pour les cas urgents, suivi post-opÃ©ratoire 7j/7 sur rendez-vous, dossier mÃ©dical centralisÃ©.",
  },
  {
    icon: HeartHandshake,
    title: "Approche humaine",
    desc: "Une Ã©coute sincÃ¨re, un protocole construit avec vous, le temps qu'il faut â€” jamais de rendez-vous Ã  la chaÃ®ne.",
  },
  {
    icon: ShieldCheck,
    title: "ConventionnÃ© & remboursÃ©",
    desc: "Cabinet conventionnÃ©. DÃ©livrance d'une feuille de soins dÃ©taillÃ©e Ã  chaque sÃ©ance pour votre mutuelle.",
  },
  {
    icon: CalendarClock,
    title: "Rendez-vous en ligne",
    desc: "RÃ©servez en quelques clics, 24h/24. Confirmation sous 24h ouvrÃ©es par notre secrÃ©tariat.",
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  category: "Cabinet" | "Soins" | "Ã‰quipement";
};

export const gallery: GalleryImage[] = [
  {
    src: "/images/clinic-interior.png",
    alt: "Salle de rÃ©Ã©ducation principale du cabinet Doumi Physio",
    caption: "Salle de rÃ©Ã©ducation principale",
    category: "Cabinet",
  },
  {
    src: "/images/manual-therapy.png",
    alt: "SÃ©ance de thÃ©rapie manuelle au cabinet",
    caption: "ThÃ©rapie manuelle",
    category: "Soins",
  },
  {
    src: "/images/rehab-sport.png",
    alt: "RÃ©Ã©ducation sportive avec Ã©lastique",
    caption: "RÃ©Ã©ducation sportive",
    category: "Soins",
  },
  {
    src: "/images/hero-physio.png",
    alt: "Praticien au travail avec un patient",
    caption: "Accompagnement personnalisÃ©",
    category: "Soins",
  },
  {
    src: "/images/abstract-bg.png",
    alt: "Espace bien-Ãªtre du cabinet",
    caption: "Espace bien-Ãªtre",
    category: "Cabinet",
  },
];

export type Conseil = {
  id: string;
  title: string;
  excerpt: string;
  category: "Dos" | "Sport" | "Posture" | "Bien-Ãªtre";
  readTime: string;
  date: string;
  emoji: string;
};

export const conseils: Conseil[] = [
  {
    id: "lombalgie",
    title: "Lombalgie : 5 exercices Ã  faire chez soi",
    excerpt:
      "Des mouvements simples et sÃ»rs pour soulager le bas du dos au quotidien et prÃ©venir les rÃ©cidives.",
    category: "Dos",
    readTime: "4 min",
    date: "12 sept. 2025",
    emoji: "ðŸ§",
  },
  {
    id: "etirement",
    title: "Ã‰tirements post-sport : le bon timing",
    excerpt:
      "Quand s'Ã©tirer, comment, et combien de temps ? On fait le point pour une rÃ©cupÃ©ration optimale.",
    category: "Sport",
    readTime: "3 min",
    date: "5 sept. 2025",
    emoji: "ðŸƒ",
  },
  {
    id: "posture-teletravail",
    title: "TÃ©lÃ©travail : adopter la bonne posture",
    excerpt:
      "Ã‰cran, chaise, clavier : nos conseils ergonomiques pour prÃ©venir cervicalgies et tendinites.",
    category: "Posture",
    readTime: "5 min",
    date: "28 aoÃ»t 2025",
    emoji: "ðŸ’»",
  },
  {
    id: "hydration",
    title: "Hydratation et rÃ©cupÃ©ration musculaire",
    excerpt:
      "Pourquoi l'eau joue un rÃ´le clÃ© dans la prÃ©vention des crampes et la rÃ©cupÃ©ration aprÃ¨s l'effort.",
    category: "Bien-Ãªtre",
    readTime: "3 min",
    date: "20 aoÃ»t 2025",
    emoji: "ðŸ’§",
  },
];

export type Badge = {
  label: string;
  icon: LucideIcon;
};

export const certifications: Badge[] = [
  { label: "ConventionnÃ© CNSS", icon: ShieldCheck },
  { label: "Formation continue", icon: Award },
  { label: "Plateau technique Biodex", icon: Microscope },
  { label: "Plus de 12 000 patients", icon: Users },
];

export type PatientInfoCard = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  items: string[];
};

export const patientInfo: PatientInfoCard[] = [
  {
    id: "first-visit",
    icon: ClipboardList,
    title: "PremiÃ¨re visite",
    desc: "Comment se dÃ©roule votre premiÃ¨re sÃ©ance.",
    items: [
      "Apportez votre ordonnance (si vous en avez une)",
      "Tenue souple et confortable conseillÃ©e",
      "Arriveez 5 minutes en avance pour le dossier",
      "Bilan initial d'environ 45 Ã  60 minutes",
    ],
  },
  {
    id: "what-to-bring",
    icon: PackageCheck,
    title: "Ã€ apporter",
    desc: "Les documents utiles pour votre rendez-vous.",
    items: [
      "Ordonnance mÃ©dicale rÃ©cente",
      "Imagerie (radio, IRM, scanner) si concernÃ©e",
      "Carte d'identitÃ© et carte vitale / mutuelle",
      "Carnet de soins si vous en avez un",
    ],
  },
  {
    id: "insurance",
    icon: ShieldCheck,
    title: "Prise en charge",
    desc: "ConventionnÃ© et remboursÃ© par l'assurance maladie.",
    items: [
      "ConventionnÃ© CNSS et principales mutuelles",
      "Facture dÃ©taillÃ©e remise Ã  chaque sÃ©ance",
      "Tiers payant possible selon conventions",
      "Devis personnalisÃ© pour les protocoles longs",
    ],
  },
  {
    id: "domicile",
    icon: HomeIcon,
    title: "Soins Ã  domicile",
    desc: "Pour les patients Ã  mobilitÃ© rÃ©duite.",
    items: [
      "Secteur couvert : Douars et alentours (10 km)",
      "IdÃ©alement post-opÃ©ratoire rÃ©cent ou seniors",
      "Sur prescription mÃ©dicale uniquement",
      "Tarification majorÃ©e selon distance",
    ],
  },
];

export type Partner = {
  name: string;
  short: string;
  category: "Assurance" | "Mutuelle" | "Institutionnel";
};

export const partners: Partner[] = [
  { name: "CNSS", short: "Caisse Nationale de SÃ©curitÃ© Sociale", category: "Institutionnel" },
  { name: "CNOPS", short: "Caisse Nationale des Organismes de PrÃ©voyance Sociale", category: "Institutionnel" },
  { name: "Wafa Assurance", short: "Assurance santÃ© & prÃ©voyance", category: "Assurance" },
  { name: "AXA Assurance Maroc", short: "Assurance santÃ© individuelle & entreprise", category: "Assurance" },
  { name: "RMA Watanya", short: "Assurance santÃ© & accidents", category: "Assurance" },
  { name: "Sanlam Maroc", short: "Mutuelle santÃ© & prÃ©voyance", category: "Mutuelle" },
];

export type AccessInfo = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  details: string[];
};

export const accessInfo: AccessInfo[] = [
  {
    id: "pmr",
    icon: Accessibility,
    title: "AccÃ¨s PMR",
    desc: "Le cabinet est entiÃ¨rement accessible aux personnes Ã  mobilitÃ© rÃ©duite.",
    details: [
      "EntrÃ©e de plain-pied, sans marche",
      "Largeur de passage â‰¥ 90 cm",
      "Salle de soins au rez-de-chaussÃ©e",
      "Toilettes adaptÃ©es",
    ],
  },
  {
    id: "parking",
    icon: Car,
    title: "Stationnement",
    desc: "Parking gratuit et places PMR Ã  proximitÃ© immÃ©diate.",
    details: [
      "2 places PMR devant le cabinet",
      "Parking public Ã  50 m (gratuit 2h)",
      "AccÃ¨s dÃ©pose-minute possible",
      "VÃ©los : arceaux sÃ©curisÃ©s",
    ],
  },
  {
    id: "transport",
    icon: Bus,
    title: "Transports",
    desc: "Desservi par les bus et taxis de Douars.",
    details: [
      "ArrÃªt de bus Ã  100 m (lignes 7 et 12)",
      "Gare routiÃ¨re Ã  10 min Ã  pied",
      "Taxis : station Ã  200 m",
      "Navette aÃ©roport Ã  15 min",
    ],
  },
  {
    id: "accessibility",
    icon: Ear,
    title: "SensibilitÃ©",
    desc: "Accueil adaptÃ© aux patients malentendants ou en situation de handicap.",
    details: [
      "Personnel formÃ© Ã  la LSF (bases)",
      "Documents en gros caractÃ¨res",
      "Ã‰clairage calme, sans scintillement",
      "Accompagnement tiers bienvenu",
    ],
  },
];
