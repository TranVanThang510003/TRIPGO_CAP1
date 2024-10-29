import InformationCamping from "../components/CampingDetail/InformationCamping";
import EvaluateList from "../components/Evaluate/EvaluateList";

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
