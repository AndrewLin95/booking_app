### Technologies

##### Front-End

- Typescript
- React
- MUI Icons

##### Back-End

- NodeJs
- MongoDB

# To Run Project

1. create a `.env` file with a mongoURI

2. cd into server and run

   > npm run dev

3. cd into client and run
   > npm run start

### Features:

1. Ability to create Guest and Staff Profiles and Service Profiles
2. Ability to create Appointments by pulling in information from Guests, Staffs and Services.
3. Ability to modify Appointments (Edit, Cancel, Complete)
4. Ability to filter the appointments by:
   1. All Dates
   2. Specific Dates
   3. Completed Appointments
   4. Cancelled Appointments
5. Prevents double-booking staffs. Once an appointment is cancelled or completed, the staff can be re-booked.

### Database:

- The database is separated into four different collections, one for each category (Guests, Staffs, Services, Appointments)
- The Appointments schema is: ![Alt](https://cdn.discordapp.com/attachments/746933047760519202/1050854308725407854/image.png)

### Areas to Improve

1. Move API calls into a separate folder and import where it is required

2. Loading Skeleton for fetch requests

3. User feedback on successful server calls (ie. once entries are added, animate the response)

4. Add roles to give staff permissions to certain services

5. Add validation to allow for "working hours" to be booked.

6. Add validation to prevent booking before the current date
