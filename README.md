
# Photo agency CRM

This project is a complete service with a landing page for attracting customers, CRM [^1] system for employee interaction and REST API backend with database. 

## Used By

App was developed for a current photo agency [**cyp.photo**](https://cyp.photo) that organises photo shoots for visitors to European cities.

[^1]: _CRM - customer relationship management software is a system for managing your relationships with customers._

## Development time

- **3 weeks** (15.08.2022 - 05.09.2022)

## Features

- 10 steps of the business process
- 3 roles for employees
- 12 Manager pages
- 7 Photographer pages
- 5 Editor pages
- Add, update and delete users
- Internal communication
- Email alerts
- Statistics

## Team

- [Vladimir Polansky](https://github.com/vovoka-path) _as team lead_ | **CRM system, app logic, page views and Agile flow**
- [Pavel Lebedev](https://github.com/pavel1303) | **Server, Database, CRM system**
- [Elena Kuznetsova](https://github.com/Elena-code-dev) | **Web page**

> We are very proud that we were able to implement such a complex project in a short time by a team of people who had not known each other before!

## Stack

#### CRM system:
- Javascript
- Webpack
- Chart.js

#### Server:
- Node.js
- Express 
- MongoDB
- Mongoose

#### Web page:
- Typescript
- Bootstrap

#### Work flow:
- Scrum (use Kanban board for sprints)
- [Github Projects](https://github.com/users/vovoka-path/projects/1)
- Discord for meetings
- Figma

## Code

> - [CRM app](https://github.com/vovoka-path/rs-clone/tree/develop/crm)
> - [Server](https://github.com/vovoka-path/rs-clone/tree/develop/server)
> - [Web page](https://github.com/vovoka-path/rs-clone/tree/develop/web)

## Deploy

> - [CRM app](https://vovoka-path.github.io/rs-clone/crm/)
> - Server on [Render hosting](https://render.com)
> - [Web page](https://vovoka-path.github.io/rs-clone/web/web/)

## Login/password
Attention! Please, `DO NOT DELETE` these users! You can create a new employee, then delete them.

> - Manager: **manager** / **qweasdzxcqweasdzxc**
> - Photogrpher: **alex** / **qweasdzxcqweasdzxc**
> - Editor: **nataly** / **qweasdzxcqweasdzxc**

## Presentation

> - [Video on Youtube](https://youtu.be/F9-kDCBdz2A)

## Screnshots

Screnshot 1:
![CRM-1](https://user-images.githubusercontent.com/76701292/212986314-24a9e3bb-8100-4ddf-a26a-1decca622fbb.jpg)

Screnshot 2:
![CRM-1-1](https://user-images.githubusercontent.com/76701292/212986483-fe6e1aed-b14a-4bd8-a13e-106c120bd242.jpg)

## Details

#### CRM system
- [x] employee registration
- [x] authorization of employees, saving of authorization between sessions
- [x] edit/delete employees
- [x] ordering via CRM
- [x] manager cabinet - 12 pages
- [x] photographer cabinet - 7 pages
- [x] editor cabinet - 5 pages
- [x] statistic page
- [x] sending messages between employees
- [x] auto sending email alerts to employees and to customers
- [x] adaptive layout for mobile, tablet and desktop
- [x] babel, eslint, webpack
- [x] SPA
- [x] MVC pattern
- [x] component-based approach

#### Server

- [x] authentication/registration/identification/authorization
- [x] different access for roles
- [x] handle new order
- [x] email templates and sending alerts to client and to employees
- [x] REST API
- [x] microservice architecture
- [x] MVC pattern
- [x] the server gives correct answers, gives HTTP errors - you can understand what happened, write readable logs

#### Web page

- [x] booking form
- [x] quiz and sending results
- [x] use bootstrap
- [x] babel, eslint, webpack
- [x] adaptive layout for mobile, tablet and desktop

## Workflow design

Figma screenshot:
![cabs](https://user-images.githubusercontent.com/76701292/213017049-f00bcdb8-f5f7-4e17-bca0-a664a38e3fa3.png)
