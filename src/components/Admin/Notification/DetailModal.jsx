import { useState } from "react";

const DetailModal = ({ notification, onClose, onApprove, onReject }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className=" ml-[300px] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            {/* Main Modal */}
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-4xl w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl focus:outline-none"
                >
                    &times;
                </button>
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Chi tiết yêu cầu</h2>

                <div className="grid grid-cols-2 gap-8">
                    {/* User Information */}
                    <div className="text-lg text-gray-700">
                        <p className="mb-4">
                            <span className="font-semibold">Người dùng:</span> {notification.username}
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">Email:</span> {notification.email}
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">Điện thoại:</span> {notification.phone}
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">Nội dung:</span> {notification.reason}
                        </p>
                    </div>

                    {/* Images Section */}
                    <div>
                        <div className="mb-8">
                            <p className="font-semibold mb-4 text-gray-800">CMND/CCCD:</p>
                            <img
                                src={`http://localhost:3000/${notification.idCardImageUrl}`}
                                alt="CMND/CCCD"
                                className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
                                onClick={() =>
                                    setSelectedImage(
                                        `http://localhost:3000/${notification.idCardImageUrl}`
                                    )
                                }
                            />
                        </div>
                        <div>
                            <p className="font-semibold mb-4 text-gray-800">Giấy phép kinh doanh:</p>
                            <img
                                src={`http://localhost:3000/${notification.businessLicenseUrl}`}
                                alt="Giấy phép kinh doanh"
                                className="w-full h-auto rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
                                onClick={() =>
                                    setSelectedImage(
                                        `http://localhost:3000/${notification.businessLicenseUrl}`
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-center gap-6">
                    <button
                        onClick={() => onApprove(notification.requestId)}
                        className="px-6 py-3 bg-green-600 text-white font-semibold text-lg rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-transform duration-300"
                    >
                        Chấp nhận
                    </button>
                    <button
                        onClick={() => onReject(notification.requestId)}
                        className="px-6 py-3 bg-red-600 text-white font-semibold text-lg rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-transform duration-300"
                    >
                        Từ chối
                    </button>
                </div>
            </div>

            {/* Enlarged Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-[90vw] max-h-[90vh]">
                        <img
                            src={selectedImage}
                            alt="Zoomed"
                            className="w-auto h-auto max-w-full max-h-full rounded-lg shadow-2xl border-4 border-white"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-3 right-3 bg-gray-800 text-white p-3 rounded-full shadow-lg focus:outline-none hover:bg-gray-600 transition-transform duration-300"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DetailModal;
