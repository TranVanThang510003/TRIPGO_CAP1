import Header from "../layout/Header";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import SpecialOffer from "../components/Home/SpecialOffer";
import TravelSection from "../components/Home/TravelSection";
import DestinationSuggestions from "../components/Home/DestinationSuggestions ";
import TestimonialCard from "../components/Home/TestimonialCard";
import Sidebar from "../layout/Sidebar";


const HomePage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Navbar />
      <SpecialOffer />
      <TravelSection />
        <DestinationSuggestions/>
      <TestimonialCard />
      <Footer />
    </div>
  );
};

export default HomePage;
