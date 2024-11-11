import Header from "../layout/Header";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import TravelSection from "../components/componentPage/TravelSection";
import DestinationSuggestions from "../components/componentPage/DestinationSuggestions ";
import TestimonialCard from "../components/componentPage/TestimonialCard";
import Sidebar from "../layout/Sidebar";
import SpecialOfferList from "../components/componentPage/SpecialOffer/SpecialOfferList";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Navbar />
      <div className="w-4/5 flex justify-center flex-col items-center mx-auto">
      <SpecialOfferList />
      <TravelSection />
      <DestinationSuggestions />
      <TestimonialCard />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
