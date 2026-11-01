# 📝 Conduit RealWorld Example App

![Node.js](https://img.shields.io/badge/node-22.x-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL%2016-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/database_runtime-Docker-2496ED?logo=docker&logoColor=white)
![Sequelize](https://img.shields.io/badge/ORM-Sequelize-52B0E7?logo=sequelize&logoColor=white)

A fullstack "RealWorld" (Medium.com clone) implementation built with **React**, **Express.js**, **Sequelize**, and **PostgreSQL**.

**Hybrid dev setup:** PostgreSQL runs in Docker; the Node application runs natively. You get a pinned, isolated database plus native hot-reload — no volume-mount HMR penalty on macOS/Windows, no local database install.

## 📚 Contents

- [Prerequisites](#-prerequisites)
- [Quick start](#-quick-start)
- [How it works](#️-how-it-works)
- [Scripts](#-scripts)
- [Environment variables](#-environment-variables)
- [Daily workflow](#-daily-workflow)
- [Database](#️-database)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Repo layout](#-repo-layout)

## ✅ Prerequisites

- **Git**
- **Node.js 22** — via [nvm](https://github.com/nvm-sh/nvm), [fnm](https://github.com/Schniz/fnm), [asdf](https://asdf-vm.com/), [Volta](https://volta.sh/), [mise](https://mise.jdx.dev/), your OS package manager, or any other mechanism. The repo declares its required version in `.nvmrc` and `package.json` → `engines`, so most version managers will switch automatically on `cd`.
- **Docker** — Docker Desktop, Colima, or any Docker Engine

You do **not** need PostgreSQL installed on your system — it comes from Docker.

## 🚀 Quick start

```bash
git clone <repo-url>
cd conduit-realworld-example-app

# ensure Node 22 is active — whichever is installed:
nvm use          #   or: fnm use / mise use / asdf install / volta install

cp backend/.env.example backend/.env
npm run setup
npm run dev
```
