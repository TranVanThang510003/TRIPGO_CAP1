import React from 'react';

const DetailSection = ({ details }) => {
  return (
    <div className="bg-[#FFF7E5] p-4 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">Chi tiết gói dịch vụ</h3>
      {details.length > 0 ? ( // Kiểm tra xem có dịch vụ không
        details.map((service, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-bold">{service.name}</h4>
            <p className="pl-4">{service.description}</p>
          </div>
        ))
      ) : (
        <p>Không có dịch vụ nào.</p> // Thông báo nếu không có dịch vụ
      )}
    </div>
  );
};

export default DetailSection;
