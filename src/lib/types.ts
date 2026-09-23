export type Asset = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Edition = {
  year: number;
  number: number;
  slogan?: string;
  startsAt?: string;
  endsAt?: string;
  venue: {
    name: string;
    campus: string;
    area: string;
    lat: number;
    lng: number;
    mapUrl?: string;
    transport: string[];
  };
  registrationUrl?: string;
  certificateUrl?: string;
  workshopRoom?: string;
  speakersTotal?: number;
  nextAnnouncementAt?: string;
  contact: { email?: string; instagram?: string };
};

export type SessionKind = "acilis" | "seminer" | "panel" | "workshop" | "ara";

export type Session = {
  id: string;
  day: number;
  startsAt: string;
  endsAt: string;
  title: string;
  kind: SessionKind;
  room?: string;
  speakerIds: string[];
  byline?: string;
};

export type Speaker = {
  id: string;
  name: string;
  title: string;
  company?: string;
  photo?: Asset;
  linkedin?: string;
  visible: boolean;
  order?: number;
};

export type SponsorTier = {
  id: string;
  name: string;
  order: number;
  size: "lg" | "md" | "sm";
};

export type Sponsor = {
  id: string;
  name: string;
  tierId: string;
  logo?: Asset;
  logoMono?: Asset;
  ratio: number;
  scale?: number;
  foyerNote?: string;
  url?: string;
};

export type Condition =
  | { type: "full_day"; day: number }
  | { type: "min_sessions"; count: number }
  | { type: "custom"; text: string };

export type Prize = {
  id: string;
  name: string;
  image?: Asset;
  sponsorId?: string;
  featured?: boolean;
  drawAt: string;
  conditions: Condition[];
};

export type Raffle = {
  enabled: boolean;
  closesAt?: string;
  baseConditions: string[];
  detailsUrl?: string;
  prizes: Prize[];
};

export type Faq = { q: string; a: string; order: number };

export type PastEdition = {
  year: number;
  dateLabel: string;
  note?: string;
  cover?: Asset;
  gallery?: Asset[];
};

export type Foyer = {
  standCount?: number;
  photo?: Asset;
};
