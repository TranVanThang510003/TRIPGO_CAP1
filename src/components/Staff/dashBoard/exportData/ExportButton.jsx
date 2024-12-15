import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import MonthSelection from "./MonthSelection.jsx";
import QuarterSelection from "./QuarterSelection.jsx";
import TourSelection from "./TourSelection.jsx";
import WeekSelection from "./WeekSelection.jsx";
import YearSelection from "./YearSelection.jsx";
import { Icon } from '@iconify/react';
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);
const ExportButton = ({ allTours, fileName }) => {
    const [selectedTour, setSelectedTour] = useState("all");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedQuarter, setSelectedQuarter] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedWeek, setSelectedWeek] = useState("");
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        if (allTours.length > 0) {
            setSelectedTour("all");
        }
    }, [allTours]);

    const getAvailableYears = () => {
        const years = new Set();
        allTours.forEach((tour) => {
            tour.departures.forEach((departure) => years.add(dayjs(departure.date).year()));
        });
        return Array.from(years).sort();
    };

    const getAvailableQuarters = () => {
        if (!selectedYear) return [];
        const quarters = new Set();
        allTours.forEach((tour) => {
            tour.departures.forEach((departure) => {
                if (dayjs(departure.date).year() === parseInt(selectedYear, 10)) {
                    quarters.add(`Q${Math.ceil((dayjs(departure.date).month() + 1) / 3)}`);
                }
            });
        });
        return Array.from(quarters).sort();
    };

    const getAvailableMonths = () => {
        if (!selectedQuarter) return [];
        const quarterNumber = parseInt(selectedQuarter.replace("Q", ""), 10);
        return Array.from({ length: 3 }, (_, i) => (quarterNumber - 1) * 3 + i + 1);
    };

    const getAvailableWeeks = () => {
        if (!selectedMonth) return [];
        const weeks = new Set();
        allTours.forEach((tour) => {
            tour.departures.forEach((departure) => {
                if (
                    dayjs(departure.date).month() + 1 === parseInt(selectedMonth, 10) &&
                    (!selectedYear || dayjs(departure.date).year() === parseInt(selectedYear, 10))
                ) {
                    weeks.add(dayjs(departure.date).week());
                }
            });
        });
        return Array.from(weeks).sort();
    };
    const handleExport = () => {
        let filteredTours = allTours;

        console.log("Selected Filters:", {
            selectedTour,
            selectedYear,
            selectedQuarter,
            selectedMonth,
            selectedWeek,
        });

        // 1. Lọc theo tên tour
        if (selectedTour && selectedTour !== "all") {
            filteredTours = filteredTours.filter((tour) => tour.tourName === selectedTour);
        }

        // 2. Lọc theo năm
        if (selectedYear) {
            filteredTours = filteredTours.filter((tour) =>
                tour.departures.some((departure) =>
                    dayjs(departure.date).year() === parseInt(selectedYear, 10)
                )
            );
        }

        // 3. Lọc theo quý
        if (selectedQuarter) {
            const quarterNumber = parseInt(selectedQuarter.replace("Q", ""), 10);
            filteredTours = filteredTours.filter((tour) =>
                tour.departures.some((departure) => {
                    const month = dayjs(departure.date).month() + 1;
                    return Math.ceil(month / 3) === quarterNumber;
                })
            );
        }

        // 4. Lọc theo tháng
        if (selectedMonth) {
            filteredTours = filteredTours.map((tour) => ({
                ...tour,
                departures: tour.departures.filter(
                    (departure) =>
                        dayjs(departure.date).month() + 1 === parseInt(selectedMonth, 10) &&
                        dayjs(departure.date).year() === parseInt(selectedYear, 10)
                ),
            })).filter((tour) => tour.departures.length > 0);
        }

        // 5. Lọc theo tuần trong tháng được chọn
        if (selectedWeek) {
            const weekNumber = parseInt(selectedWeek.replace("Tuần ", ""), 10);
            filteredTours = filteredTours.map((tour) => ({
                ...tour,
                departures: tour.departures.filter((departure) => {
                    const date = dayjs(departure.date);
                    const isInWeek = date.week() === weekNumber;
                    const isInMonth = date.month() + 1 === parseInt(selectedMonth, 10);
                    const isInYear = date.year() === parseInt(selectedYear, 10);
                    return isInWeek && isInMonth && isInYear;
                }),
            })).filter((tour) => tour.departures.length > 0);
        }

        console.log("Dữ liệu sau lọc:", filteredTours);

        // 6. Gom nhóm dữ liệu
        const groupedData = {};
        filteredTours.forEach((tour) => {
            tour.departures.forEach((departure) => {
                const date = dayjs(departure.date);
                const year = date.year();
                const month = date.month() + 1;
                const quarter = `Q${Math.ceil(month / 3)}`;
                const week = date.week();

                const key = `${year}-${quarter}-${month}-${week}-${tour.tourName}`;
                if (!groupedData[key]) {
                    groupedData[key] = {
                        "Năm": year,
                        "Quý": quarter,
                        "Tháng": month,
                        "Tuần": week,
                        "Tên Tour": tour.tourName,
                        "Ngày Khởi Hành": [],
                        "Doanh Thu Tổng": 0,
                    };
                }

                groupedData[key]["Ngày Khởi Hành"].push(date.format("YYYY-MM-DD"));
                groupedData[key]["Doanh Thu Tổng"] += departure.revenue || 0;
            });
        });

        // 7. Chuyển dữ liệu thành mảng và sắp xếp
        const sheetData = Object.values(groupedData).map((item) => ({
            "Năm": item["Năm"],
            "Quý": item["Quý"],
            "Tháng": item["Tháng"],
            "Tuần": item["Tuần"],
            "Tên Tour": item["Tên Tour"],
            "Ngày Khởi Hành": item["Ngày Khởi Hành"].join(", "),
            "Doanh Thu Tổng": item["Doanh Thu Tổng"].toLocaleString("vi-VN"),
        }));

        console.log("Dữ liệu cuối cùng:", sheetData);

        // 8. Xuất file Excel
        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(sheetData);
        sheet['!cols'] = [
            { wch: 10 },
            { wch: 8 },
            { wch: 8 },
            { wch: 8 },
            { wch: 30 },
            { wch: 40 },
            { wch: 20 },
        ];

        let dynamicFileName = "revenue_dashboard";
        if (selectedTour && selectedTour !== "all") dynamicFileName += `_${selectedTour.replace(/\s+/g, "_")}`;
        if (selectedYear) dynamicFileName += `_Year_${selectedYear}`;
        if (selectedQuarter) dynamicFileName += `_Quarter_${selectedQuarter}`;
        if (selectedMonth) dynamicFileName += `_Month_${selectedMonth}`;
        if (selectedWeek) dynamicFileName += `_Week_${selectedWeek}`;
        dynamicFileName += ".xlsx";

        XLSX.utils.book_append_sheet(workbook, sheet, "Doanh Thu Tổng Hợp");
        XLSX.writeFile(workbook, dynamicFileName);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowOptions((prev) => !prev)}
                className="bg-[#33c481] text-white px-4 py-2 rounded-lg hover:bg-[#21a366] transition flex items-center gap-2"
            >
                {showOptions ? "Ẩn lựa chọn" : "Xuất dữ liệu"}
                <Icon icon="vscode-icons:file-type-excel2" width="24" height="24"/>
            </button>


            {showOptions && (
                <div className="absolute top-12 right-0 bg-white shadow-md rounded-lg p-4 w-80">
                    <TourSelection tours={allTours} selectedTour={selectedTour} onTourChange={(tour) => {
                        setSelectedTour(tour);
                        setSelectedYear("");
                        setSelectedQuarter("");
                        setSelectedMonth("");
                        setSelectedWeek("");
                    }}/>
                    <YearSelection years={getAvailableYears()} selectedYear={selectedYear} onYearChange={(year) => {
                        setSelectedYear(year);
                        setSelectedQuarter("");
                        setSelectedMonth("");
                        setSelectedWeek("");
                    }}/>
                    {selectedYear && (
                        <QuarterSelection
                            quarters={getAvailableQuarters()}
                            selectedQuarter={selectedQuarter}
                            onQuarterChange={(quarter) => {
                                setSelectedQuarter(quarter);
                                setSelectedMonth("");
                                setSelectedWeek("");
                            }}
                        />
                    )}
                    {selectedQuarter && (
                        <MonthSelection
                            months={getAvailableMonths()}
                            selectedMonth={selectedMonth}
                            onMonthChange={(month) => {
                                setSelectedMonth(month);
                                setSelectedWeek("");
                            }}
                        />
                    )}
                    {selectedMonth && (
                        <WeekSelection
                            weeks={getAvailableWeeks()}
                            selectedWeek={selectedWeek}
                            onWeekChange={setSelectedWeek}
                        />
                    )}
                    <button
                        onClick={handleExport}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full"
                    >
                        Xác nhận xuất dữ liệu
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExportButton;
