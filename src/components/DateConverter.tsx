import { useState } from "react";
import NepaliDate from "nepali-date-converter";
import { Calendar, ArrowRight, Sun, Moon } from "lucide-react";

const DateConverter = () => {
  const [conversionMode, setConversionMode] = useState<"BS-AD" | "AD-BS">("BS-AD");
  const [bsYear, setBsYear] = useState(2081);
  const [bsMonth, setBsMonth] = useState(8);
  const [bsDate, setBsDate] = useState(19);
  const [adYear, setAdYear] = useState(2024);
  const [adMonth, setAdMonth] = useState(11);
  const [adDay, setAdDay] = useState(4);

  const nepaliMonths = [
    "Baisakh", "Jestha", "Asar", "Shrawan", "Bhadra", "Aswin",
    "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
  ];

  const nepaliMonthsNp = [
    "बैशाख", "जेष्ठ", "आषाढ", "श्रावण", "भाद्र", "आश्विन",
    "कार्तिक", "मंसिर", "पौष", "माघ", "फाल्गुण", "चैत्र"
  ];

  const englishMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const getADFromBS = (): Date => {
    try {
      const nepaliDate = new NepaliDate(bsYear, bsMonth, bsDate);
      return nepaliDate.toJsDate();
    } catch {
      return new Date();
    }
  };

  const getBSFromAD = (): NepaliDate => {
    try {
      const date = new Date(adYear, adMonth, adDay);
      return NepaliDate.fromAD(date);
    } catch {
      return new NepaliDate();
    }
  };

  const convertedADDate = getADFromBS();
  const convertedBSDate = getBSFromAD();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-500/30 mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-800 tracking-tight">
            Date Converter
          </h1>
          <p className="text-stone-500 mt-2 text-sm sm:text-base">
            Bikram Sambat ⇄ Anno Domini
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-orange-900/10 border border-orange-100 overflow-hidden">
          {/* Mode Toggle */}
          <div className="flex border-b border-orange-100">
            <button
              onClick={() => setConversionMode("BS-AD")}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-all duration-300 ${
                conversionMode === "BS-AD"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                  : "text-stone-500 hover:text-stone-700 hover:bg-orange-50"
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>BS → AD</span>
            </button>
            <button
              onClick={() => setConversionMode("AD-BS")}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-all duration-300 ${
                conversionMode === "AD-BS"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                  : "text-stone-500 hover:text-stone-700 hover:bg-orange-50"
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>AD → BS</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Input Section */}
            <div>
              <h2 className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-4">
                {conversionMode === "BS-AD" ? "Input (BS)" : "Input (AD)"}
              </h2>

              {conversionMode === "BS-AD" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-stone-600">
                      Year (वर्ष)
                    </label>
                    <input
                      type="number"
                      value={bsYear}
                      onChange={(e) => setBsYear(parseInt(e.target.value) || 2081)}
                      min="1970"
                      max="2100"
                      className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 bg-orange-50/50 text-stone-800 font-medium focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-stone-600">
                      Month (महिना)
                    </label>
                    <select
                      value={bsMonth}
                      onChange={(e) => setBsMonth(parseInt(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 bg-orange-50/50 text-stone-800 font-medium focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all cursor-pointer"
                    >
                      {nepaliMonths.map((month, index) => (
                        <option key={index} value={index}>
                          {month} ({nepaliMonthsNp[index]})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-stone-600">
                      Date (मिति)
                    </label>
                    <input
                      type="number"
                      value={bsDate}
                      onChange={(e) => setBsDate(parseInt(e.target.value) || 1)}
                      min="1"
                      max="32"
                      className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 bg-orange-50/50 text-stone-800 font-medium focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-stone-600">
                      Year
                    </label>
                    <input
                      type="number"
                      value={adYear}
                      onChange={(e) => setAdYear(parseInt(e.target.value) || 2024)}
                      min="1913"
                      max="2043"
                      className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 bg-orange-50/50 text-stone-800 font-medium focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-stone-600">
                      Month
                    </label>
                    <select
                      value={adMonth}
                      onChange={(e) => setAdMonth(parseInt(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 bg-orange-50/50 text-stone-800 font-medium focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all cursor-pointer"
                    >
                      {englishMonths.map((month, index) => (
                        <option key={index} value={index}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-stone-600">
                      Day
                    </label>
                    <input
                      type="number"
                      value={adDay}
                      onChange={(e) => setAdDay(parseInt(e.target.value) || 1)}
                      min="1"
                      max="31"
                      className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 bg-orange-50/50 text-stone-800 font-medium focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Divider with Arrow */}
            <div className="flex items-center justify-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
              <div className="mx-4 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
            </div>

            {/* Result Section */}
            <div>
              <h2 className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-4">
                {conversionMode === "BS-AD" ? "Result (AD)" : "Result (BS)"}
              </h2>

              {conversionMode === "BS-AD" ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                    <p className="text-xs uppercase tracking-wider text-orange-100 mb-1">
                      Full Date
                    </p>
                    <p className="text-lg sm:text-xl font-semibold">
                      {weekDays[convertedADDate.getDay()]},{" "}
                      {englishMonths[convertedADDate.getMonth()]}{" "}
                      {convertedADDate.getDate()}, {convertedADDate.getFullYear()}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                    <p className="text-xs uppercase tracking-wider text-stone-400 mb-1">
                      Short Format
                    </p>
                    <p className="text-lg font-semibold text-stone-700">
                      {convertedADDate.getMonth() + 1}/{convertedADDate.getDate()}/{convertedADDate.getFullYear()}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                    <p className="text-xs uppercase tracking-wider text-stone-400 mb-1">
                      ISO Format
                    </p>
                    <p className="text-lg font-semibold text-stone-700">
                      {convertedADDate.getFullYear()}-
                      {String(convertedADDate.getMonth() + 1).padStart(2, "0")}-
                      {String(convertedADDate.getDate()).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-stone-800 text-white text-center">
                      <p className="text-xs uppercase tracking-wider text-stone-400 mb-1">Day</p>
                      <p className="text-2xl font-bold">{convertedADDate.getDate()}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-stone-800 text-white text-center">
                      <p className="text-xs uppercase tracking-wider text-stone-400 mb-1">Weekday</p>
                      <p className="text-2xl font-bold">{weekDays[convertedADDate.getDay()].slice(0, 3)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                    <p className="text-xs uppercase tracking-wider text-orange-100 mb-1">
                      Full Date (English)
                    </p>
                    <p className="text-lg sm:text-xl font-semibold">
                      {convertedBSDate.format("ddd, DD MMMM YYYY")}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                    <p className="text-xs uppercase tracking-wider text-stone-400 mb-1">
                      Full Date (Nepali)
                    </p>
                    <p className="text-lg font-semibold text-stone-700">
                      {convertedBSDate.format("ddd, DD MMMM YYYY", "np")}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                    <p className="text-xs uppercase tracking-wider text-stone-400 mb-1">
                      Nepali Format
                    </p>
                    <p className="text-lg font-semibold text-stone-700">
                      {convertedBSDate.format("YYYY/MM/DD")}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-stone-800 text-white text-center">
                      <p className="text-xs uppercase tracking-wider text-stone-400 mb-1">Year</p>
                      <p className="text-2xl font-bold">{convertedBSDate.getYear()}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-stone-800 text-white text-center">
                      <p className="text-xs uppercase tracking-wider text-stone-400 mb-1">Month</p>
                      <p className="text-2xl font-bold">{nepaliMonths[convertedBSDate.getMonth()].slice(0, 3)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-stone-400 text-sm mt-6">
          Built with precision for accurate date conversions
        </p>
      </div>
    </div>
  );
};

export default DateConverter;
