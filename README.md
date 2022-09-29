# Ejemplo de API con NodeJS + MongoDB + JWT

### Basado en

```
https://www.bezkoder.com/node-js-express-login-mongodb/
```

# Crear usuario de base de datos MongoDB

```
db.createUser(
  {
    user: "ejemplo",
    pwd: "ejemplo",
    roles: [ { role: "userAdmin", db: "ejemplo" } ]
  }
)
```

1. Instalar dependeicias

```
npm install
```

2. Configurar los parametros de base de datos en app/config/db.js

3. Iniciar el proyecto

```
npm start
```

4. Registrar un usuario para generar el token

```
http://127.0.0.1:9090/api/auth/signup

{
    "username": "admin",
    "password": "admin",
    "fullname": "I'm example",
    "email": "admin@hola.com",
    "roles": ["admin"]
}
```

5. Generar token

```
http://127.0.0.1:9090/api/auth/signin

{
    "username": "admin",
    "password": "admin"
}
```

6. Consumir los otros endpoints