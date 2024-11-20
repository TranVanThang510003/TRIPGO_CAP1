const DetailSection = ({ details }) => {
  if (!Array.isArray(details) || details.length === 0) {
    return (
      <div className="bg-[#FFF7E5] p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Chi tiết gói dịch vụ</h3>
        <p className="text-gray-600 italic">
          Hiện không có dịch vụ nào được liệt kê cho gói này.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF7E5] p-6 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">Chi tiết gói dịch vụ</h3>
      <div className="space-y-6">
        {details.map((detail, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            {detail.dayNumber ? (
              <>
                <h4 className="text-lg font-bold mb-2">
                  Ngày {detail.dayNumber}
                </h4>
                <div className="ml-4">
                  <p className="text-gray-700 font-medium">{detail.title}</p>
                  <p className="text-gray-600">{detail.description}</p>
                </div>
              </>
            ) : (
              <>
                <h4 className="text-lg font-semibold ml-2">
                  {detail.time}: {detail.title}{' '}
                </h4>

                <p className="text-gray-600">{detail.description}</p>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-blue-600 hover:underline cursor-pointer">
        <a href="#">Xem thêm thông tin chi tiết gói &gt;</a>
      </div>
    </div>
  );
};

export default DetailSection;
