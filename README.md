# CineStream Backend

Backend para una plataforma web de películas, desarrollada con **Node.js**, **Express**, **Sequelize** y **PostgreSQL**.
Permite gestionar películas y sus relaciones (actores, directores, compañías, géneros, idiomas) y cuenta con autenticación por roles (admin/viewer).

---

## ✨ Características

* CRUD completo para:

  * Películas (con relaciones a otras tablas)
  * Actores, Directores, Compañías, Géneros, Idiomas
* Autenticación JWT y encriptación de contraseña con bcryptjs
* Roles: `admin` (modifica todo) y `viewer` (solo consulta)
* Validaciones al crear/editar películas
* Sequelize ORM + PostgreSQL

---

## 🌐 Endpoints principales

| Método | Ruta                          | Descripción                    |
| ------ | ----------------------------- | ------------------------------ |
| POST   | `/api/auth/login`             | Login usuario                  |
| POST   | `/api/auth/register`          | Registro (solo uso manual)     |
| GET    | `/api/peliculas`              | Lista de películas             |
| GET    | `/api/peliculas/:id`          | Obtener película por ID        |
| POST   | `/api/peliculas`              | Crear película (solo admin)    |
| PUT    | `/api/peliculas/:id`          | Editar película (solo admin)   |
| DELETE | `/api/peliculas/:id`          | Eliminar película (solo admin) |
| GET    | `/api/peliculas/buscar?q=...` | Buscar películas               |
| GET    | `/api/peliculas/recomendadas` | Top 5 por calificación         |

Tablas relacionadas también tienen rutas similares bajo `/api/actores`, `/api/directores`, etc.

---

## 🚀 Instalación local

1. Clonar repositorio:

```bash
git clone https://github.com/arguniajc/CineStream_Backend.git
cd CineStream_Backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` con:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=CineStream
DB_USER=postgres
DB_PASSWORD=Siesa*2023
JWT_SECRET=tu_clave_secreta
```

4. Ejecutar migraciones y seeds:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

5. Iniciar servidor:

```bash
node server.js
```

---

## 🔑 Usuarios por defecto (desde seeders)

| Rol    | Email                                     | Password |
| ------ | ----------------------------------------- | -------- |
| admin  | [admin@cine.com](mailto:admin@cine.com)   | 123456   |
| viewer | [viewer@cine.com](mailto:viewer@cine.com) | 123456   |

---

## 📱 Herramientas utilizadas

* **Node.js / Express** - Framework principal
* **Sequelize** - ORM con soporte para PostgreSQL
* **PostgreSQL** - Base de datos relacional
* **bcryptjs / jsonwebtoken** - Seguridad
* **Postman** - Pruebas de APIs (se incluye colección opcional)

---

## ✅ Estado del proyecto

☑️ Backend funcional y probado (100%)

---

## 🌟 Autor

* **Diego Fernando Salazar**
  ✨ Proyecto CineStream 2025
