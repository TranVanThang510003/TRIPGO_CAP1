import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import SideBar from '../components/UserProfile/SideBar';
import FavouriteList from '../components/UserProfile/FavouriteList';

const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState('Tất cả');

  const tabs = [
    { name: 'Tất cả' },
    { name: 'Khách sạn' },
    { name: 'Nhà hàng' },
    { name: 'Hoạt động & vui chơi' },
    { name: 'Tour' },
    { name: 'Camping' }
  ];

  return (
    <div className="flex gap-4 mb-4">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`h-[30px] py-1 px-4 rounded-[20px] flex justify-center items-center cursor-pointer 
            ${activeTab === tab.name ? 'bg-[#3e86f5] text-white' : 'bg-white border border-[#d9d9d9] text-black/80'}`}
        >
          <span className="text-[16px] font-normal font-['Baloo 2']">{tab.name}</span>
        </div>
      ))}
    </div>
  );
};

const UserFavourite = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("Yêu thích"); // Mục được chọn trong SideBar

  return (
      <div  className='bg-[#f8f8f8] w-full min-h-screen overflow-auto relative'>
        <Header/>
        <div className='w-full flex flex-col md:flex-row gap-2 h-auto bg-[#f8f8f8] mx-auto px-[10%] '>
          <div className='mr-2 fixed'>
            <SideBar
              selectedSection={selectedSection}
              onSectionChange={setSelectedSection}
          />
          </div>


          {/* Main content */}
          <div className="flex-grow bg-white w-full p-4 rounded-xl shadow-md mt-6 md:mt-0 ml-[300px]">
            <h1 className="text-[30px] text-[#181E4B] font-bold mb-2">Yêu thích</h1>
            <div className="flex-1 flex justify-center w-full">
              <CategoryTabs/> {/* Tabs để chọn loại yêu thích */}
            </div>
            <FavouriteList/>
            <div className="text-center text-[#818080] text-lg font-normal font-['Baloo 2'] mt-6">
              Không còn hoạt động yêu thích nào
            </div>

          </div>
        </div>
      </div>
  );
};

export default UserFavourite;
