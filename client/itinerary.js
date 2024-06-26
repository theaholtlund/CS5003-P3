// Module code: CS5003
// Module: Masters Programming Projects
// Itinerary: Creating a Holiday Planner
//Reference(https://www.youtube.com/watch?v=_Kdbs4iukcM)

const calendar = document.getElementById("calendar");

const monthElement = document.getElementById("month");
//Store all the months
const months = [
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

//Store all the days
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//to extract added activies from database
const addedActivities = "http://localhost:5000/user-itinerary-get";

let events;

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

//to load activities from database
const loadActivities = async () => {
  const res = await fetch(addedActivities);
  const data = await res.json();
  console.log(data);
  events = data.reduce((accumulator, event) => {
    const evnetTime = new Date(event.actitivity_date);
    const eventDate = new Date(evnetTime.toDateString());
    console.log(evnetTime);
    console.log(eventDate);

    accumulator[eventDate] = event; //to store all the saved activities using accumulator
    return accumulator;
  }, {});
  updateCalendar(currentMonth, currentYear, events);
  /*
    const activity = data;
    const events = activity.reduce((accumulator, event)=>{
        const eventTime = new Date (event.content.time);
        const eventDate = new Date(eventTime.toDateString());
        console.log(eventDate);
    })*/
  console.log(events);
};
loadActivities();

const drawBlankCalendar = () => {
  //to create calander in 7 x 5 (35 boxes)
  for (let i = 0; i < 35; i++) {
    const day = document.createElement("div");
    day.classList.add("day");

    const dayText = document.createElement("p");
    dayText.classList.add("day-text");
    dayText.innerText = days[i % 7];

    const dayNumber = document.createElement("p");
    dayNumber.classList.add("day-number");

    const eventName = document.createElement("small");
    eventName.classList.add("event-name");

    day.appendChild(dayText);
    day.appendChild(dayNumber);
    day.appendChild(eventName);
    console.log(day);
    calendar.appendChild(day);
  }
};

//to update calendar
const updateCalendar = (month, year, events) => {
  const dayElements = document.querySelectorAll(".day");

  const theFirst = new Date();
  theFirst.setMonth(month); //set the month using the first day (first day of the chosen month)
  theFirst.setYear(year); //set the month using the year

  const theFirstDayOfWeek = theFirst.getDay();
  const monthName = months[month]; //Take month name from the months array
  const monthWithYear = `${year} - ${monthName}`; //combine year and month
  monthElement.innerText = monthWithYear;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let dayCounter = 1;
  for (let i = 0; i < dayElements.length; i++) {
    const day = dayElements[i]; //day box
    /*
        const dayText = day.querySelector('.day-text');
        dayText.innerText= days[i % 7];
        */
    const dayNumber = day.querySelector(".day-number"); //to diaplay date
    if (i >= theFirstDayOfWeek && dayCounter <= daysInMonth) {
      const theDate = new Date(year, month, dayCounter);

      const eventName = day.querySelector(".event-name");
      if (events[theDate]) {
        const event = events[theDate];
        eventName.innerHTML = `*${event.actitivity_name}`;
      } else {
        //to show the event only on teh designated date
        eventName.innerHTML = ``;
      }
      console.log(theDate);
      dayNumber.innerText = dayCounter;
      dayCounter++;
    } else {
      dayNumber.innerText = "";
    }
  }
};

const lastMonth = () => {
  //To display the last Month]
  if (currentMonth === 0) {
    // To go to the last year
    currentMonth = 12;
    currentYear--;
  }
  updateCalendar(--currentMonth, currentYear, events); //To move to the last month
};
const nextMonth = () => {
  // To display the next month
  if (currentMonth === 11) {
    //To move ton the next year
    currentMonth = -1;
    currentYear++;
  }
  updateCalendar(++currentMonth, currentYear, events); //To move to the next month
};

const loading = async () => {
  //To make sure it is loading events
  drawBlankCalendar();
  updateCalendar(currentMonth, currentYear, {});
  await loadActivities();
};
loading();
