export const staffs = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@egmail.com",
    image: "./assets/dr-alex.png",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@egmail.com",
    image: "./assets/dr-maria.png",
  },
];

export const services = [
  {
    id: 1,
    name: "Oral Hygiene",
    image: "./assets/hygiene.png",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Implants",
    image: "./assets/implants.png",
    duration: "1 hour 30 minutes",
    price: 120.0,
  },
];

export const timeOptions = [
  {
    service: 1,
    options: [
      {
        startDate: "09:00",
        endDate: "10:00",
      },
      {
        startDate: "10:00",
        endDate: "11:00",
      },
      {
        startDate: "11:00",
        endDate: "12:00",
      },
    ],
  },
  {
    service: 2,
    options: [
      {
        startDate: "09:00",
        endDate: "10:30",
      },
      {
        startDate: "10:30",
        endDate: "12:00",
      },
      {
        startDate: "12:00",
        endDate: "13:30",
      },
    ],
  },
];
