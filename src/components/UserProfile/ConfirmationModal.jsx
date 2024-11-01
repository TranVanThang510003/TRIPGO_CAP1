// ConfirmationModal.js
import React from 'react';

const ConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4 text-center">Xác nhận xóa tài khoản</h2>
                <p className="mb-6 text-gray-600">Bạn có chắc chắn muốn xóa tài khoản của mình? Hành động này không thể hoàn tác.</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-400"
                        onClick={onCancel}
                    >
                        Hủy
                    </button>
                    <button
                        className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
