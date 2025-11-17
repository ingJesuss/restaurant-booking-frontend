
import BookingForm from "@/components/client/BookingForm";
import HeroSection from "@/components/client/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-indigo-200 flex flex-col items-center">
      <HeroSection />
      <BookingForm />
    </main>
    
    
  );
}
