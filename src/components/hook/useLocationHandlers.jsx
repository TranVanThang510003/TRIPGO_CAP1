import { useState } from 'react';
import axios from 'axios';

const useLocationHandlers = () => {
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const handleProvinceChange = async (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setSelectedDistrict('');
    setSelectedWard('');
    setWards([]);

    if (provinceCode) {
      try {
        const response = await axios.get(
          `https://provinces.open-api.vn/api/d/search/?p=${provinceCode}`
        );
        setDistricts(response.data || []);
      } catch (error) {
        console.error('Error fetching districts:', error);
        setDistricts([]);
      }
    }
  };

  const handleDistrictChange = async (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    setSelectedWard('');

    if (districtCode) {
      try {
        const response = await axios.get(
          `https://provinces.open-api.vn/api/w/search/?d=${districtCode}`
        );
        setWards(response.data || []);
      } catch (error) {
        console.error('Error fetching wards:', error);
      }
    }
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  return {
    districts,
    wards,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
  };
};

export default useLocationHandlers;
