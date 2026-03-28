import { useState, useEffect, useRef } from "react";

const DOMAIN = "/__mockup";

const projects = [
  {
    id: "01",
    title: "Villa Residenziale",
    subtitle: "Treviso, 2023",
    category: "Residenziale",
    description: "Progettazione e direzione lavori di abitazione privata con integrazione paesaggistica e soluzioni bioclimatiche.",
    img: `${DOMAIN}/images/afa-project-1.png`,
    tags: ["Residenziale", "Nuova costruzione", "Sostenibilità"],
    area: "320 m²",
    year: "2023",
  },
  {
    id: "02",
    title: "Riqualificazione Edificio Pubblico",
    subtitle: "Venezia, 2022",
    category: "Pubblico",
    description: "Intervento di recupero e riqualificazione energetica su edificio storico nel centro urbano.",
    img: `${DOMAIN}/images/afa-project-2.png`,
    tags: ["Pubblico", "Riqualificazione", "Patrimonio"],
    area: "1.450 m²",
    year: "2022",
  },
  {
    id: "03",
    title: "Appartamento su Misura",
    subtitle: "Padova, 2023",
    category: "Interior",
    description: "Ristrutturazione completa con progettazione degli interni. Approccio tailor-made con il cliente.",
    img: `${DOMAIN}/images/afa-project-3.png`,
    tags: ["Interior", "Ristrutturazione", "Arredo"],
    area: "145 m²",
    year: "2023",
  },
  {
    id: "04",
    title: "Complesso Residenziale",
    subtitle: "Vicenza, 2021",
    category: "Residenziale",
    description: "Piano urbanistico e progettazione architettonica di complesso con 12 unità abitative.",
    img: `${DOMAIN}/images/afa-project-4.png`,
    tags: ["Residenziale", "Complesso", "Urbanistica"],
    area: "2.100 m²",
    year: "2021",
  },
  {
    id: "05",
    title: "Riconversione Industriale",
    subtitle: "Mestre, 2022",
    category: "Pubblico",
    description: "Trasformazione di capannone industriale in spazio polifunzionale per la comunità.",
    img: `${DOMAIN}/images/afa-project-5.png`,
    tags: ["Riconversione", "Pubblico", "Comunità"],
    area: "980 m²",
    year: "2022",
  },
];

const services = [
  {
    number: "01",
    title: "Progettazione Architettonica",
    desc: "Dalla idea preliminare alla progettazione esecutiva. Ogni spazio è pensato con rigore tecnico ed etico.",
  },
  {
    number: "02",
    title: "Direzione Lavori",
    desc: "Coordinamento e supervisione di cantiere. Garanzia di qualità, rispetto dei tempi e trasparenza economica.",
  },
  {
    number: "03",
    title: "Gestione Burocrazia",
    desc: "Gestione completa delle pratiche edilizie, catastali e delle autorizzazioni. Un unico referente per ogni fase.",
  },
  {
    number: "04",
    title: "Riqualificazione Energetica",
    desc: "Soluzioni progettuali orientate alla sostenibilità ambientale e all'efficienza energetica.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function HomePage() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        background: "#0f0e0d",
        color: "#e8e3dc",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 48px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(15,14,13,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(232,227,220,0.08)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "1.5px solid #c4a96a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.05em",
                color: "#c4a96a",
              }}
            >
              AFA
            </span>
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", color: "#e8e3dc" }}>
              A.FA ARCHITETTURA
            </div>
            <div style={{ fontSize: "9px", letterSpacing: "0.18em", color: "#7a7368", marginTop: "1px" }}>
              STUDIO DI ARCHITETTURA
            </div>
          </div>
        </div>

        {/* Desktop nav links */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            alignItems: "center",
          }}
        >
          {["Progetti", "Studio", "Servizi", "Contatti"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "#9a9289",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e8e3dc")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9a9289")}
            >
              {item.toUpperCase()}
            </a>
          ))}
          <a
            href="#contatti"
            style={{
              padding: "10px 24px",
              border: "1px solid #c4a96a",
              color: "#c4a96a",
              textDecoration: "none",
              fontSize: "10px",
              letterSpacing: "0.15em",
              fontWeight: 600,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#c4a96a";
              e.currentTarget.style.color = "#0f0e0d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#c4a96a";
            }}
          >
            INIZIA UN PROGETTO
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "700px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        {/* Hero image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${DOMAIN}/images/afa-hero.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Overlay gradients */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(15,14,13,0.85) 0%, rgba(15,14,13,0.4) 60%, rgba(15,14,13,0.1) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(15,14,13,1) 0%, rgba(15,14,13,0.5) 30%, transparent 60%)",
          }}
        />

        {/* Hero content */}
        <div style={{ position: "relative", padding: "0 48px 80px", width: "100%", maxWidth: "900px" }}>
          <div
            style={{
              display: "inline-block",
              border: "1px solid #c4a96a",
              padding: "5px 14px",
              marginBottom: "28px",
              fontSize: "9px",
              letterSpacing: "0.25em",
              color: "#c4a96a",
              fontWeight: 600,
            }}
          >
            STUDIO DI ARCHITETTURA · NORDEST ITALIA
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(52px, 7vw, 96px)",
              fontWeight: 400,
              lineHeight: 1.05,
              color: "#e8e3dc",
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
            }}
          >
            Architettura come
            <br />
            <em style={{ color: "#c4a96a", fontStyle: "italic" }}>responsabilità</em>
            <br />
            tecnica ed etica
          </h1>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#9a9289",
              maxWidth: "480px",
              marginBottom: "48px",
              fontWeight: 300,
            }}
          >
            Progettiamo spazi che durano nel tempo. Dal concept all'esecuzione, con rigore metodologico e attenzione al territorio del Nordest italiano.
          </p>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <a
              href="#progetti"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 36px",
                background: "#c4a96a",
                color: "#0f0e0d",
                textDecoration: "none",
                fontSize: "11px",
                letterSpacing: "0.18em",
                fontWeight: 700,
                transition: "all 0.2s",
              }}
            >
              ESPLORA I PROGETTI
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#0f0e0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#studio"
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "#9a9289",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              LO STUDIO →
            </a>
          </div>
        </div>

        {/* Hero stat pills */}
        <div
          style={{
            position: "absolute",
            right: "48px",
            bottom: "80px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {[
            { num: "15+", label: "Anni di attività" },
            { num: "80+", label: "Progetti completati" },
            { num: "100%", label: "Gestione pratica" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                textAlign: "right",
                borderRight: "2px solid #c4a96a",
                paddingRight: "20px",
              }}
            >
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#e8e3dc", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#7a7368", marginTop: "4px" }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div style={{ fontSize: "8px", letterSpacing: "0.2em", color: "#5a5550" }}>SCROLL</div>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, #c4a96a, transparent)",
              animation: "pulse 2s infinite",
            }}
          />
        </div>
      </section>

      {/* ── TICKER ── */}
      <div
        style={{
          background: "#c4a96a",
          padding: "12px 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "inline-block",
            animation: "ticker 30s linear infinite",
          }}
        >
          {Array(4).fill(
            "PROGETTAZIONE ARCHITETTONICA · DIREZIONE LAVORI · RIQUALIFICAZIONE ENERGETICA · GESTIONE BUROCRAZIA · INTERIOR DESIGN · CONCORSI PUBBLICI · "
          ).join("")}
        </div>
        <style>{`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </div>

      {/* ── FEATURED PROJECTS ── */}
      <section id="progetti" style={{ padding: "120px 48px" }}>
        <FadeIn>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "64px",
            }}
          >
            <div>
              <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#c4a96a", marginBottom: "12px" }}>
                002 — PORTFOLIO
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(36px, 4vw, 56px)",
                  fontWeight: 400,
                  color: "#e8e3dc",
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Progetti selezionati
              </h2>
            </div>
            <a
              href="#"
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "#7a7368",
                textDecoration: "none",
                borderBottom: "1px solid #3a3530",
                paddingBottom: "4px",
              }}
            >
              TUTTI I PROGETTI →
            </a>
          </div>
        </FadeIn>

        {/* First project — hero size */}
        <FadeIn delay={100}>
          <div
            style={{
              position: "relative",
              marginBottom: "4px",
              cursor: "pointer",
              overflow: "hidden",
              height: "580px",
            }}
            onMouseEnter={() => setActiveProject(0)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <img
              src={projects[0].img}
              alt={projects[0].title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.8s ease",
                transform: activeProject === 0 ? "scale(1.04)" : "scale(1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(15,14,13,0.9) 0%, transparent 50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "40px",
                left: "40px",
                right: "40px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#c4a96a", marginBottom: "8px" }}>
                  {projects[0].id} — {projects[0].category.toUpperCase()}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "36px",
                    fontWeight: 400,
                    color: "#e8e3dc",
                    margin: "0 0 8px",
                  }}
                >
                  {projects[0].title}
                </h3>
                <p style={{ fontSize: "14px", color: "#9a9289", margin: 0 }}>{projects[0].subtitle}</p>
              </div>
              <div style={{ display: "flex", gap: "20px", textAlign: "right" }}>
                <div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.1em", color: "#5a5550" }}>AREA</div>
                  <div style={{ fontSize: "16px", color: "#e8e3dc", fontWeight: 600 }}>{projects[0].area}</div>
                </div>
                <div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.1em", color: "#5a5550" }}>ANNO</div>
                  <div style={{ fontSize: "16px", color: "#e8e3dc", fontWeight: 600 }}>{projects[0].year}</div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Projects grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "4px",
            marginBottom: "80px",
          }}
        >
          {projects.slice(1).map((project, i) => (
            <FadeIn key={project.id} delay={i * 80}>
              <div
                style={{
                  position: "relative",
                  cursor: "pointer",
                  overflow: "hidden",
                  height: "320px",
                }}
                onMouseEnter={() => setActiveProject(i + 1)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                    transform: activeProject === i + 1 ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(15,14,13,0.88) 0%, transparent 55%)",
                  }}
                />
                {/* Hover overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(196,169,106,0.08)",
                    opacity: activeProject === i + 1 ? 1 : 0,
                    transition: "opacity 0.3s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid #c4a96a",
                      padding: "10px 24px",
                      fontSize: "9px",
                      letterSpacing: "0.18em",
                      color: "#c4a96a",
                      opacity: activeProject === i + 1 ? 1 : 0,
                      transform: activeProject === i + 1 ? "translateY(0)" : "translateY(10px)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    SCOPRI →
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
                  <div style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#c4a96a", marginBottom: "6px" }}>
                    {project.id} — {project.category.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "18px",
                      color: "#e8e3dc",
                      fontWeight: 400,
                      lineHeight: 1.2,
                    }}
                  >
                    {project.title}
                  </div>
                  <div style={{ fontSize: "11px", color: "#7a7368", marginTop: "4px" }}>{project.subtitle}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ borderTop: "1px solid rgba(232,227,220,0.06)", margin: "0 48px" }} />

      {/* ── ABOUT / STUDIO ── */}
      <section id="studio" style={{ padding: "120px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          {/* Image side */}
          <FadeIn>
            <div style={{ position: "relative" }}>
              <img
                src={`${DOMAIN}/images/afa-founder.png`}
                alt="Francesco Steccanella"
                style={{
                  width: "100%",
                  height: "600px",
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "grayscale(20%)",
                }}
              />
              {/* Accent border */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  right: "-20px",
                  width: "200px",
                  height: "200px",
                  border: "2px solid #c4a96a",
                  zIndex: -1,
                }}
              />
              {/* Info chip */}
              <div
                style={{
                  position: "absolute",
                  bottom: "32px",
                  left: "-32px",
                  background: "#0f0e0d",
                  border: "1px solid rgba(232,227,220,0.1)",
                  padding: "20px 28px",
                }}
              >
                <div style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#7a7368", marginBottom: "6px" }}>
                  FONDATORE
                </div>
                <div style={{ fontSize: "18px", color: "#e8e3dc", fontWeight: 600 }}>Francesco Steccanella</div>
                <div style={{ fontSize: "11px", color: "#9a9289", marginTop: "4px" }}>
                  Architetto · Docente · Ricercatore
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Text side */}
          <FadeIn delay={200}>
            <div>
              <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#c4a96a", marginBottom: "20px" }}>
                003 — LO STUDIO
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(32px, 3vw, 48px)",
                  fontWeight: 400,
                  color: "#e8e3dc",
                  margin: "0 0 28px",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                Non solo creatività.
                <br />
                <em style={{ color: "#c4a96a" }}>Responsabilità</em> concreta.
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "#9a9289",
                  marginBottom: "20px",
                  fontWeight: 300,
                }}
              >
                A.FA Architettura si inserisce nel settore della progettazione architettonica e dell'ingegneria, con una forte componente legata alla gestione tecnica e alla realizzazione concreta degli interventi.
              </p>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "#9a9289",
                  marginBottom: "40px",
                  fontWeight: 300,
                }}
              >
                Non siamo solo uno studio creativo: operiamo in un ambito formato da incarichi pubblici, riqualificazioni e progetti residenziali di alto livello. Il legame con la ricerca accademica è un elemento distintivo e identitario del nostro approccio.
              </p>

              {/* Values */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "44px" }}>
                {[
                  { icon: "◆", label: "Rigore tecnico", desc: "Ogni dettaglio è documentato" },
                  { icon: "◇", label: "Etica progettuale", desc: "Responsabilità verso il territorio" },
                  { icon: "△", label: "Approccio tailor-made", desc: "Ogni cliente è unico" },
                  { icon: "○", label: "Trasparenza", desc: "Preventivi chiari, nessuna sorpresa" },
                ].map((v) => (
                  <div key={v.label} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <span style={{ color: "#c4a96a", fontSize: "14px", marginTop: "2px" }}>{v.icon}</span>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: "#e8e3dc", letterSpacing: "0.05em" }}>
                        {v.label}
                      </div>
                      <div style={{ fontSize: "11px", color: "#5a5550", marginTop: "2px" }}>{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#contatti"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  color: "#c4a96a",
                  textDecoration: "none",
                  fontWeight: 600,
                  borderBottom: "1px solid #c4a96a",
                  paddingBottom: "4px",
                }}
              >
                INIZIA UNA CONVERSAZIONE →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="servizi"
        style={{
          padding: "120px 48px",
          background: "#131211",
        }}
      >
        <FadeIn>
          <div style={{ marginBottom: "72px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#c4a96a", marginBottom: "12px" }}>
              004 — SERVIZI
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 400,
                color: "#e8e3dc",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Come possiamo aiutarti
            </h2>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "rgba(232,227,220,0.08)",
          }}
        >
          {services.map((s, i) => (
            <FadeIn key={s.number} delay={i * 100}>
              <div
                style={{
                  background: "#131211",
                  padding: "44px 36px",
                  borderTop: "2px solid transparent",
                  transition: "border-color 0.3s, background 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderTopColor = "#c4a96a";
                  (e.currentTarget as HTMLDivElement).style.background = "#0f0e0d";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderTopColor = "transparent";
                  (e.currentTarget as HTMLDivElement).style.background = "#131211";
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    color: "#3a3530",
                    marginBottom: "28px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {s.number}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "#e8e3dc",
                    margin: "0 0 16px",
                    lineHeight: 1.3,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.7,
                    color: "#6a6358",
                    margin: "0 0 28px",
                    fontWeight: 300,
                  }}
                >
                  {s.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    color: "#c4a96a",
                    fontWeight: 600,
                  }}
                >
                  SCOPRI
                  <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="#c4a96a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: "120px 48px", background: "#0f0e0d" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#c4a96a", marginBottom: "12px" }}>
              005 — IL METODO
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 400,
                color: "#e8e3dc",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Il processo progettuale
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0", position: "relative" }}>
          {/* connector line */}
          <div
            style={{
              position: "absolute",
              top: "28px",
              left: "10%",
              right: "10%",
              height: "1px",
              background: "rgba(196,169,106,0.2)",
            }}
          />
          {[
            { n: "01", label: "Primo incontro", desc: "Conoscenza reciproca e definizione del brief" },
            { n: "02", label: "Analisi & Brief", desc: "Studio del sito e della normativa applicabile" },
            { n: "03", label: "Progetto", desc: "Elaborati tecnici e render 3D fotorealistici" },
            { n: "04", label: "Autorizzazioni", desc: "Gestione completa delle pratiche burocratiche" },
            { n: "05", label: "Cantiere", desc: "Direzione lavori e report mensili al cliente" },
          ].map((step, i) => (
            <FadeIn key={step.n} delay={i * 120}>
              <div style={{ textAlign: "center", padding: "0 20px" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    border: "1px solid #c4a96a",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    background: "#0f0e0d",
                    position: "relative",
                    zIndex: 1,
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#c4a96a",
                    letterSpacing: "0.05em",
                  }}
                >
                  {step.n}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#e8e3dc",
                    marginBottom: "8px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {step.label}
                </div>
                <div style={{ fontSize: "12px", color: "#5a5550", lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section
        id="contatti"
        style={{
          padding: "120px 48px",
          background: "#131211",
          borderTop: "1px solid rgba(232,227,220,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <FadeIn>
            <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#c4a96a", marginBottom: "20px" }}>
              006 — CONTATTI
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(40px, 5vw, 68px)",
                fontWeight: 400,
                color: "#e8e3dc",
                margin: "0 0 24px",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Parliamo del tuo
              <br />
              <em style={{ color: "#c4a96a" }}>prossimo progetto</em>
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#6a6358",
                lineHeight: 1.7,
                marginBottom: "52px",
                fontWeight: 300,
              }}
            >
              Ogni progetto inizia da una conversazione. Contattaci per un primo incontro conoscitivo, senza impegno.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="mailto:info@afa-architettura.it"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "18px 48px",
                  background: "#c4a96a",
                  color: "#0f0e0d",
                  textDecoration: "none",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  fontWeight: 700,
                }}
              >
                SCRIVICI
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#0f0e0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="tel:+390491234567"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "18px 48px",
                  border: "1px solid rgba(232,227,220,0.2)",
                  color: "#9a9289",
                  textDecoration: "none",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  fontWeight: 600,
                }}
              >
                CHIAMACI
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: "48px",
          background: "#0a0909",
          borderTop: "1px solid rgba(232,227,220,0.06)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  border: "1.5px solid #c4a96a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontWeight: 700, fontSize: "11px", color: "#c4a96a" }}>AFA</span>
              </div>
              <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", color: "#e8e3dc" }}>
                A.FA ARCHITETTURA
              </div>
            </div>
            <p style={{ fontSize: "13px", color: "#4a4540", lineHeight: 1.7, maxWidth: "280px", margin: "0 0 20px" }}>
              Studio di architettura e ingegneria con sede nel Nordest italiano. Progettazione, direzione lavori e gestione completa degli interventi.
            </p>
            <div style={{ fontSize: "11px", color: "#3a3530" }}>
              Albo Professionale Ordine Architetti Venezia
            </div>
          </div>
          {[
            {
              title: "STUDIO",
              links: ["Chi siamo", "Il metodo", "Team", "Ricerca"],
            },
            {
              title: "SERVIZI",
              links: ["Progettazione", "Direzione lavori", "Riqualificazione", "Pratiche edilizie"],
            },
            {
              title: "CONTATTI",
              links: ["info@afa-architettura.it", "+39 049 123 4567", "Treviso, Italia", "LinkedIn"],
            },
          ].map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: "#5a5550",
                  marginBottom: "20px",
                  fontWeight: 700,
                }}
              >
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize: "12px",
                      color: "#4a4540",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#9a9289")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#4a4540")}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(232,227,220,0.06)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "11px", color: "#2a2520" }}>
            © 2024 A.FA Architettura di Francesco Steccanella. P.IVA 12345678901
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Cookie", "Note Legali"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontSize: "10px", color: "#2a2520", textDecoration: "none", letterSpacing: "0.1em" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
