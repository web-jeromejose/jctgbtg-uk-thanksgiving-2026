import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Facebook, Footprints, CalendarPlus, Clock, MapPin, Share2, Navigation, Heart, Music, HandHeart, Users } from "lucide-react";
import hero from "@/assets/worship-hero.jpg";
import fam1 from "@/assets/church_family_photo_1.jpg.asset.json";
import fam2 from "@/assets/church_family_photo_2.jpg.asset.json";
import logo from "@/assets/jctgbtg-banner.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Heart of Thanksgiving — Thanksgiving Service 2026, JCTGBTG UK" },
      { name: "description", content: "A Heart of Thanksgiving: remembering His goodness, celebrating His faithfulness. Join Jesus Christ To God Be The Glory UK on Sunday 6 December 2026, 11 AM at Westway Sports Centre, W10 6RP." },
      { property: "og:title", content: "A Heart of Thanksgiving — Thanksgiving Service 2026, JCTGBTG UK" },
      { property: "og:description", content: "Remembering His Goodness, Celebrating His Faithfulness. Sunday 6 December 2026 · 11 AM onwards · Westway Sports Centre, W10 6RP. You're invited!" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EVENT = new Date("2026-12-06T11:00:00Z"); // London is UTC+0 in December
const VENUE = "Westway Sports Centre, W10 6RP";
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
    "DTSTART:20261206T110000Z", "DTEND:20261206T150000Z",
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

function Countdown() {
  const c = useCountdown();
  return (
    <section className="px-5 py-20 sm:py-28 bg-muted">
        <p className="text-center text-base sm:text-xl font-semibold uppercase tracking-[0.35em] text-muted-foreground">Counting down to glory</p>
        <div className="mx-auto mt-3 h-px w-24 bg-gold/50" />
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-5">
          {([["Days", c.days], ["Hours", c.hours], ["Mins", c.mins], ["Secs", c.secs]] as const).map(([l, v]) => (
            <div key={l} className="rounded-3xl border border-border bg-background px-3 py-8 text-center shadow-glow sm:px-6 sm:py-12">
              <div className="font-display text-6xl leading-none text-gold tabular-nums sm:text-7xl md:text-8xl">{c.ready ? String(v).padStart(2, "0") : "--"}</div>
              <div className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground sm:mt-5 sm:text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>
  );
}

function Index() {
  const [copied, setCopied] = useState(false);
  const [praised, setPraised] = useState(0);

  async function share() {
    const data = { title: "Thanksgiving Service — JCTGBTG UK", text: "Kapatid, tara na! Join us Sun 6 Dec 2026, 11 AM at Westway Sports Centre W10 6RP!", url: window.location.href };
    if (navigator.share) { try { await navigator.share(data); } catch { /* cancelled */ } }
    else { await navigator.clipboard.writeText(`${data.text} ${data.url}`); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  }

  return (
    <main className="overflow-x-clip">
      {/* Hero */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-5 py-16 text-center overflow-hidden">
        <img src={hero} alt="Worshippers raising hands in golden light" width={1280} height={1600} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ember-fade" />
        <div className="relative z-10 flex flex-col items-center">
          <img src={logo.url} alt="Jesus Christ To God Be The Glory" className="w-72 sm:w-[28rem] rounded-xl bg-paper p-3 shadow-glow" />
          <p className="mt-8 text-xs sm:text-sm uppercase tracking-[0.4em] text-primary">Kapatid, you're invited!</p>
          <h1 className="font-display mt-3 text-5xl sm:text-7xl md:text-8xl leading-[0.95]">
            A Heart of<br /><span className="italic text-gold">Thanksgiving</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm sm:text-xl font-light italic leading-relaxed">Remembering His Goodness, Celebrating His Faithfulness</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full border border-border bg-background/50 px-5 py-2 font-semibold">Sun 6 December 2026</span>
            <span className="rounded-full border border-border bg-background/50 px-5 py-2 font-semibold">11 AM Onwards</span>
          </div>
          <a href="#details" className="mt-10 rounded-full bg-gold px-8 py-4 font-extrabold text-primary-foreground shadow-glow transition hover:scale-105 active:scale-95">
            Tara, join us!
          </a>
        </div>
      </section>

      <Countdown />

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
              <div><div className="font-extrabold text-lg">Sunday 6th December 2026</div><div className="opacity-80">11 AM onwards</div></div>
            </div>
            <div className="torn bg-ember text-secondary-foreground p-6 flex gap-4 items-center">
              <MapPin className="h-8 w-8 shrink-0 text-primary" />
              <div><div className="font-extrabold text-lg">Westway Sports Centre</div><div className="opacity-80">W10 6RP</div></div>
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <button onClick={downloadIcs} className="flex items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 font-semibold text-secondary-foreground transition hover:scale-105 active:scale-95"><CalendarPlus className="h-5 w-5" />Add to calendar</button>
            <a href={MAPS} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 font-semibold text-secondary-foreground transition hover:scale-105 active:scale-95"><Navigation className="h-5 w-5" />Get directions</a>
            <button onClick={share} className="flex items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 font-semibold text-secondary-foreground transition hover:scale-105 active:scale-95"><Share2 className="h-5 w-5" />{copied ? "Link copied!" : "Invite a friend"}</button>
          </div>
        </div>
      </section>

      {/* Taglish invitation */}
      <section className="px-5 pb-20 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Isang paanyaya</p>
        <h2 className="font-display mt-3 text-4xl sm:text-5xl">Halina't <span className="italic text-gold">magpasalamat</span> together!</h2>
        <div className="mx-auto mt-8 max-w-2xl space-y-4 text-base sm:text-lg leading-relaxed">
          <p>Mga kapatid, sobrang daming blessings ang binigay ni Lord this year — kaya let's come together as one family and give Him all the glory! 🙌</p>
          <p>Bring your family, friends, and buong barkada. Sama-sama tayong mag-worship, mag-celebrate, at mag-praise sa Panginoon na hindi tayo pinabayaan.</p>
          <p className="font-semibold text-primary">See you there, ha? Hindi kumpleto kung wala ka! 🤍✨</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {[fam1, fam2].map((f, i) => (
            <figure key={f.url} className={`overflow-hidden rounded-2xl border border-border shadow-glow transition duration-500 hover:scale-[1.02] ${i ? "sm:rotate-1" : "sm:-rotate-1"}`}>
              <img src={f.url} alt="Our JCTGBTG UK church family together at Westway Sports Centre" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </figure>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Ang ating church family 💛</p>
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

      {/* Getting here — TfL style */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-tfl-white text-tfl-ink shadow-glow">
          <div className="flex items-center gap-4 bg-tfl-blue px-5 py-4 text-tfl-white">
            <Roundel />
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">Getting here by</div>
              <div className="text-2xl sm:text-3xl font-extrabold">Underground</div>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <div className="flex items-center gap-3">
              <Roundel small />
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">Latimer Road</div>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-md border border-tfl-ink/15 px-3 py-2">
                <span className="h-3 w-10 shrink-0 rounded-sm bg-tube-circle" />
                <span className="font-bold">Circle line</span>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-tfl-ink/15 px-3 py-2">
                <span className="h-3 w-10 shrink-0 rounded-sm bg-tube-hc" />
                <span className="font-bold">Hammersmith &amp; City line</span>
              </div>
            </div>

            {/* Line diagram */}
            <ol className="relative mt-8 ml-3">
              <span className="absolute left-[7px] top-2 bottom-2 w-2 -translate-x-1/2 rounded bg-gradient-to-b from-tube-circle to-tube-hc" />
              {[
                ["Take the Tube", "Circle or Hammersmith & City line to Latimer Road."],
                ["Exit the station", "Leave Latimer Road station onto Bramley Road."],
                ["Westway Sports Centre", "About a 5 minute walk · W10 6RP"],
              ].map(([t, d], i, arr) => (
                <li key={t} className="relative flex gap-5 pb-7 last:pb-0">
                  <span className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-4 ${i === arr.length - 1 ? "border-tfl-red bg-tfl-white scale-150" : "border-tfl-ink bg-tfl-white"}`} />
                  <div className="min-w-0">
                    <div className="font-extrabold">{t}</div>
                    <div className="text-sm opacity-70">{d}</div>
                  </div>
                </li>
              ))}
            </ol>

            <a href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent("Latimer Road Station, London")}&destination=${encodeURIComponent(VENUE)}&travelmode=walking`} target="_blank" rel="noreferrer" className="mt-8 flex items-center justify-center gap-2 rounded-md bg-tfl-blue px-6 py-3 font-bold text-tfl-white transition hover:scale-[1.02] active:scale-95"><Footprints className="h-5 w-5" />Walking route from the station</a>
          </div>
        </div>
      </section>

      {/* Praise */}
      <section className="px-5 pb-24 text-center">
        <p className="font-display mx-auto max-w-3xl text-3xl leading-snug sm:text-4xl italic">"Let us worship God with thankful hearts, remembering all that He has done for us."</p>
        <div className="mx-auto mt-5 h-px w-24 bg-gold/50" />
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">Psalm 9:1 · Psalm 100:4 · Psalm 103:2</p>
        <button onClick={() => setPraised((p) => p + 1)} className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground active:scale-90">
          🙌 Give thanks {praised > 0 && <span className="tabular-nums">· {praised}</span>}
        </button>
      </section>

      <DailyVerse />

      {/* Worship music */}
      <section className="px-5 pb-24 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Praise & worship</p>
        <h2 className="font-display mt-3 text-4xl sm:text-5xl">Worship <span className="italic text-gold">with us</span></h2>
        <p className="mt-3 text-sm text-muted-foreground">Piano worship by Elevation Worship 🎹 — tap play if it doesn't start</p>
        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl border border-border shadow-glow">
          <iframe
            title="Elevation Worship piano playlist"
            id="worship-player"
            src="https://www.youtube.com/embed/wUU4E1HcCUw?list=RDwUU4E1HcCUw&autoplay=1&mute=1&playsinline=1&enablejsapi=1"
            onLoad={(e) => {
              const f = e.currentTarget;
              const cmd = (func: string) => f.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
              const unmute = () => { cmd("unMute"); cmd("setVolume"); cmd("playVideo"); ["pointerdown", "touchstart", "keydown"].forEach((ev) => window.removeEventListener(ev, unmute)); };
              ["pointerdown", "touchstart", "keydown"].forEach((ev) => window.addEventListener(ev, unmute, { passive: true }));
            }}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full"
          />
        </div>
      </section>

      {/* Map */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border">
          <iframe title="Westway Sports Centre map" src={`https://maps.google.com/maps?q=${encodeURIComponent(VENUE)}&z=15&output=embed`} className="pointer-events-none h-72 sm:h-96 w-full" tabIndex={-1} loading="lazy" />
        </div>
      </section>

      <footer className="border-t border-border px-5 py-8 text-center text-sm text-muted-foreground">
        <img src={logo.url} alt="Jesus Christ To God Be The Glory, London" loading="lazy" className="mx-auto mb-4 w-64 rounded-lg bg-paper p-2" />
        <p className="font-semibold text-foreground">Jesus Christ To God Be The Glory, Satellite Church UK</p>
        <a href="https://www.facebook.com/profile.php?id=100023070939887" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-105 active:scale-95"><Facebook className="h-5 w-5" />Message us on Facebook</a>
        <p className="mt-2 text-primary">#JCTGBTGUK #JCtGbtgMain #JCTGBTG</p>
      </footer>
    </main>
  );
}

const VERSES = [
  ["Give thanks to the Lord, for he is good; his love endures forever.", "Psalm 107:1"],
  ["I can do all this through him who gives me strength.", "Philippians 4:13"],
  ["Trust in the Lord with all your heart and lean not on your own understanding.", "Proverbs 3:5"],
  ["For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.", "Jeremiah 29:11"],
  ["The Lord is my shepherd, I lack nothing.", "Psalm 23:1"],
  ["Give thanks in all circumstances; for this is God's will for you in Christ Jesus.", "1 Thessalonians 5:18"],
  ["Be strong and courageous. Do not be afraid; the Lord your God will be with you wherever you go.", "Joshua 1:9"],
  ["Cast all your anxiety on him because he cares for you.", "1 Peter 5:7"],
  ["This is the day the Lord has made; let us rejoice and be glad in it.", "Psalm 118:24"],
  ["And we know that in all things God works for the good of those who love him.", "Romans 8:28"],
  ["Every good and perfect gift is from above.", "James 1:17"],
  ["The joy of the Lord is your strength.", "Nehemiah 8:10"],
] as const;

function DailyVerse() {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  useEffect(() => { setI(Math.floor(Date.now() / 864e5) % VERSES.length); }, []);
  const [text, ref] = VERSES[i] ?? VERSES[0];
  const go = (d: number) => setI((n) => (n + d + VERSES.length) % VERSES.length);
  async function copy() {
    await navigator.clipboard.writeText(`"${text}" — ${ref}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }
  return (
    <section className="px-5 pb-24">
      <div className="torn mx-auto max-w-3xl bg-paper px-6 py-14 text-center text-card-foreground sm:px-14">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-secondary">Verse of the day</p>
        <p className="mt-2 text-sm opacity-70">To help you grow in faith, araw-araw 🙏</p>
        <blockquote key={i} className="font-display mx-auto mt-8 max-w-xl text-2xl leading-snug sm:text-4xl animate-in fade-in duration-500">"{text}"</blockquote>
        <p className="mt-4 font-bold uppercase tracking-[0.2em] text-secondary">{ref}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => go(-1)} aria-label="Previous verse" className="rounded-full bg-ember px-5 py-3 font-semibold text-secondary-foreground transition hover:scale-105 active:scale-95">‹ Prev</button>
          <button onClick={() => setI(Math.floor(Math.random() * VERSES.length))} className="rounded-full bg-ember px-5 py-3 font-semibold text-secondary-foreground transition hover:scale-105 active:scale-95">✨ Surprise me</button>
          <button onClick={() => go(1)} aria-label="Next verse" className="rounded-full bg-ember px-5 py-3 font-semibold text-secondary-foreground transition hover:scale-105 active:scale-95">Next ›</button>
          <button onClick={copy} className="rounded-full bg-ember px-5 py-3 font-semibold text-secondary-foreground transition hover:scale-105 active:scale-95">{copied ? "Copied!" : "Copy verse"}</button>
        </div>
        <a href="https://godlovesme.lovable.app/" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-extrabold text-primary-foreground shadow-glow transition hover:scale-105 active:scale-95">
          <Heart className="h-5 w-5" />More daily verses — God Loves Me
        </a>
      </div>
    </section>
  );
}

function Roundel({ small = false }: { small?: boolean }) {
  const size = small ? "h-9 w-9 border-[6px]" : "h-12 w-12 border-[8px]";
  return (
    <span className={`relative grid ${size} shrink-0 place-items-center rounded-full border-tfl-red bg-tfl-white`}>
      <span className={`absolute ${small ? "h-2.5 -inset-x-2" : "h-3.5 -inset-x-3"} rounded-sm bg-tfl-blue`} />
    </span>
  );
}
