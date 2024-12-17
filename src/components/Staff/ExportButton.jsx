import React from 'react';
import * as XLSX from 'xlsx';
import {Icon} from "@iconify/react";

const ExportButton = ({ data, fileName }) => {
    const exportToExcel = () => {
        if (!data || data.length === 0) {
            alert("Không có dữ liệu để xuất!");
            return;
        }

        // Chuẩn bị dữ liệu cho sheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Tạo workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách khách hàng");

        // Xuất file
        XLSX.writeFile(workbook, fileName || "danh_sach_khach_hang.xlsx");
    };

    return (
        <button
            onClick={exportToExcel}
            className="bg-[#33c481] text-white px-4 py-2 rounded-lg hover:bg-[#21a366] transition flex items-center gap-2"
        >
            Xuất dữ liệu
            <Icon icon="vscode-icons:file-type-excel2" width="24" height="24"/>
        </button>
    );
};

export default ExportButton;
