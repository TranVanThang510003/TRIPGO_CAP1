import Header from "../layout/Header";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import TravelSection from "../components/componentPage/TravelSection";
import DestinationSuggestions from "../components/componentPage/DestinationSuggestions ";
import TestimonialCard from "../components/componentPage/TestimonialCard";
import Sidebar from "../layout/Sidebar";
import SpecialOffer from "../components/componentPage/SpecialOffer/SpecialOffer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Navbar />
      <SpecialOffer />
      <TravelSection />
      <DestinationSuggestions />
      <TestimonialCard />
      <Footer />
    </div>
  );
};

export default HomePage;
