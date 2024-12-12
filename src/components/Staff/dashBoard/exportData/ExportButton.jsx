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

dayjs.extend(weekOfYear);

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

        // Filter by selected tour
        if (selectedTour && selectedTour !== "all") {
            filteredTours = filteredTours.filter((tour) => tour.tourName === selectedTour);
        }

        // Filter by selected year
        if (selectedYear) {
            filteredTours = filteredTours.filter((tour) =>
                tour.departures.some((departure) =>
                    dayjs(departure.date).year() === parseInt(selectedYear, 10)
                )
            );
        }

        // Filter by selected quarter
        if (selectedQuarter) {
            const quarterNumber = parseInt(selectedQuarter.replace("Q", ""), 10);
            filteredTours = filteredTours.filter((tour) =>
                tour.departures.some((departure) => {
                    const month = dayjs(departure.date).month() + 1;
                    const quarterOfDeparture = Math.ceil(month / 3);
                    return quarterOfDeparture === quarterNumber;
                })
            );
        }

        // Filter by selected month
        if (selectedMonth) {
            filteredTours = filteredTours.filter((tour) =>
                tour.departures.some((departure) =>
                    dayjs(departure.date).month() + 1 === parseInt(selectedMonth, 10)
                )
            );
        }

        // Filter by selected week
        if (selectedWeek) {
            const weekNumber = parseInt(selectedWeek.replace("Tuần ", ""), 10);
            filteredTours = filteredTours.filter((tour) =>
                tour.departures.some((departure) => dayjs(departure.date).week() === weekNumber)
            );
        }

        // Create a meaningful file name
        let dynamicFileName = "revenue_dashboard";

        if (selectedTour && selectedTour !== "all") {
            dynamicFileName += `_${selectedTour.replace(/\s+/g, "_")}`;
        }

        if (selectedYear) {
            dynamicFileName += `_Year_${selectedYear}`;
        }

        if (selectedQuarter) {
            dynamicFileName += `_Quarter_${selectedQuarter}`;
        }

        if (selectedMonth) {
            dynamicFileName += `_Month_${selectedMonth}`;
        }

        if (selectedWeek) {
            dynamicFileName += `_Week_${selectedWeek}`;
        }

        dynamicFileName += ".xlsx";

        // Create workbook for Excel file
        const workbook = XLSX.utils.book_new();

        // Prepare the data for export
        const sheetData = filteredTours.map((tour) => ({
            "Tên Tour": tour.tourName,
            "Ngày Khởi Hành": tour.departures.map((d) => d.date).join(", "),
            "Doanh Thu Tổng": tour.totalRevenue,
        }));
        const sheet = XLSX.utils.json_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, sheet, "Doanh thu theo ngày");

        // Export the file
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
