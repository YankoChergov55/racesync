# 🏎️ RaceSync

A service that collects and organizes **upcoming motorsport races** across major championships. Users can track events,
follow favorites, and (eventually) see results — all through a clean API that different apps and frontends can connect
to.

---

## 🚀 Why?

Motorsport fans often follow multiple championships (F1, WEC, etc.), but race dates are scattered across different
websites and sources. This project aims to provide **one convenient place** to track them all.

---

## 🎯 Target Audience

Fans who want to keep up with **multiple motorsport championships** without juggling multiple calendars, apps, or
websites.

---

## 📚 Behind the Project

This isn’t just about motorsport. The tracker is also a **training ground** for backend mastery. It’s designed to
practice and reinforce skills across several advanced areas of backend development:

- **Dockerization** → packaging the API into containers for deployment and scalability
- **Role-Based Access Control (RBAC)** → managing user/admin privileges cleanly
- **File Uploads** → attaching images (e.g., race posters, track layouts) to races
- **Structured Logging** → using Pino to capture meaningful logs for debugging and monitoring
- **CI/CD Pipelines** → setting up automated testing, builds, and deployments

The project is part of a larger **backend developer journey** (see \[training roadmap]), where each build sharpens
skills and adds another piece to the bigger picture — from databases and authentication to cloud, observability, and
system architecture.

---

## 🎓 Learning Objectives

By completing this project, the developer will:

- Strengthen **TypeScript + Express** fundamentals for building scalable APIs
- Deepen database skills with **PostgreSQL + Prisma**
- Implement **RBAC** to manage different user privileges securely
- Gain hands-on experience with **file uploads** and storage patterns
- Apply **structured logging** for debugging and observability
- Learn how to **dockerize** an application for portability
- Set up **CI/CD pipelines** to automate testing, building, and deployment
- Build discipline in documenting and versioning APIs for future integrations

---

## 🛠️ Tech Stack

- **Backend**: [Express](https://expressjs.com/) + [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) + [Prisma](https://www.prisma.io/)
- **Validation**: [Zod](https://zod.dev/)
- **Auth**: JWT
- **Logging**: [Pino](https://getpino.io/)
- **Code Quality**: ESLint + Prettier

---

## 📦 Entities

👤 Users

- `username`
- `email`
- `password`
- `role` (e.g. user, admin)

🏁 Races

- `championship` (F1, WEC, etc.)
- `type` (qualifying, race, etc.)
- `location`
- `start_time`
- `finished` (boolean)

---

## 📡 API Routes (wip)

### Races

- `POST /races/create` → _(admin)_ add an upcoming race
- `PUT /races/edit/:id` → _(admin)_ edit race details
- `DELETE /races/delete/:id` → _(admin)_ remove a race
- `POST /races/follow/:id` → follow a race for a given user
- `GET /races/:id` → get race by id
- `GET /races/params` → get a list of params based on parameters

---

## 🥅 Goal

Build a flexible API-first platform for motorsport tracking

---
