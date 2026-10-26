# KlickStore

KlickStore is a static electronics storefront (HTML, CSS, JavaScript) packaged with Docker so you can practice containerization and deploy the same image on an AWS EC2 instance.

---

## Technologies Used

- HTML, CSS, JavaScript
- Docker and nginx (Alpine)
- Git
- AWS EC2 (deployment target)

---

## Folder Structure

```
klickstore/
├── index.html
├── products.html
├── about.html
├── contact.html
├── login.html
├── README.md
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── .dockerignore
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    ├── laptop.jpg
    ├── smartphone.jpg
    ├── smartwatch.jpg
    ├── speaker.jpg
    └── mouse.jpg
```

---

## Run locally with Docker

Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine), then from this folder:

```bash
docker build -t klickstore .
docker run -d -p 8080:80 --name klickstore klickstore
```

Open http://localhost:8080

Stop and remove the container:

```bash
docker stop klickstore
docker rm klickstore
```

Or use Compose:

```bash
docker compose up -d --build
```

Compose maps host port **80**. If that port is already in use, change `"80:80"` in `docker-compose.yml` to `"8080:80"`.

---

## Deploy on AWS EC2

These steps assume an Ubuntu Amazon EC2 instance. Use a security group that allows inbound **SSH (22)** and **HTTP (80)** from your IP (or `0.0.0.0/0` for a public demo).

1. Launch an EC2 instance (Amazon Linux 2023 or Ubuntu 22.04). Choose a free-tier type such as `t2.micro` / `t3.micro`.
2. SSH in:

   ```bash
   ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
   ```

   On Amazon Linux the user is often `ec2-user`.

3. Install Docker:

   **Ubuntu**

   ```bash
   sudo apt-get update
   sudo apt-get install -y docker.io docker-compose-v2
   sudo usermod -aG docker $USER
   newgrp docker
   ```

   **Amazon Linux 2023**

   ```bash
   sudo dnf update -y
   sudo dnf install -y docker
   sudo systemctl enable --now docker
   sudo usermod -aG docker $USER
   newgrp docker
   ```

4. Copy the project to the instance (from your laptop):

   ```bash
   scp -i your-key.pem -r . ubuntu@YOUR_EC2_PUBLIC_IP:~/klickstore
   ```

   Or clone the Git repository on the instance if you have one.

5. Build and run:

   ```bash
   cd ~/klickstore
   docker compose up -d --build
   ```

6. Open `http://YOUR_EC2_PUBLIC_IP` in a browser.

The container listens on port 80. nginx serves the static files inside the image, so you do not need to install a web server on the host.

---

## Features

- Home, Products, About, Contact, and Login pages
- Product photos for each listed item
- Responsive layout
- Docker image for local practice and EC2 hosting
