# RouteSense AI - Admin Dashboard

## Objective

Develop a simple Emergency Control Dashboard for administrators.

The dashboard will monitor emergency SOS requests and allow administrators to respond in real time.

The goal is NOT to build a complete disaster management platform.

The goal is to demonstrate emergency monitoring using Socket.IO and real-time updates.

---

# Main Features

## 1. Admin Login

Create an Admin Login page.

Only users with role = admin can access the dashboard.

Pages

frontend/src/pages/AdminLogin.jsx

frontend/src/pages/AdminDashboard.jsx

Backend

admin.routes.js

admin.controller.js

admin.middleware.js

---

## 2. Live SOS Feed (Highest Priority)

Whenever any user presses SOS,

The Admin Dashboard immediately receives

Socket Event

sos:new

Display

--------------------------------
🚨 Emergency SOS
--------------------------------

User ID

Latitude

Longitude

Time

Status

Buttons

[View on Map]

[Acknowledge]

[Resolve]

Newest SOS appears at the top.

---

Backend

Already available

sos.controller.js

Socket

io.to("admins").emit("sos:new", ...)

No major backend changes required.

---

Frontend

Create

components/admin/SOSFeed.jsx

Socket Listener

socket.on("sos:new")

Maintain

const [emergencies, setEmergencies]

Display newest first.

---

## 3. Acknowledge SOS (Most Important)

Admin clicks

[Acknowledge]

Backend

New API

PATCH

/api/admin/sos/:id/acknowledge

Status changes

Pending

↓

Acknowledged

Backend sends

notification:new

to

user:<userId>

Notification

🚑 SOS Received

Emergency team has acknowledged your request.

Help is on the way.

User immediately sees notification.

---

Files

backend/controllers/admin.controller.js

backend/routes/admin.routes.js

backend/services/admin.service.js

frontend/components/admin/SOSFeed.jsx

---

## 4. Resolve SOS

Admin clicks

Resolve

PATCH

/api/admin/sos/:id/resolve

Status

Acknowledged

↓

Resolved

Notify User

✅ Emergency Closed

Your emergency request has been marked as resolved.

---

Files

Same as above.

---

## 5. Dashboard Statistics

Top cards

Total SOS Today

Pending SOS

Resolved SOS

Active Users (optional)

Example

------------------------

🚨 12

SOS Today

------------------------

⏳ 2

Pending

------------------------

✅ 10

Resolved

------------------------

👥 18

Online Users

------------------------

---

Frontend

AdminDashboard.jsx

Backend

GET

/api/admin/dashboard

Returns

{
totalSOS,
pendingSOS,
resolvedSOS
}

---

## 6. Emergency Map

Display

Leaflet Map

Place markers

Every active SOS

Click marker

Popup

User

Time

Status

Latitude

Longitude

---

Reuse

LeafletMap

No routing required.

---

## 7. Notification Panel

Admin receives

New SOS

Only

NOT

Share

NOT

AI

NOT

Hospital

Only emergency notifications.

---

## 8. Emergency History

Simple table

Date

User

Status

Message

Search optional.

---

Future Scope

(Not implemented now)

---

Flood Reporting

Users can report

Flood

Fire

Road Block

Upload image

GPS

When

5+

reports

within

200m

Create Disaster Zone

Automatically appears on User Dashboard.

---

Road Hazard Voting

Potholes

Trees

Accidents

Construction

Community verified.

---

AI Incident Summary

Admin clicks

Generate Summary

Gemini

summarizes

all SOS

for today.

---

Analytics

Charts

SOS/day

Floods

Most dangerous locations

Average response time

---

Priority Order

⭐⭐⭐⭐⭐

1.

Live SOS Feed

⭐⭐⭐⭐⭐

2.

Acknowledge SOS

⭐⭐⭐⭐

3.

Resolve SOS

⭐⭐⭐⭐

4.

Dashboard Statistics

⭐⭐⭐

5.

Emergency Map

⭐⭐

6.

History

Everything else is Future Scope.
