import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import LeadForm from "@/components/LeadForm";
import RealGoogleReviews from "@/components/RealGoogleReviews";
import logo from "@/assets/logo-transparent.png";

type Props = {
  image: string;
  imageAlt: string;
  objectPosition?: string;
  headline: string;
  subline: string;
  form: Omit<ComponentProps<typeof LeadForm>, "variant">;
};

export default function FormFirstLanding({ image, imageAlt, objectPosition = "center", headline, subline, form }: Props) {
  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <img src={image} alt={imageAlt} loading="eager" {...{ fetchpriority: "high" }} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,.6), rgba(0,0,0,.25) 50%, rgba(0,0,0,.7))" }} />
        <div className="relative mx-auto flex w-full max-w-[480px] flex-1 flex-col px-4 pt-5">
          <div className="flex flex-col gap-[14px]">
            <img src={logo} alt="The Grind Training Center" width={56} className="w-14" />
            <div className="mt-8 flex flex-col gap-[14px]">
              <h1 className="font-heading text-[30px] font-bold uppercase leading-[1.02] text-white md:text-[44px]">{headline}</h1>
              <p className="text-base text-white/90">{subline}</p>
            </div>
          </div>
          <div className="my-auto rounded-[18px] border border-white/15 p-4" style={{ background: "rgba(14,14,16,.5)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
            <LeadForm {...form} variant="compact" />
          </div>
        </div>
        <div className="relative w-full pb-4 pt-[14px]">
          <RealGoogleReviews />
        </div>
      </section>
      <p className="py-5 text-center text-[12.5px] text-white/50">
        8001 NW 50th St, OKC · <a href="tel:4054957800" className="hover:underline">405-495-7800</a> · <Link to="/privacy" className="hover:underline">Privacy</Link>
      </p>
    </div>
  );
}
