# Taskify

Taskify is a task management web application where users can create an account, log in, and manage their tasks. Users can create tasks by specifying a title, description, priority level, status, and due date, helping them stay organized and keep track of their tasks effectively.

## Tech Stack

**Frontend:** React, Redux, TailwindCSS, shadcn/ui

**Backend:** Django, Django REST Framework

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

In frontend

`VITE_BASE_URL` is backend url `http://127.0.0.1:8000`

in backend

`SECRET_KEY` django need a key you can give any string

## Run Locally

Clone the repository:

```bash
  git clone https://github.com/Lohit-Behera/taskify.git
  cd  taskify
```

**Running using [Docker](https://www.docker.com/)**

in root directory

```bash
  docker compose up
```

Then go to [localhost:5173](http://localhost:5173/) for frontend and [localhost:8000](http://localhost:8000/) for backend

**Installation without Docker**

In root directory
Create Python virtual environment using [virtualenv](https://virtualenv.pypa.io/en/latest/):

```bash
  pip install virtualenv
```

```bash
  python -m venv myenv
```

```bash
  myenv\Scripts\activate
```

install python libraries

```bash
  cd backend
```

```bash
  pip install -r requirements.txt
```

Start the server

```bash
  python manage.py makemigrations
```

```bash
  python manage.py migrate
```

```bash
  python manage.py runserver
```

In another terminal for React js

```bash
  cd taskify
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
