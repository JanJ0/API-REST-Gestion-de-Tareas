# API REST de Gestión de Tareas

Proyecto Final de Back-end desarrollado para el curso COMP2052.WEB DEV SERV-SIDE & MICROSER BKE.

## Descripción

Esta API REST permite registrar usuarios, iniciar sesión, autenticar solicitudes mediante JWT y gestionar tareas personales. Cada tarea pertenece a un usuario autenticado, por lo que cada usuario solo puede consultar, actualizar o eliminar sus propias tareas.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv
- cors
- Postman

## Funcionalidades principales

- Registro de usuarios
- Inicio de sesión
- Autenticación con JWT
- Crear tareas
- Obtener tareas
- Obtener una tarea por ID
- Actualizar tareas
- Eliminar tareas
- Filtrar tareas por estado
- Filtrar tareas por fecha
- Validaciones
- Manejo global de errores

## Estructura del proyecto

```txt
api-gestion-tareas/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── validationMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── asyncHandler.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   └── app.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Instalación y uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/JanJ0/API-REST-Gestion-de-Tareas/edit/main/README.md
```

### 2. Entrar a la carpeta del proyecto

```bash
cd api-gestion-tareas
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Crear archivo .env

Crear un archivo llamado `.env` en la raíz del proyecto y agregar lo siguiente:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/gestion_tareas
JWT_SECRET=tu_clave_secreta
```

### 5. Ejecutar el servidor

```bash
npm run dev
```

Si todo funciona correctamente, debe aparecer un mensaje indicando que el servidor está corriendo y que MongoDB se conectó correctamente.

## URL base

```txt
http://localhost:3000
```

## Endpoints de la API

### Verificar servidor

```http
GET /api/health
```

Respuesta esperada:

```json
{
  "message": "API funcionando correctamente"
}
```

---

### Registro de usuario

```http
POST /api/auth/register
```

Body:

```json
{
  "email": "test@email.com",
  "password": "123456"
}
```

Respuesta exitosa:

```json
{
  "message": "Usuario registrado correctamente",
  "user": {
    "id": "id_del_usuario",
    "email": "test@email.com",
    "createdAt": "fecha_de_creacion"
  }
}
```

---

### Login de usuario

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "test@email.com",
  "password": "123456"
}
```

Respuesta exitosa:

```json
{
  "message": "Login exitoso",
  "token": "TOKEN_JWT_GENERADO",
  "user": {
    "id": "id_del_usuario",
    "email": "test@email.com"
  }
}
```

---

### Perfil autenticado

```http
GET /api/auth/profile
```

Header requerido:

```http
Authorization: Bearer TOKEN_JWT
```

Respuesta exitosa:

```json
{
  "message": "Acceso autorizado",
  "user": {
    "_id": "id_del_usuario",
    "email": "test@email.com",
    "createdAt": "fecha_de_creacion",
    "updatedAt": "fecha_de_actualizacion"
  }
}
```

---

### Crear tarea

```http
POST /api/tasks
```

Header requerido:

```http
Authorization: Bearer TOKEN_JWT
```

Body:

```json
{
  "title": "Terminar proyecto final",
  "description": "Completar documentación y pruebas",
  "status": "pending",
  "due_date": "2026-05-10"
}
```

Respuesta exitosa:

```json
{
  "message": "Tarea creada correctamente",
  "task": {
    "_id": "id_de_la_tarea",
    "title": "Terminar proyecto final",
    "description": "Completar documentación y pruebas",
    "status": "pending",
    "due_date": "2026-05-10T00:00:00.000Z",
    "user": "id_del_usuario"
  }
}
```

---

### Obtener todas las tareas

```http
GET /api/tasks
```

Header requerido:

```http
Authorization: Bearer TOKEN_JWT
```

Respuesta exitosa:

```json
{
  "message": "Tareas obtenidas correctamente",
  "count": 1,
  "tasks": [
    {
      "_id": "id_de_la_tarea",
      "title": "Terminar proyecto final",
      "description": "Completar documentación y pruebas",
      "status": "pending",
      "due_date": "2026-05-10T00:00:00.000Z",
      "user": "id_del_usuario"
    }
  ]
}
```

---

### Filtrar tareas por estado

```http
GET /api/tasks?status=pending
```

Header requerido:

```http
Authorization: Bearer TOKEN_JWT
```

Estados permitidos:

```txt
pending
in_progress
done
```

---

### Filtrar tareas por fecha

```http
GET /api/tasks?due_date=2026-05-10
```

Header requerido:

```http
Authorization: Bearer TOKEN_JWT
```

---

### Obtener una tarea por ID

```http
GET /api/tasks/:id
```

Header requerido:

```http
Authorization: Bearer TOKEN_JWT
```

Respuesta exitosa:

```json
{
  "message": "Tarea obtenida correctamente",
  "task": {
    "_id": "id_de_la_tarea",
    "title": "Terminar proyecto final",
    "description": "Completar documentación y pruebas",
    "status": "pending",
    "due_date": "2026-05-10T00:00:00.000Z",
    "user": "id_del_usuario"
  }
}
```

---

### Actualizar tarea

```http
PUT /api/tasks/:id
```

Header requerido:

```http
Authorization: Bearer TOKEN_JWT
```

Body:

```json
{
  "title": "Terminar proyecto final actualizado",
  "description": "Ya completé parte del CRUD",
  "status": "in_progress",
  "due_date": "2026-05-12"
}
```

Respuesta exitosa:

```json
{
  "message": "Tarea actualizada correctamente",
  "task": {
    "_id": "id_de_la_tarea",
    "title": "Terminar proyecto final actualizado",
    "description": "Ya completé parte del CRUD",
    "status": "in_progress",
    "due_date": "2026-05-12T00:00:00.000Z"
  }
}
```

---

### Eliminar tarea

```http
DELETE /api/tasks/:id
```

Header requerido:

```http
Authorization: Bearer TOKEN_JWT
```

Respuesta exitosa:

```json
{
  "message": "Tarea eliminada correctamente"
}
```

## Autenticación

Las rutas protegidas requieren enviar el token JWT en el header:

```http
Authorization: Bearer TOKEN_JWT
```

El token se obtiene al iniciar sesión correctamente en:

```http
POST /api/auth/login
```

## Validaciones incluidas

- Email obligatorio
- Formato de email válido
- Password obligatorio
- Password mínimo de 6 caracteres
- Título obligatorio en tareas
- Status válido
- Fecha válida
- ID válido de MongoDB

## Ejemplos de errores

### Token no enviado

```json
{
  "message": "No autorizado, token no enviado"
}
```

### Token inválido

```json
{
  "message": "No autorizado, token inválido"
}
```

### Usuario ya existe

```json
{
  "success": false,
  "message": "El usuario ya existe"
}
```

### Credenciales inválidas

```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

### ID inválido

```json
{
  "message": "El ID proporcionado no es válido"
}
```

### Ruta no encontrada

```json
{
  "success": false,
  "message": "Ruta no encontrada: /api/no-existe"
}
```

## Base de datos

La base de datos utilizada es MongoDB.

Nombre de la base de datos:

```txt
gestion_tareas
```

## Scripts disponibles

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Ejecutar normalmente:

```bash
npm start
```

## Autor

Jean Luis Muñoz Rivera

## Curso

COMP2052.WEB DEV SERV-SIDE & MICROSER BKE

## Profesora

Milagros Donato Cintrón
