import { Star } from "lucide-react";

type Review = { name: string; quote: string };

export default function GoogleReviews({ reviews }: { reviews: Review[] }) {
  return (
        <div className="party-reviews" aria-label="Google reviews">
        <div className="party-review-track">
          {[false, true].map((duplicate) => <div key={String(duplicate)} className="party-review-group" aria-hidden={duplicate || undefined}>
            {Array.from({ length: 4 }, (_, repeat) => reviews.map(({ quote, name }) => <div key={`${repeat}-${name}`} className="party-review-item" aria-hidden={repeat > 0 || undefined}>
              <div className="flex items-center gap-2">
                <div className={`review-avatar review-avatar-${name[0]}`}>{name[0]}<svg className="review-google" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.41 13.92a6 6 0 0 1 0-3.84V7.49H3.07a10 10 0 0 0 0 9.02l3.34-2.59Z"/><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.93 5.49l3.34 2.59C7.2 7.72 9.4 5.96 12 5.96Z"/></svg></div>
                <div><p className="review-name">{name}</p><p className="review-label">Google review</p></div>
              </div>
              <div className="review-stars mt-2 flex gap-0.5" aria-label="5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} aria-hidden="true" className="h-3 w-3 fill-current" />)}</div>
              <p className="mt-2 line-clamp-2 text-[12px] leading-[16px]">{quote}</p>
            </div>))}
          </div>)}
          </div>
        </div>
  );
}
