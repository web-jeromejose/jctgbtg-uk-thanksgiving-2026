import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarPlus, Clock, MapPin, Share2, Navigation, Heart, Music, HandHeart, Users } from "lucide-react";
import hero from "@/assets/worship-hero.jpg";
import logo from "@/assets/jctgbtg-banner.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thanksgiving Service 2026 — JCTGBTG UK" },
      { name: "description", content: "Join Jesus Christ To God Be The Glory UK for our Thanksgiving Service on Saturday 5 December 2026, 11 AM at Westway Sports Centre, W10 6RP." },
      { property: "og:title", content: "Thanksgiving Service 2026 — JCTGBTG UK" },
      { property: "og:description", content: "Saturday 5 December 2026 · 11 AM onwards · Westway Sports Centre, W10 6RP. You're invited!" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EVENT = new Date("2026-12-05T11:00:00Z"); // London is UTC+0 in December
const VENUE = "Westway Sports Centre, 1 Crowthorne Rd, London W10 6RP";
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE)}`;

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = now === null ? 0 : Math.max(0, EVENT.getTime() - now);
  return {
    ready: now !== null,
    days: Math.floor(diff / 864e5),
    hours: Math.floor((diff / 36e5) % 24),
    mins: Math.floor((diff / 6e4) % 60),
    secs: Math.floor((diff / 1e3) % 60),
  };
}

function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//JCTGBTG UK//EN", "BEGIN:VEVENT",
    "UID:thanksgiving-2026@jctgbtg", "DTSTAMP:20261101T000000Z",
    "DTSTART:20261205T110000Z", "DTEND:20261205T150000Z",
    "SUMMARY:Thanksgiving Service — JCTGBTG UK",
    `LOCATION:${VENUE.replace(/,/g, "\\,")}`,
    "DESCRIPTION:Come together in gratitude for everything God has done.",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = "thanksgiving-2026.ics";
  a.click();
}

const programme = [
  { icon: Music, title: "Praise & Worship", text: "Lift up joyful songs to the Lord who never fails us." },
  { icon: HandHeart, title: "Thanksgiving Offering", text: "Bring your testimony and gratitude before God." },
  { icon: Heart, title: "The Word", text: "A message of grace and favour for the year ahead." },
  { icon: Users, title: "Fellowship", text: "Celebrate together as one family in Christ." },
];

function Index() {
  const c = useCountdown();
  const [copied, setCopied] = useState(false);
  const [praised, setPraised] = useState(0);

  async function share() {
    const data = { title: "Thanksgiving Service — JCTGBTG UK", text: "Join us Sat 5 Dec 2026, 11 AM at Westway Sports Centre W10 6RP!", url: window.location.href };
    if (navigator.share) { try { await navigator.share(data); } catch { /* cancelled */ } }
    else { await navigator.clipboard.writeText(`${data.text} ${data.url}`); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  }

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-5 py-16 text-center">
        <img src={hero} alt="Worshippers raising hands in golden light" width={1280} height={1600} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ember-fade" />
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="absolute h-1.5 w-1.5 rounded-full bg-primary animate-floaty shadow-glow"
            style={{ left: `${(i * 37) % 100}%`, top: `${20 + ((i * 53) % 60)}%`, animationDelay: `${i * 0.4}s` }} />
        ))}
        <div className="relative z-10 flex flex-col items-center">
          <img src={logo.url} alt="Jesus Christ To God Be The Glory" className="w-72 sm:w-[28rem] rounded-xl bg-paper p-3 shadow-glow animate-rise" />
          <p className="mt-8 text-xs sm:text-sm uppercase tracking-[0.4em] text-primary animate-rise" style={{ animationDelay: ".15s" }}>You're invited</p>
          <h1 className="font-display mt-3 text-6xl sm:text-8xl md:text-9xl font-light leading-[0.9] animate-rise" style={{ animationDelay: ".3s" }}>
            Thanks<br /><span className="italic font-semibold text-gold">giving</span>
          </h1>
          <p className="mt-3 tracking-[0.5em] text-lg sm:text-2xl font-light animate-rise" style={{ animationDelay: ".45s" }}>SERVICE</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 animate-rise" style={{ animationDelay: ".6s" }}>
            <span className="rounded-full border border-border bg-background/50 backdrop-blur px-5 py-2 font-semibold">Sat 5 December 2026</span>
            <span className="rounded-full border border-border bg-background/50 backdrop-blur px-5 py-2 font-semibold">11 AM Onwards</span>
          </div>
          <a href="#details" className="mt-10 rounded-full bg-gold px-8 py-4 font-extrabold text-primary-foreground shadow-glow transition hover:scale-105 active:scale-95">
            Join the celebration
          </a>
        </div>
      </section>

      {/* Countdown */}
      <section className="px-5 py-16 bg-muted">
        <p className="text-center text-sm uppercase tracking-[0.3em] text-muted-foreground">Counting down to glory</p>
        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-4 gap-2 sm:gap-4">
          {([["Days", c.days], ["Hours", c.hours], ["Mins", c.mins], ["Secs", c.secs]] as const).map(([l, v]) => (
            <div key={l} className="rounded-2xl border border-border bg-background p-3 sm:p-6 text-center">
              <div className="font-display text-3xl sm:text-5xl font-semibold text-gold tabular-nums">{c.ready ? String(v).padStart(2, "0") : "--"}</div>
              <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Details card */}
      <section id="details" className="px-5 py-20">
        <div className="torn mx-auto max-w-3xl bg-paper text-card-foreground px-6 py-14 sm:px-14 text-center">
          <h2 className="font-display text-4xl sm:text-5xl">Come with a grateful heart</h2>
          <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-relaxed">
            Let's come together in gratitude for everything <b>God</b> has done. May His grace and favour overflow in our <b>lives today, tomorrow, and always.</b>
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 text-left">
            <div className="torn bg-ember text-secondary-foreground p-6 flex gap-4 items-center">
              <Clock className="h-8 w-8 shrink-0 text-primary" />
              <div><div className="font-extrabold text-lg">Saturday 5th December 2026</div><div className="opacity-80">11 AM onwards</div></div>
            </div>
            <div className="torn bg-ember text-secondary-foreground p-6 flex gap-4 items-center">
              <MapPin className="h-8 w-8 shrink-0 text-primary" />
              <div><div className="font-extrabold text-lg">Westway Sports Centre</div><div className="opacity-80">London W10 6RP</div></div>
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <button onClick={downloadIcs} className="flex items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 font-semibold text-secondary-foreground transition hover:scale-105 active:scale-95"><CalendarPlus className="h-5 w-5" />Add to calendar</button>
            <a href={MAPS} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 font-semibold text-secondary-foreground transition hover:scale-105 active:scale-95"><Navigation className="h-5 w-5" />Get directions</a>
            <button onClick={share} className="flex items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 font-semibold text-secondary-foreground transition hover:scale-105 active:scale-95"><Share2 className="h-5 w-5" />{copied ? "Link copied!" : "Invite a friend"}</button>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="px-5 pb-20">
        <h2 className="font-display text-center text-4xl sm:text-5xl">A day of <span className="italic text-gold">celebration</span></h2>
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programme.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group rounded-2xl border border-border bg-muted p-6 transition hover:-translate-y-1 hover:shadow-glow">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gold text-primary-foreground transition group-hover:rotate-12"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-4 font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border">
          <iframe title="Westway Sports Centre map" src={`https://maps.google.com/maps?q=${encodeURIComponent(VENUE)}&z=15&output=embed`} className="h-72 sm:h-96 w-full" loading="lazy" />
        </div>
      </section>

      {/* Praise */}
      <section className="px-5 pb-24 text-center">
        <p className="font-display text-3xl sm:text-4xl italic">"Give thanks to the Lord, for He is good."</p>
        <p className="mt-2 text-sm text-muted-foreground">Psalm 107:1</p>
        <button onClick={() => setPraised((p) => p + 1)} className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground active:scale-90">
          🙌 Give thanks {praised > 0 && <span className="tabular-nums">· {praised}</span>}
        </button>
      </section>

      <footer className="border-t border-border px-5 py-8 text-center text-sm text-muted-foreground">
        <img src={logo.url} alt="Jesus Christ To God Be The Glory, London" loading="lazy" className="mx-auto mb-4 w-64 rounded-lg bg-paper p-2" />
        <p className="font-semibold text-foreground">Jesus Christ To God Be The Glory, Satellite Church UK</p>
        <p className="mt-2 text-primary">#JCTGBTGUK #JCtGbtgMain #JCTGBTG</p>
      </footer>
    </main>
  );
}
