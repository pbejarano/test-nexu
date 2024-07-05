# test-nexu
# Bienvenido al API para Brands & Models!

Hola, esta API está hecha con NodeJS, Prisma ORM en Azure function.
Para correr la aplicación se debe instalar la azure function core tools la cual puedes descargar en la siguiente liga:

  

[Develop Azure Functions locally using Core Tools | Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-javascript)

  

Instalar las dependencias
```
npm install
```
 

# Endpoints
```
GET /brands
GET /brands/:id/models
POST /brands
POST /brands/:id/models
PUT /models/:id
GET /models
```

#### GET /brands        
Lista las Brands registradas con el precio promedio de acuerdo a sus modelos
```json
[
  {"id": 1, "nombre": "Acura", "average_price": 702109},
  {"id": 2, "nombre": "Audi", "average_price": 630759},
  {"id": 3, "nombre": "Bentley", "average_price": 3342575},
  {"id": 4, "nombre": "BMW", "average_price": 858702},
  {"id": 5, "nombre": "Buick", "average_price": 290371},
  "..."
]
```

#### GET /brands/:id/models

Lista los modelos registrados en la marca proporcionada
```json
[
  {"id": 1, "name": "ILX", "average_price": 303176},
  {"id": 2, "name": "MDX", "average_price": 448193},
  {"id": 1264, "name": "NSX", "average_price": 3818225},
  {"id": 3, "name": "RDX", "average_price": 395753},
  {"id": 354, "name": "RL", "average_price": 239050}
]
```

#### POST /brands
Agregar nueva marca, el nombre de la marca es unico

```json
{"name": "Toyota"}
```
#### POST /brands/:id/models

Agrega un nuevo modelo a la marca proporcionada. 
El nombre del modelo es unico, el precio promedio debe ser mayor a 100,000.

```json
{"name": "Prius", "average_price": 406400}
```

#### PUT /models/:id

Edita un el precio promedio de un modelo. El precio promedio debe ser mayor a 100,000.

```json
{"average_price": 406400}
```

#### GET /models?greater=&lower=

Lista todos los modelos por menor y mayor precio.
```
# /models?greater=380000&lower=400000
```
```json
[
  {"id": 1264, "name": "NSX", "average_price": 3818225},
  {"id": 3, "name": "RDX", "average_price": 395753}
]
```
## Pruebas
Ejecutar el comando

```
npm run testit
```

## Notas


El ORM de prisma no tiene una manera de obtener un promedio de alguna campo referenciado con otra tabla, esta fue una de las primeras cosas a afrontar y se soluciono trayendo los datos por separado y manejandolos.

Para las inserciones y validaciones se trató de implementar una clase para manejo de errores y tener un handler de las peticiones.

Para los promedios de precios se optó por ir armando el arreglo del _where_ si los parámetros eran proporcionados.



# Deploy

La aplicacion se hizo deploy en  **Azure**, como una aplicacion de funciones serverless y tiene configurado el CI/CD con las actions de **Github**. 
