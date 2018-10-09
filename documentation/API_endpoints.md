# API EXAMPLES

## USER

Used for creating new accounts.

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

Used for logging in.

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

Used to manage products in the DB, modifying both the user's personal collection of products and the global product collection.

All `/products` endpoints are protected and require a valid JWT that includes the `userId`.

Request header:

```json
  "Authorization": "Bearer AUTH_TOKEN"
```

### GET /api/v1/products/personal

Purpose: Gets the list of products that the user has added to their personal product collection. All products of all types will be objects in the same array.

Example: 

req.user.id -> from jwt token

Request body:

```json
{}
```

Response body:

```json
[
  {
      "nickname": "Muhle Tortoise",
      "comment": "closed comb",
      "imageUrl": "null",
      "subtype": "Double Edge",
      "productType": "razor",
      "brand": "Muhle",
      "model": "R108 Tortoise Shell",
      "id": "444444444444444444444002",
      "productId": "222222222222222222222006"
  },
  {
      "nickname": "Gillette Wilkinson",
      "comment": "",
      "imageUrl": "https://i.ebayimg.com/images/g/KGsAAOSwikdawiMp/s-l640.jpg",
      "subtype": null,
      "productType": "blade",
      "brand": "Gillette",
      "model": "Wilkinson",
      "id": "444444444444444444444003",
      "productId": "222222222222222222222007"
  }
]
```

### POST /api/v1/products/personal

Purpose: Adds a new item to the user's personal product collection. Has a dynamic between the user's personal products and the global products.

If the product exists in global, simply make a reference to that item. If the product does not exist in global, create that item in global and then reference it.

If the product already exists in the user's personal products, return 400: "Item already exists"

Example: POST <http://example.com/api/v1/products/personal>

Request body:

```json
{
	"brand": "Gillette",
	"model": "Fore 20 Bladed",
	"productType": "razor",
	"subtype": "cartridge",
	"nickname": "The Overkill",
	"comments": "Honestly this thing kind of scares me a little"
}
```

Response body:

```json
{
    "nickname": "The Overkill",
    "subtype": "cartridge",
    "productType": "razor",
    "brand": "Gillette",
    "model": "Fore 20 Bladed",
    "id": "5bbbc3d668b9440dfc77605b",
    "productId": "5bbbc3d668b9440dfc77605a"
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

Used to manage a user's shave events.

All `/shaves` endpoints are protected and require a valid JWT that includes the `userId`.

Request header:

```json
  "Authorization": "Bearer AUTH_TOKEN"
```

### GET /api/v1/shaves

Purpose: Gets a list of the user's shave history, including populated and flattened data detailing each product used for a given shave

Example: 

Request body:

req.user.id -> from jwt token

```json
{}
```

Response body:

```json
[
    {
        "razor": {
            "nickname": "Gillette Tech Travel",
            "comment": "1964 vintage",
            "imageUrl": "https://farm3.static.flickr.com/2643/4052280439_cd56947ff6.jpg",
            "subtype": "Double Edge",
            "productType": "razor",
            "brand": "Gillette",
            "model": "Tech Travel",
            "id": "444444444444444444444000",
            "productId": "222222222222222222222000"
        },
        "blade": {
            "nickname": "Gillette Wilkinson",
            "comment": "",
            "imageUrl": "https://i.ebayimg.com/images/g/KGsAAOSwikdawiMp/s-l640.jpg",
            "subtype": null,
            "productType": "blade",
            "brand": "Gillette",
            "model": "Wilkinson",
            "id": "444444444444444444444003",
            "productId": "222222222222222222222007"
        },
        "brush": {
            "nickname": "Surrey 34014 Deluxe",
            "comment": "",
            "imageUrl": "https://i.ebayimg.com/images/g/50MAAOSwQYZWtt3y/s-l300.jpg",
            "subtype": "Boar",
            "productType": "brush",
            "brand": "Surrey",
            "model": "34014 Deluxe",
            "id": "444444444444444444444007",
            "productId": "222222222222222222222013"
        },
        "lather": {
            "nickname": "Stirling's Barbershop",
            "comment": "",
            "imageUrl": "https://cdn.shopify.com/s/files/1/2398/1395/products/stirling-soap-company-shave-soap-barbershop_576x.jpg?v=1533596461",
            "subtype": "Soap",
            "productType": "lather",
            "brand": "Stirling Soap Company",
            "model": "Barbershop",
            "id": "444444444444444444444009",
            "productId": "222222222222222222222019"
        },
        "aftershave": {
            "nickname": "Brut Classic",
            "comment": "",
            "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/51MifkbnbuL._SY550_.jpg",
            "subtype": "Splash",
            "productType": "aftershave",
            "brand": "Brut",
            "model": "Classic",
            "id": "444444444444444444444012",
            "productId": "222222222222222222222029"
        },
        "additionalCare": {
            "nickname": "Proraso Green",
            "comment": "",
            "imageUrl": "https://sharpologist.com/wp-content/uploads/2012/04/IMG_18641.jpg",
            "subtype": null,
            "productType": "additionalcare",
            "brand": "Proraso",
            "model": "Green",
            "id": "444444444444444444444014",
            "productId": "222222222222222222222035"
        },
        "id": "555555555555555555555000",
        "date": "2018-09-21T00:00:00.000Z",
        "share": true,
        "rating": 4,
        "imageUrl": ""
    },
    ...
]
```

### POST /api/v1/shaves

Purpose: Allows user to record a new shave event.

Example: 

Request body:

req.user.id -> from jwt token

```json
{
    "additionalCareId": null,
    "aftershaveId": "444444444444444444444012",
    "bladeId": "444444444444444444444006",
    "brushId": "444444444444444444444008",
    "comments": "I shaved my face!",
    "date": "2018-10-08",
    "imageUrl": null,
    "latherId": "444444444444444444444009",
    "rating": "3",
    "razorId": "444444444444444444444000",
    "share": true
}
```

Response body:

```json
{
    "razor": {
        "nickname": "Gillette Tech Travel",
        "comment": "1964 vintage",
        "imageUrl": "https://farm3.static.flickr.com/2643/4052280439_cd56947ff6.jpg",
        "subtype": "Double Edge",
        "productType": "razor",
        "brand": "Gillette",
        "model": "Tech Travel",
        "id": "444444444444444444444000",
        "productId": "222222222222222222222000"
    },
    "blade": {
        "nickname": "Gillette 7 O'Clock",
        "comment": "",
        "imageUrl": "http://cdn.shopify.com/s/files/1/1690/0287/products/gillette-7-o-clock-super-stainless-double-edge-blades_grande.jpg?v=1498227446",
        "subtype": null,
        "productType": "blade",
        "brand": "Gillette",
        "model": "7 O'Clock SharpEdge",
        "id": "444444444444444444444006",
        "productId": "222222222222222222222011"
    },
    "brush": {
        "nickname": "TSC Admiral Blue 24mm",
        "comment": "24mm",
        "imageUrl": "https://cdn.shopify.com/s/files/1/1448/2702/products/Turtleshipmay34_grande.jpg?v=1496094806",
        "subtype": "Synthetic",
        "productType": "brush",
        "brand": "Turtleship Shave Co",
        "model": "Admiral Blue",
        "id": "444444444444444444444008",
        "productId": "222222222222222222222016"
    },
    "lather": {
        "nickname": "Stirling's Barbershop",
        "comment": "",
        "imageUrl": "https://cdn.shopify.com/s/files/1/2398/1395/products/stirling-soap-company-shave-soap-barbershop_576x.jpg?v=1533596461",
        "subtype": "Soap",
        "productType": "lather",
        "brand": "Stirling Soap Company",
        "model": "Barbershop",
        "id": "444444444444444444444009",
        "productId": "222222222222222222222019"
    },
    "aftershave": {
        "nickname": "Brut Classic",
        "comment": "",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/51MifkbnbuL._SY550_.jpg",
        "subtype": "Splash",
        "productType": "aftershave",
        "brand": "Brut",
        "model": "Classic",
        "id": "444444444444444444444012",
        "productId": "222222222222222222222029"
    },
    "additionalCare": null,
    "id": "5bbbc90a68b9440dfc77605d",
    "date": "2018-10-08T00:00:00.000Z",
    "share": true,
    "rating": 3,
    "imageUrl": null,
    "comments": "I shaved my face!"
}
```

### PUT /api/v1/shaves/:id

Purpose: Updates info of a given shave

Example: 

Request body:

```json
{
	"share": false,
	"date": "2018-10-06",
	"brushId": "444444444444444444444007"
}
```

Response body:

```json
{
    "razor": {
        "nickname": "Gillette Tech Travel",
        "comment": "1964 vintage",
        "imageUrl": "https://farm3.static.flickr.com/2643/4052280439_cd56947ff6.jpg",
        "subtype": "Double Edge",
        "productType": "razor",
        "brand": "Gillette",
        "model": "Tech Travel",
        "id": "444444444444444444444000",
        "productId": "222222222222222222222000"
    },
    "blade": {
        "nickname": "Gillette 7 O'Clock",
        "comment": "",
        "imageUrl": "http://cdn.shopify.com/s/files/1/1690/0287/products/gillette-7-o-clock-super-stainless-double-edge-blades_grande.jpg?v=1498227446",
        "subtype": null,
        "productType": "blade",
        "brand": "Gillette",
        "model": "7 O'Clock SharpEdge",
        "id": "444444444444444444444006",
        "productId": "222222222222222222222011"
    },
    "brush": {
        "nickname": "Surrey 34014 Deluxe",
        "comment": "",
        "imageUrl": "https://i.ebayimg.com/images/g/50MAAOSwQYZWtt3y/s-l300.jpg",
        "subtype": "Boar",
        "productType": "brush",
        "brand": "Surrey",
        "model": "34014 Deluxe",
        "id": "444444444444444444444007",
        "productId": "222222222222222222222013"
    },
    "lather": {
        "nickname": "Stirling's Barbershop",
        "comment": "",
        "imageUrl": "https://cdn.shopify.com/s/files/1/2398/1395/products/stirling-soap-company-shave-soap-barbershop_576x.jpg?v=1533596461",
        "subtype": "Soap",
        "productType": "lather",
        "brand": "Stirling Soap Company",
        "model": "Barbershop",
        "id": "444444444444444444444009",
        "productId": "222222222222222222222019"
    },
    "aftershave": {
        "nickname": "Brut Classic",
        "comment": "",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/51MifkbnbuL._SY550_.jpg",
        "subtype": "Splash",
        "productType": "aftershave",
        "brand": "Brut",
        "model": "Classic",
        "id": "444444444444444444444012",
        "productId": "222222222222222222222029"
    },
    "additionalCare": null,
    "id": "5bbbccd168b9440dfc77605e",
    "date": "2018-10-06T00:00:00.000Z",
    "rating": 3,
    "share": false,
    "comments": "I shaved my face!"
}
```

### DELETE /api/v1/shaves/:id

Purpose: Deletes a given shave by id

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

## COMMUNITY

Used to fetch publicly-shared information from other users.

All `/shaves` endpoints are protected and require a valid JWT that includes the `userId`.

Request header:

```json
  "Authorization": "Bearer AUTH_TOKEN"
```

### GET /api/v1/community/shaves/:start/:end

Purpose: Gets publicly-shared shaves from other users between the specified dates (:start and :end)

Example: 

:start -> 2018-09-20

:end -> 2018-09-25

Request body:

```json
{}
```

Response body:

```json
[
    {
        "username": "smooth",
        "razor": {
            "nickname": "ATT Calypso R1",
            "comment": "",
            "imageUrl": "https://i.imgur.com/UWfTc2q.jpg",
            "subtype": "Double Edge",
            "productType": "razor",
            "brand": "Above the Tie",
            "model": "Calypso R1",
            "id": "444444444444444444444015",
            "productId": "222222222222222222222001"
        },
        "blade": {
            "nickname": "GSB",
            "comment": "",
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfZ_w0Yb677ONBvjHw2J2bQukHADOIOApxv1mlUvKJbaJezuga",
            "subtype": null,
            "productType": "blade",
            "brand": "Gillette",
            "model": "Silver Blue",
            "id": "444444444444444444444018",
            "productId": "222222222222222222222008"
        },
        "brush": {
            "nickname": "Brushbutt LE",
            "comment": "Limited Edition #78/100",
            "imageUrl": "https://i.imgur.com/m05rFOz.jpg",
            "subtype": "Boar",
            "productType": "brush",
            "brand": "Semogue",
            "model": "Brushbutt 22mm",
            "id": "444444444444444444444022",
            "productId": "222222222222222222222014"
        },
        "lather": {
            "nickname": "B&M Lavanille",
            "comment": "tre Citta Line",
            "imageUrl": "https://cdn.shopify.com/s/files/1/0392/1301/products/bmlavanillesoap_grande.jpg?v=1533956837",
            "subtype": "Soap",
            "productType": "lather",
            "brand": "Barrister and Mann",
            "model": "Lavanille",
            "id": "444444444444444444444024",
            "productId": "222222222222222222222022"
        },
        "aftershave": {
            "nickname": "Lavanille Splash",
            "comment": "",
            "imageUrl": "https://cdn.shopify.com/s/files/1/0648/7651/products/LAVANILLE_AFTERSHAVE_SQUARE_70c03830-aa45-4a98-b5b7-e6f593bc688d_2048x2048.jpg?v=1515681770",
            "subtype": "Splash",
            "productType": "aftershave",
            "brand": "Barrister and Mann",
            "model": "Lavanille",
            "id": "444444444444444444444027",
            "productId": "222222222222222222222031"
        },
        "additionalCare": {
            "nickname": "Thayers Witch Hazel",
            "comment": "",
            "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/51ZxG8xVzAL._SX355_.jpg",
            "subtype": null,
            "productType": "additionalcare",
            "brand": "Thayers",
            "model": "Witch Hazel",
            "id": "444444444444444444444029",
            "productId": "222222222222222222222036"
        },
        "id": "555555555555555555555002",
        "date": "2018-09-21T00:00:00.000Z",
        "rating": 4
    },
    ...
]
```

## IMAGE

Used for image uploads and management.

### POST /api/v1/image/upload

Purpose: Uploads an image to Cloudinary and returns a usable url.

The image must be parsed as FormData on the front end before being sent to this endpoint. Cloudinary account details must be established in the .env file.

Example:

Request files (req.files)
```json
{ "file":
    { 
        "fieldName": "file",
        "originalFilename": "S1wmzSf.jpg",
        "path":
            "C:\\Users\\devin\\AppData\\Local\\Temp\\rJutRWeZ9VVxPC0nuZrZK5-Y.jpg",
        "headers":
            {
                "content-disposition": "form-data; name='file'; filename='S1wmzSf.jpg'",
                "content-type": "image/jpeg" },
        "size": 134464,
        "name": "S1wmzSf.jpg",
        "type": "image/jpeg"
    }
}
```

Response body:

```json
{
    "public_id": "aktfmak772fpviwfharj",
    "version": 1539037170,
    "signature": "33784ff3a4a38305dfacb91e296ef239614bd6b8",
    "width": 787,
    "height": 270,
    "format": "jpg",
    "resource_type": "image",
    "created_at": "2018-10-08T22:19:30Z",
    "tags": [],
    "bytes": 54718,
    "type": "upload",
    "etag": "e6e593a96a8ba9d5266819d9642bccbb",
    "placeholder": false,
    "url": "http://res.cloudinary.com/wickedbeardy/image/upload/v1539037170/aktfmak772fpviwfharj.jpg",
    "secure_url": "https://res.cloudinary.com/wickedbeardy/image/upload/v1539037170/aktfmak772fpviwfharj.jpg",
    "original_filename": "HC-ml86CalWbfYgDLr0_50oz"
}
```