import { useState } from 'react';
import axios from 'axios';

const useLocation = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách tỉnh
  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://provinces.open-api.vn/api/p/');
      setProvinces(response.data || []);
    } catch (error) {
      console.error('Error fetching provinces:', error);
      alert('Không thể tải danh sách tỉnh, vui lòng thử lại sau.');
    }
  };

  // Lấy danh sách quận/huyện
  const fetchDistricts = async (provinceId) => {
    setLoading(true);
    try {
      let response = await axios.get(
        `https://provinces.open-api.vn/api/d/search/?p=${provinceId}&q=Quận`
      );

      // Nếu không có dữ liệu quận, thử lấy huyện
      if (!response.data || response.data.length === 0) {
        response = await axios.get(
          `https://provinces.open-api.vn/api/d/search/?p=${provinceId}&q=Huyện`
        );
      }

      if (response.data && response.data.length > 0) {
        setDistricts(response.data);
        return response.data;
      } else {
        console.warn('Không tìm thấy quận/huyện nào.');
        setDistricts([]);
        return [];
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách quận/huyện:', error);
      setDistricts([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách xã/phường
  const fetchWards = async (districtId) => {
    setLoading(true);
    try {
      let response = await axios.get(
        `https://provinces.open-api.vn/api/w/search/?d=${districtId}&q=Phường`
      );

      // Nếu không có dữ liệu phường, thử lấy xã
      if (!response.data || response.data.length === 0) {
        response = await axios.get(
          `https://provinces.open-api.vn/api/w/search/?d=${districtId}&q=Xã`
        );
      }

      if (response.data && response.data.length > 0) {
        setWards(response.data);
        return response.data;
      } else {
        console.warn('Không tìm thấy phường/xã nào.');
        setWards([]);
        return [];
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phường/xã:', error);
      setWards([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    provinces,
    districts,
    wards,
    loading,
    fetchProvinces,
    fetchDistricts,
    fetchWards,
  };
};

export default useLocation;
