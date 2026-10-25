import { useEffect } from "react";
import rachel from "@/assets/reviews/review-rachel-kidd.jpg.asset.json";
import chris from "@/assets/reviews/review-chris-harvey.jpg.asset.json";
import caleb from "@/assets/reviews/review-caleb-burks.jpg.asset.json";
import chantal from "@/assets/reviews/review-chantal-jacobs.jpg.asset.json";
import chase from "@/assets/reviews/review-chase-stivers.jpg.asset.json";
import eva from "@/assets/reviews/review-eva-crawford.jpg.asset.json";

const REVIEWS = [
  { name: "Chris Harvey", photo: chris.url, text: "Indoor field, multiple batting cages, a pitching lane, and a weight area under construction. This with a number of professional coaches focused on player development and game IQ, and you've got a solid formula for success. I really enjoy the coaches and their interaction with the parents and the players." },
  { name: "Rachel Kidd", photo: rachel.url, text: "Regan and Tristan were fanatic and very patient and very knowledgeable." },
  { name: "Chantal Jacobs", photo: chantal.url, text: "This place has definitely upgrades and now looks good and the atmosphere is spectacular. Love the family vibe, the knowledge and the lessons they offer!" },
  { name: "Caleb Burks", photo: caleb.url, text: "I was here for a spring break vacation visiting family in ukon my dad said he wanted to get some batting practice in for me and we found this we took my cousin and where able to around 5 rounds of batting in each it was super fun and we had a great time" },
  { name: "Chase Stivers", photo: chase.url, text: "Amazing People, Great with my kids!" },
  { name: "Eva Crawford", photo: eva.url, text: "Nice atmosphere and good customer service" },
];

const FONT_ID = "roboto-font";

export default function RealGoogleReviews() {
  useEffect(() => {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="rgr" aria-label="Google reviews">
      <style>{`
        .rgr { width: 100%; overflow: hidden; }
        .rgr-track { display: flex; width: max-content; animation: rgr-scroll 60s linear infinite; }
        .rgr:hover .rgr-track, .rgr:active .rgr-track, .rgr:focus-within .rgr-track { animation-play-state: paused; }
        .rgr-group { display: flex; gap: 10px; padding-right: 10px; }
        @keyframes rgr-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .rgr-card { position: relative; width: 260px; flex: none; background: #fff; border-radius: 8px; padding: 12px 14px; font-family: Roboto, Arial, sans-serif; text-align: left; }
        .rgr-text { margin-top: 6px; font-size: 13.5px; line-height: 1.4; color: #3c4043; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
      <div className="rgr-track" onTouchStart={(e) => (e.currentTarget.style.animationPlayState = "paused")} onTouchEnd={(e) => (e.currentTarget.style.animationPlayState = "")}>
        {[false, true].map((dup) => (
          <div key={String(dup)} className="rgr-group" aria-hidden={dup || undefined}>
            {REVIEWS.map((r) => (
              <div key={r.name} className="rgr-card">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" style={{ position: "absolute", top: 12, right: 14 }}><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.41 13.92a6 6 0 0 1 0-3.84V7.49H3.07a10 10 0 0 0 0 9.02l3.34-2.59Z"/><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.93 5.49l3.34 2.59C7.2 7.72 9.4 5.96 12 5.96Z"/></svg>
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingRight: 24 }}>
                  <img src={r.photo} alt="" width={36} height={36} loading="lazy" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#202124" }}>{r.name}</span>
                </div>
                <div aria-label="5 stars" style={{ marginTop: 8, display: "flex", gap: 1 }}>
                  {Array.from({ length: 5 }, (_, i) => <svg key={i} viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="#FBBC04" d="M12 2.5l2.94 6.1 6.56.86-4.8 4.6 1.2 6.54L12 17.4l-5.9 3.2 1.2-6.54-4.8-4.6 6.56-.86z"/></svg>)}
                </div>
                <p className="rgr-text">{r.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
