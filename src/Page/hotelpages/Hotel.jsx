import Header from "../../layout/Header";
import SearchBar from "../../components/Hotels/SearchBar";
import SortBar from "../../components/common/SortBar";
import FilterSidebar from "../../components/Hotels/FilterSidebar.jsx";
import Footer from "../../layout/Footer"
import HotelList from "../../components/Hotels/HotelList";
import SubscribeSection from "../../components/common/Sub";
const HotelPage = () => {
    return (
        <div className=" bg-[#F8F8F8]">
            <Header/>
            <SearchBar />

            {/* Main content: Filter Sidebar and Hotel Listings */}
            <div className="flex w-4/5 mx-auto mt-6">
                {/* Sidebar for filters */}
                <FilterSidebar />

                {/* Main content area: Sorting options and hotel cards */}
                <div className="flex-1   ml-6"> 
                    <SortBar />
                    
                    {/* HotelList */}
                    <div className="mt-6">
                         <HotelList/>
                    </div>                   
                </div>
            </div>
            <SubscribeSection/>
            <Footer/>
        </div>
    );
};

export default HotelPage;
