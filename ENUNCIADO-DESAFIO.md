# Desafío técnico 2026
## Herramientas y tecnologías mínimas
### Backend

- Python
- Framework REST (Ejemplos: Fast API, Django REST)
- Base de datos relacional

### Frontend

- React
- Librería de diseño a elección
- Git

## Términos y condiciones

- 4 días para desarrollarla (hasta el martes 28 a las 18:00)
- Código debe quedar disponible en algún repositorio Git, para poder acceder al
desafío y revisarlo.
- Repositorios deben contar con un README con instrucciones claras sobre
como ejecutar la solución.
- Desarrollo estrictamente individual.
- Puedes apoyarte en las fuentes online que quieras, pero debes referenciarlas
(con algún comentario en el código o README basta).

## Instrucciones

¡Los genomines necesitan tu ayuda! Su influencer favorita, está en busca de los
mejores restaurantes del mundo, y le pidió ayuda a sus seguidores para construir
una base de datos que le permita llevar registro de estos.

Para ayudar a los genomines, debes implementar una aplicación web que permita
llevar un registro de distintos lugares para comer. La aplicación es bastante
simple: tan solo debe desplegar una tabla que muestre la información de la base
de datos; no es necesario registrarse ni iniciar sesión.

La tabla debe mostrar los siguiente datos:

- Nombre del restaurant/bar/café/etc.
- Ubicación (ejemplo de formato: Ciudad, País)
- Tipo de comida que ofrece (ejemplos: hamburguesas, sushi, italiana, oriental,
pastelería, etc. ¡Las posibilidades son infinitas!)
- Calificación (este campo puede ser nulo si el lugar aún no ha sido visitado)
- Checkbox si el lugar ya fue visitado

Funcionalidades requeridas:

- Despliegue de la tabla con toda la información disponible
- Poder agregar filas a la tabla con nueva información
- Poder editar filas de la tabla
- Poder eliminar filas de la tabla
- Poder ordenar las columnas, de manera ascendente y descendente
- Poder filtrar 2 o más columnas
- Al menos un filtro a nivel de frontend (por ejemplo filtrar por la columna País)
- Al menos un filtro a nivel de backend (análogo al punto anterior, pero esta vez
realizando una request al backend cuya respuesta contenga los datos
filtrados)
- Persistencia de datos (operaciones de inserción, edición y borrado deben
realizar cambios en la base de datos)

Si te surgen dudas durante el desarrollo del desafío sobre cosas que no estén
especificadas en el enunciado, puedes preguntar por mail a
dev@genomawork.com, o hacer los supuestos que consideres necesarios ¡pero
no olvides especificarlos en el README!
