const MONTHS = [
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

export function getDisplayDateOrTime(date: Date): string {
    console.log(date);

    const now = new Date();

    const isToday = now.toDateString() === date.toDateString(); // Simplified date comparison

    if (isToday) {
        return `${date.getHours().toString().padStart(2, "0")}:${
            date.getMinutes().toString().padStart(2, "0")
        }`;
    }

    const year = date.getFullYear();

    return `${MONTHS[date.getMonth()]} ${date.getDate()}${
        year < now.getFullYear() ? ", " + year : ""
    }`;
}
