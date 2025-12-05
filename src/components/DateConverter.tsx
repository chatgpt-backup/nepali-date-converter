import { useState } from "react";
import NepaliDate from "nepali-date-converter";
import { Calendar, ArrowRight, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type ConversionMode = "BS-AD" | "AD-BS";

const DateConverter = () => {
  const [conversionMode, setConversionMode] = useState<ConversionMode>("BS-AD");
  const [bsYear, setBsYear] = useState(2081);
  const [bsMonth, setBsMonth] = useState(8);
  const [bsDate, setBsDate] = useState(19);
  const [adDate, setAdDate] = useState(new Date());

  const nepaliMonths = [
    "Baisakh",
    "Jestha",
    "Asar",
    "Shrawan",
    "Bhadra",
    "Aswin",
    "Kartik",
    "Mangsir",
    "Poush",
    "Magh",
    "Falgun",
    "Chaitra",
  ];

  const nepaliMonthsNp = [
    "बैशाख",
    "जेष्ठ",
    "आषाढ",
    "श्रावण",
    "भाद्र",
    "आश्विन",
    "कार्तिक",
    "मंसिर",
    "पौष",
    "माघ",
    "फाल्गुण",
    "चैत्र",
  ];

  const englishMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getADFromBS = (): Date => {
    try {
      const nepaliDate = new NepaliDate(bsYear, bsMonth, bsDate);
      return nepaliDate.toJsDate();
    } catch (error) {
      return new Date();
    }
  };

  const getBSFromAD = (): NepaliDate => {
    try {
      return NepaliDate.fromAD(adDate);
    } catch (error) {
      return new NepaliDate();
    }
  };

  const convertedADDate = getADFromBS();
  const convertedBSDate = getBSFromAD();

  const handleADDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdDate(new Date(e.target.value));
  };

  const formatADDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-warm rounded-2xl shadow-glow">
              <Calendar className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3">
            Date Converter
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light">
            <span className="text-gradient font-medium">Bikram Sambat</span>
            <span className="mx-3 text-primary">⇄</span>
            <span className="text-gradient font-medium">Anno Domini</span>
          </p>
        </header>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-3xl shadow-medium border border-border/50 overflow-hidden animate-slide-up">
            {/* Mode Toggle */}
            <div className="p-2 bg-muted/50">
              <div className="flex gap-2">
                <ModeButton
                  active={conversionMode === "BS-AD"}
                  onClick={() => setConversionMode("BS-AD")}
                  icon={<Sun className="w-4 h-4" />}
                  label="BS → AD"
                  sublabel="विक्रम संवत् to Gregorian"
                />
                <ModeButton
                  active={conversionMode === "AD-BS"}
                  onClick={() => setConversionMode("AD-BS")}
                  icon={<Moon className="w-4 h-4" />}
                  label="AD → BS"
                  sublabel="Gregorian to विक्रम संवत्"
                />
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Input Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {conversionMode === "BS-AD" ? "Input (BS)" : "Input (AD)"}
                  </h2>
                </div>

                {conversionMode === "BS-AD" ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                      label="Year (वर्ष)"
                      type="number"
                      value={bsYear}
                      onChange={(e) => setBsYear(parseInt(e.target.value) || 2081)}
                      min={1970}
                      max={2100}
                    />
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Month (महिना)
                      </label>
                      <select
                        value={bsMonth}
                        onChange={(e) => setBsMonth(parseInt(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 appearance-none cursor-pointer"
                      >
                        {nepaliMonths.map((month, index) => (
                          <option key={index} value={index} className="bg-card text-foreground">
                            {month} ({nepaliMonthsNp[index]})
                          </option>
                        ))}
                      </select>
                    </div>
                    <InputField
                      label="Date (मिति)"
                      type="number"
                      value={bsDate}
                      onChange={(e) => setBsDate(parseInt(e.target.value) || 1)}
                      min={1}
                      max={32}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={formatADDate(adDate)}
                      onChange={handleADDateChange}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    />
                  </div>
                )}
              </div>

              {/* Arrow Divider */}
              <div className="flex items-center justify-center my-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="mx-4 p-2 bg-primary rounded-full shadow-glow animate-pulse">
                  <ArrowRight className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>

              {/* Result Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {conversionMode === "BS-AD" ? "Result (AD)" : "Result (BS)"}
                  </h2>
                </div>

                <div className="bg-gradient-subtle rounded-2xl border border-border/50 p-6 space-y-4">
                  {conversionMode === "BS-AD" ? (
                    <>
                      <ResultRow
                        label="Full Date"
                        value={`${weekDays[convertedADDate.getDay()]}, ${
                          englishMonths[convertedADDate.getMonth()]
                        } ${convertedADDate.getDate()}, ${convertedADDate.getFullYear()}`}
                        highlight
                      />
                      <ResultRow
                        label="ISO Format"
                        value={`${convertedADDate.getFullYear()}-${String(
                          convertedADDate.getMonth() + 1
                        ).padStart(2, "0")}-${String(convertedADDate.getDate()).padStart(
                          2,
                          "0"
                        )}`}
                      />
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <StatBox label="Day" value={String(convertedADDate.getDate())} />
                        <StatBox
                          label="Weekday"
                          value={weekDays[convertedADDate.getDay()].slice(0, 3)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <ResultRow
                        label="Full Date (English)"
                        value={convertedBSDate.format("ddd, DD MMMM YYYY")}
                        highlight
                      />
                      <ResultRow
                        label="Full Date (Nepali)"
                        value={convertedBSDate.format("ddd, DD MMMM YYYY", "np")}
                      />
                      <ResultRow
                        label="Nepali Format"
                        value={convertedBSDate.format("YYYY/MM/DD")}
                      />
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <StatBox label="Year" value={String(convertedBSDate.getYear())} />
                        <StatBox
                          label="Month"
                          value={nepaliMonths[convertedBSDate.getMonth()].slice(0, 3)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-8 animate-fade-in">
            Built with ❤️ for the Nepali community
          </p>
        </div>
      </div>
    </div>
  );
};

interface ModeButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}

const ModeButton = ({ active, onClick, icon, label, sublabel }: ModeButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
      active
        ? "bg-gradient-warm text-primary-foreground shadow-glow"
        : "bg-transparent text-muted-foreground hover:bg-secondary/50"
    )}
  >
    {icon}
    <div className="text-left">
      <div className="font-semibold text-sm">{label}</div>
      <div className={cn("text-xs", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
        {sublabel}
      </div>
    </div>
  </button>
);

interface InputFieldProps {
  label: string;
  type: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

const InputField = ({ label, type, value, onChange, min, max }: InputFieldProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-foreground">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
    />
  </div>
);

interface ResultRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

const ResultRow = ({ label, value, highlight }: ResultRowProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span
      className={cn(
        "font-medium",
        highlight ? "text-lg md:text-xl text-gradient font-display" : "text-foreground"
      )}
    >
      {value}
    </span>
  </div>
);

interface StatBoxProps {
  label: string;
  value: string;
}

const StatBox = ({ label, value }: StatBoxProps) => (
  <div className="bg-card rounded-xl p-4 text-center border border-border/50">
    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</div>
    <div className="text-2xl font-display font-bold text-foreground">{value}</div>
  </div>
);

export default DateConverter;
