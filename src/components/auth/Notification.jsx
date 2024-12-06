import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Notification = ({ message, type, onClose }) => {
    console.log('Notification render:', { message, type });

    useEffect(() => {
        if (message) {
            console.log('Notification props đã thay đổi:', { message, type });

            // Thiết lập lại timer khi có thông báo mới
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            // Dọn dẹp timer khi component bị hủy hoặc khi message thay đổi
            return () => clearTimeout(timer);
        }
    }, [message, onClose]); // Thực thi lại khi message hoặc onClose thay đổi

    return (
        <div className={`notification ${type} ${message ? 'visible' : ''}`}>
            <span>{message}</span>
            <button onClick={onClose} className="close-btn">X</button>
        </div>
    );

};

Notification.propTypes = {
    message: PropTypes.string.isRequired, // Nội dung thông báo
    type: PropTypes.oneOf(['success', 'error']).isRequired, // Loại thông báo (thành công hay lỗi)
    onClose: PropTypes.func.isRequired, // Hàm đóng thông báo
};

export default Notification;
