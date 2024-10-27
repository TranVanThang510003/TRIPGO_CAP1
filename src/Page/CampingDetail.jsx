import InformationCamping from "../components/CampingDetail/InformationCamping";
import EvaluateList from "../components/RestaurantDetail/EvaluateList";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
const CampingDetail = () => {
  return (
    <div>
      <Header />
      <InformationCamping />
      <EvaluateList />
      <Footer />
    </div>
  );
};

export default CampingDetail;
