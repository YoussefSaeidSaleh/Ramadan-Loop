export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface PrayerApiResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimings;
    date: {
      readable: string;
      timestamp: string;
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string; days: number };
        year: string;
        designation: { abbreviated: string; expanded: string };
        holidays: string[];
      };
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string };
        month: { number: number; en: string };
        year: string;
        designation: { abbreviated: string; expanded: string };
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
        params: { Fajr: number; Isha: number };
      };
    };
  };
}

const BASE_URL = "https://api.aladhan.com/v1";

// For better security and organization, you can centralize settings here
export const PRAYER_CONFIG = {
  city: "Cairo",
  country: "Egypt",
  method: 5, // Egyptian General Authority of Survey
};

export async function fetchPrayerTimings(
  dateStr?: string,
): Promise<PrayerApiResponse> {
  const date = dateStr || getFormattedDate(new Date());
  const { city, country, method } = PRAYER_CONFIG;

  const response = await fetch(
    `${BASE_URL}/timingsByCity/${date}?city=${city}&country=${country}&method=${method}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch prayer timings");
  }

  return response.json();
}

function getFormattedDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
