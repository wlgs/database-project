# Dokumentacja

Podstawowym celem projektu było zrealizowanie funkcjonalności zarządzania hotelem.

Korzystamy z bazy danych `MongoDB` wraz z backendem `Express.js` oraz technologia frontendowa - framework `Angular`.

## Frontend

Frontendowa część projektu została zrealizowana za pomocą frameworka Angular 13.

Do komunikacji frontendu z backendem został stworzony jeden serwis - DataService.

Znajdują się w nim następujące funkcje:

```ts
  getClients() {
    return this.http.get(`${url}/clients?skip=0&limit=1000`);
  }
```

Zwraca 1000 pierwszych klientów.

```ts
  getReviews() {
    return this.http.get(`${url}/reviews?skip=0&limit=100`);
  }
```

Zwraca 100 pierwszych recenzji.

```ts
  postReview(id: string, stars: number, description: string) {
    return this.http.post(`${url}/reviews`,{client_id: id, stars: stars, body: description});
  }
```

Postuje recenzję.

```ts
  getClientReservations(mail: string) {
    return this.http.get(`${url}/reservations/client/${mail}`);
  }
```

Zwraca rezerwacje klienta o podanym mailu.

```ts
  cancelReservation(id:string) {
    return this.http.patch(`${url}/reservations/${id}`,{status: 'canceled'});
  }
```

Zmienia status rezerwacji na canceled.

```ts
  acceptReservation(id:string) {
    return this.http.patch(`${url}/reservations/${id}`,{status: 'paid'});
  }
```

Zmienia status rezerwacji na paid.

```ts
  makeReservation(start_date: string, end_date: string, room_type:string, email:string) {
    return this.http.post(`${url}/reservations`,{start_date: start_date, end_date: end_date, type: room_type, email: email});
  }
```

Postuje rezerwację.

```ts
  getEmployees() {
    return this.http.get(`${url}/employees?skip=0&limit=1000`);
  }
```

Zwraca 1000 pierwszych pracowników hotelu.

```ts
  getFreeRoomsByDay(from: string,to: string) {
    return this.http.get(`${url}/rooms/${from}/${to}`);
  }
```

Zwraca pokoje dostępne do zarezerwowania pomiędzy dwiema datami.

```ts
  getActiveReservationsByDay(date:string) {
    return this.http.get(`${url}/reservations/${date}`);
  }
```

Zwraca rezerwacje które są aktywne danego dnia.

```ts
  getRoomTypes() {
    return this.http.get(`${url}/rooms_types`);
  }
```

Zwraca rodzaje pokojów dostępnych w naszym hotelu.

## Baza danych

Dane do bazy danych pozyskiwaliśmy z [https://json-generator.com/](https://json-generator.com/).

Odpowiednie pliki generatora są w folderze [__gens__](./__gens__/).

W bazie danych trzymamy następujące kolekcje:

### clients

Struktura:

```json
{ 
  "_id": "628ce5dd655371839c148a3a",
  "firstname": "Bauer",
  "lastname": "Contreras",
  "email": "bauercontreras@digigen.com",
  "phone": "+48 (986) 538-3836",
  "address": "616 Oceanic Avenue, Rockingham, Maine, 8736",
  "registered": "2015-11-04T09:27:21 -01:00"
}
```

Podstawowe informacje o kliencie.

### employees

```json
{  
    "_id": "628cf1dac252f973626140ee",
    "firstname": "Zelma",
    "lastname": "Hess",
    "email": "zelmahess@sportan.com",
    "phone": "+48 (867) 405-3321",
    "address": "494 Foster Avenue, Richmond, Alaska, 3563",
    "registered": "2020-12-09T08:48:30 -01:00",
    "work_type": "service",
    "salary": 3132
}
```

Podstawowe informacje o pracowniku - z uwzględnieniem jego 'typu pracy' oraz pensji.

### reservations

```json
{  
    "_id": "628d101398e88560beb96209",
    "client_id": "628ce5dd083d2f4ce29f3487",
    "start_date": "2022-05-04T05:33:17 -02:00",
    "end_date": "2022-05-06T04:19:27 -02:00",
    "status": "pending",
    "room_number": 36
}
```

Informacje o rezerwacjach - numer pokoju, status, czas trwania oraz id klienta.

### reviews

```json
{  
    "_id": "628cd5b9c8362eac852ca1b5",
    "client_id": "628cd5b93741a35d1c61b687",
    "stars": 1.5,
    "body": "elit magna non dolore ad voluptate proident ipsum tempor non aute ad duis esse voluptate veniam consequat nostrud eu ex laboris ad ipsum nulla minim reprehenderit ullamco ad consequat reprehenderit nostrud tempor ipsum eiusmod nostrud consequat reprehenderit elit dolor quis nulla do velit Lorem reprehenderit ullamco proident consequat esse reprehenderit esse irure esse commodo voluptate culpa occaecat fugiat tempor eu"}
```

Recenzje, opinie o hotelu, stars oznacza ilość 'gwiazdek' od 1 do 5.

### rooms

```json
{  
    "_id": "628cdafd09b663e64322a478",
    "room_number": 133,
    "type": "Big apartment"
}


```

Informacje o pokojach - numer wraz z typem (więcej niżej).

### room_types

```json
{  
    "_id": "628cdb4009b663e64322a47c",
    "type": "Big apartment",
    "size": 5,
    "price": 255,
    "description": "Big apartment for 5 with balcony view. Included breakfast and dinner"}
```

Typy pokoi - opis wraz z ceną oraz rozmiarem (ilość osób).

### work_type

```json
{  
    "_id": "628cdb9809b663e64322a48d",
    "work_type": "service",
    "min_salary": 2100,
    "max_salary": 5500,
    "description": "Managing reservations, handling keys, servicing clients."}
```

Rodzaje pracy możliwej do wykonywania przez pracowników - wraz z wcześniej określonymi stawkami (widełki).


### logs-X

Kolekcje z logami uwzgledniające wszystkie operacje działania na poszczególnych dokumentach są odpowiednio nazwane logs-NAZWA - np. `logs-reservations`.

Przykładowe dokumenty - tu przykład na kolekcji `logs-reservations`


```json
{  
    "_id": {    
        "_data":"82628E0A040000008D2B022C0100296E5A10043EA07DF5DB3F4ADA80195CC1112253FA463C5F6964003C36323864313031336337643136356139623830363965334000004"
        },
    "operationType": "update",
    "clusterTime": {
        "$timestamp": {
            "t": 1653475844,
            "i": 141}
            },
    "fullDocument": {
        "_id": "628d1013c7d165a9b8069e74",
        "client_id": "628ce5dd0ed2481799e0683a",
        "start_date": "2022-05-02T08:58:13 -02:00",
        "end_date": "2022-05-11T01:59:06 -02:00",
        "status": "paid",
        "room_number": 97},
        "fullDocumentBeforeChange": {
            "_id": "628d1013c7d165a9b8069e74",
            "client_id": "628ce5dd0ed2481799e0683a",
            "start_date": "2022-05-02T08:58:13 -02:00",
            "end_date": "2022-05-11T01:59:06 -02:00",
            "status": "canceled",
            "room_number": 97},
        "ns": {
                  "db": "warsaw",
                  "coll": "reservations"},
        "documentKey": {
            "_id": "628d1013c7d165a9b8069e74"},
        "updateDescription": {
            "updatedFields": {
                "status": "paid"},
        "removedFields": [],
        "truncatedArrays": []  }}
```

Dane pochodzą z odpowiedniego triggera - w dokumencie mamy pełne informacje o zmianie - możemy łatwo odtworzyć lub zrevertować zmianę.

## Backend

Z ciekawszych zapytań, które kierujemy do bazy (odpowiednie query):

### wykonanie joina na reviews oraz clients

Dzieki takiemu joinowi mamy dostęp do dokumentów reviews wraz z pełną informacją o danym kliencie

```mongodb
db.reviews.aggregate(
  [
    {
      $lookup: {
        from: 'clients',
        localField: 'client_id',
        foreignField: '_id',
        as: 'dataArr'
      }
    },
    {
      $match: {
        'dataArr': {$ne: []}
      }
    }
  ]
)
```

### rezerwacje aktywne danego dnia

Uwaga: pomijamy rezerwacje które mają status `canceled`

```mongodb
db.reservations.aggregate([
    {
        $project:{
            start_date: {
                $toDate: "$start_date"
            },
            end_date:{
                $toDate: '$end_date'
            },
            status: '$status',
            room_number: '$room_number'
        }
    },
    {
        $match: {
          'start_date': {$lte: ISODate('2022-05-07')}
        }
    },
    {
        $match: {
          'end_date': {$gte: ISODate('2022-05-07')}
        }
    },
    {
        $match: {
            'status': {$not: {$eq: 'canceled'}}
        }
    }
])
```

### pokoje i ich historie rezerwacji

Otrzymujemy pokoje wraz z ich rezerwacjami, które kiedykolwiek wystąpiły

```mongodb
db.rooms.aggregate([
    {
        $lookup: {
          from: 'reservations',
          localField: 'room_number',
          foreignField: 'room_number',
          as: 'dataArr'
        }
    }
])
```

### zwrócenie wolnych pokoi

Bazujemy na danym przedziale czasu, oraz typie pokoju - odpowiednie zmienne:
* `type`
* `start_date`
* `end_date`

```mongodb
db.rooms.aggregate([
    {
        $lookup: {
          from: 'reservations',
          localField: 'room_number',
          foreignField: 'room_number',
          as: 'dataArr'
        }
    },
    {
        $project: {
            room_number: '$room_number',
            type: '$type',
            dataArr: {$map: {
                input: '$dataArr',
                as: 'dataEl',
                in: {
                    start_date: {
                    $toDate: "$$dataEl.start_date"
                        },
                    end_date: {
                    $toDate: "$$dataEl.end_date"
                        },
                    status: "$$dataEl.status"
                }
            }}
        }
    },
    {
        $match:{
            $or: [{'dataArr': {$not: {
                $elemMatch: {
                    $or: [{start_date: {$gte: ISODate('2022-05-07'), $lte: ISODate('2022-05-08')}},
                    {end_date: {$gte: ISODate('2022-05-07'), $lte: ISODate('2022-05-08')}}],
                    
                    }}}
                },
                {
                    'dataArr': {$elemMatch: {$or: [{status: 'canceled'}, {status: 'pending'}]} }}]               
        }
    },
    {
        $match: {
            'type': 'Single room with balcony'
        }
    }
])
```

## Testy

Testy poszczególnych endpointów/requestów wykonywaliśmy poprzez `Postman`.
