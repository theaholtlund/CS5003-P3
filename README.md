# Holiday Planner Application

The program allows users to plan a holiday, showing activities in a map. The user can then create their own itineraries, add and delete activities and more.

### Development Server

Start the server for development:

```bash
npm run dev
```

Start the server regularly run:

```bash
npm i
```

```bash
npm start
```

Server runs on localhost:5000

### Testing Functionality

To test the program, begin by searching in the St Andrews area. In the activity search form, enter the following details:

- Latitude: 56.3398
- Longitude: -2.7967
- Search Radius: 5000

For the activity type picking either Monuments, accommodation or parks will result in you seeing three orange pop ups. These represent the user data, and the red ones represent API data.

Clicking on any of the orange pop ups will show a detail button, where you can view the details of the activity, it's comments, add a comment yourself if you are logged in and add it to your itinerary. The submission form can be used to add activities, but you must be logged in and fill out every field.

The filter search form allows you to narrow all locations based on their activities. Leave categories blank if you do not want to filter by that specific category.

The recommendation results section will fill up once you search for a location.

Clicking on my page will allow you to view the activities you made, and delete them if you need to.

Clicking on itinerary will show you activities you have added to your schedule. There is more about this in the full report.
