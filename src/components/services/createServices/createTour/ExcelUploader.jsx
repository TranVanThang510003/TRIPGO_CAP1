import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUploader = ({ onDataParsed }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (
                selectedFile.type !==
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
                selectedFile.type !== 'application/vnd.ms-excel'
            ) {
                setError('Vui lòng chọn file Excel hợp lệ.');
                return;
            }
            setFile(selectedFile);
            setError(null);
        }
    };

    const handleFileUpload = () => {
        if (!file) {
            setError('Vui lòng chọn file Excel.');
            return;
        }

        setLoading(true);

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const binaryString = event.target.result;
                const workbook = XLSX.read(binaryString, { type: 'binary' });

                // Lấy dữ liệu từ sheet đầu tiên
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const data = XLSX.utils.sheet_to_json(sheet);

                if (data.length === 0) {
                    setError('Dữ liệu trong file Excel không hợp lệ hoặc trống.');
                } else {
                    // Gọi hàm callback để trả dữ liệu lên component cha
                    onDataParsed(data);
                    setFile(null); // Reset file after successful upload
                }
            } catch (error) {
                setError('Lỗi khi đọc file Excel.');
            } finally {
                setLoading(false);
            }
        };

        reader.onerror = () => {
            setError('Lỗi khi tải file lên.');
            setLoading(false);
        };

        // Use readAsArrayBuffer instead of readAsBinaryString (deprecated)
        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="file-input"
            />
            <button
                onClick={handleFileUpload}
                className="upload-btn"
                disabled={loading}
            >
                {loading ? 'Đang tải lên...' : 'Tải lên'}
            </button>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default ExcelUploader;
