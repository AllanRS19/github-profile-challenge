export const calculateTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((+now - +date) / 1000);

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    const ranges: [number, Intl.RelativeTimeFormatUnit][] = [
        [60, "second"],     // 60s
        [3600, "minute"],   // 60m
        [86400, "hour"],    // 24h
        [604800, "day"],    // 7d
        [2592000, "week"],  // ~30d
        [31536000, "month"],// ~365d
    ];

    for (let i = 0; i < ranges.length; i++) {
        if (seconds < ranges[i][0]) {
            const divisor = i === 0 ? 1 : ranges[i - 1][0];
            return `updated ${rtf.format(-Math.floor(seconds / divisor), ranges[i - 1][1])}`;
        }
    }

    return `updated ${rtf.format(-Math.floor(seconds / 31536000), "year")}`;
}