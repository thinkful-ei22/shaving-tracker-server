# API EXAMPLES

## USER

### POST /api/v1/users

Purpose: New user registration

Example: POST <https://example.com/api/v1/users>

Request body:

```json
{
  "username": "JoeUser",
  "email": "joe@brosef.com",
  "password": "correct-horse-battery-staple"
}
```

Response header:

```json
{
  "status": 201,
  "location": "/api/v1/users/<NEW_USER_ID>"
}
```

Response body:

```json
{
  "message": "Registration Success"
}
```

## AUTH

### POST /api/v1/login

Purpose: Trade user credentials for a JWT

Example: POST <https://example.com/api/v1/login>

Request body:

```json
{
  "username": "JoeUser",
  "password": "correct-horse-battery-staple"
}
```

Response body:

```json
{
  "authToken": "VALID_JWT"
}
```

### POST /api/v1/refresh

Purpose: refresh a user's JWT

Example: POST <http://example.com/api/v1/refresh>

Request header:

```json
  "Authorization": "Bearer AUTH_TOKEN"
```

Request body: `empty`

Response body:

```json
{
  "authToken": "UPDATED_JWT"
}
```

## PRODUCTS

All `/products` endpoints are protected and require a valid JWT that includes the `userId`.

Request header:

```json
  "Authorization": "Bearer AUTH_TOKEN"
```

### POST /api/v1/products/personal/:productType

Purpose: Adds a new item to the user's personal product collection. If the product exists in global, simply make a reference to that item. If the product does not exist in global, create that item in global and then reference it.

Example: POST <http://example.com/api/v1/products/personal/razors>

Request body:

```json
{
  "brand": "Gilette",
  "model": "Fore 20 Bladed",
  "type": "razor",
  "nickname": "the Overkill",
  "comments": "wow!"
}
```

Response body:

```json
{
  "status": 201,
  "id": "sdfaksf3234",
  "brand": "Gilette",
  "model": "Fore 20 Bladed",
  "type": "razor",
  "nickname": "the Overkill",
  "comments": "wow!'
}
```

### GET /api/v1/products/personal

Purpose: Gets the list of products that the user has added

Example: 

req.user.id -> from jwt token

Request body:

```json
{}
```

Response body:

```json
{
  "status": 200,
  "id": "fwwefsk3423",
  "razors": [...],
  "brushes": [...],
  "aftershave": [...]
}
```

### PUT /api/v1/products/personal/:id

Purpose: Updates personal content of a product in user's product collection

Example: 

req.user.id -> from jwt token

Request body:

```json
{
  "nickname": "The Cyclops",
  "comment": "MY EYES"
}
```

Response body:

```json
{
  "status": 200,
  "id": "fwwefsk3423",
  "nickname": "The Cyclops",
  "comment": "MY EYE"
}
```

### DELETE /api/v1/products/personal/:id

Purpose: Removes a product from someone's personal collection

Example: 

req.user.id -> from jwt token

Request body:

```json
{}
```

Response body:

```json
{
  "status": 204
}
```

## SHAVES

All `/shaves` endpoints are protected and require a valid JWT that includes the `userId`.

Request header:

```json
  "Authorization": "Bearer AUTH_TOKEN"
```

### POST /api/v1/shaves

Purpose: 

Example: 

Request body:

req.user.id -> from jwt token

```json
{
    "razorId": "sadf32fs32r",
    "bladeId": "sdfafw42fsf",
    "brushId": "f5i4yjesfks",
    "latherId": "asdfj4rkef3",
    "aftershaveId": "f5i4yjes333",
    "additionalCare": "f5i4yje2354",
    "rating": 3,
}
```

Response body:

```json
{
  "status": 201,
  "id": "fwwefsk3423",
  "razorId": "sadf32fs32r",
  "bladeId": "sdfafw42fsf",
  "brushId": "f5i4yjesfks",
  "latherId":"asdfj4rkef3",
  "aftershaveId": "f5i4yjes333",
  "additionalCare": "f5i4yje2354",
  "rating": 3,
}
```

### GET /api/v1/shaves

Purpose: Gets a list of shave history, filtered by time period

Example: 

Request body:

req.user.id -> from jwt token

```json
{
  "week": "????",
  "month": "????" // not sure how to handle this yet
}
```

Response body:

```json
{
  "status": 200,
  [
    {
      "id": "asdfasdf",
      "razorId": "sadf32fs32r",
      "bladeId": "sdfafw42fsf",
      "brushId": "f5i4yjesfks",
      "latherId":"asdfj4rkef3",
      "aftershaveId": "f5i4yjes333",
      "additionalCare": "f5i4yje2354", 
      "rating": 3,
    },
    ...
  ]
}
```

### PUT /api/v1/shaves/:id

Purpose: Updates info of a given shave

Example: 

Request body:

```json
{
  "razorId": "sadf32fs32r",
  "bladeId": "sdfafw42fsf",
  "brushId": "f5i4yjesfks",
  "latherId": "asdfj4rkef3",
  "aftershaveId": "f5i4yjes333",
  "additionalCare": "f5i4yje2354",
  "rating": 3,
}
```

Response body:

```json
{
  "status": 200,
  "id": "asdfasdf",
  "razorId": "sadf32fs32r",
  "bladeId": "sdfafw42fsf",
  "brushId": "f5i4yjesfks",
  "latherId":"asdfj4rkef3",
  "aftershaveId": "f5i4yjes333",
  "additionalCare": "f5i4yje2354",
  "rating": 3,
}
```

### DELETE /api/v1/shaves/:id

Purpose: Deletes a given shave

Example: 

Request body:

```json
{}
```

Response body:

```json
{
  "status": 204
}
```
