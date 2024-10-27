import BannerCamping from "../components/Camping/BannerCamping";
import CampingList from "../components/Camping/CampingList";

import FilterSideBarCamping from "../components/Camping/FilterSideBarCamping";
import SortBar from "../components/common/SortBar";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const CamPingPage = () => {
  return (
    <div>
      <Header />
      <BannerCamping />
      {/* Main content: Filter Sidebar and Hotel Listings */}
      <div className="flex w-4/5 mx-auto mt-[65px]">
        {/* Sidebar for filters */}
        <FilterSideBarCamping />

        {/* Main content area: Sorting options and hotel cards */}
        <div className="flex-1   ml-6">
          <SortBar />

          {/* RestautantList */}
          <div className="mt-[100px]">
            <CampingList />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CamPingPage;
