# the following are the routes for this api

*/hall/new => to create a new hall
*/hall/all => get all the halls
*/bookings/all => get all the bookings
*/bookings/new => create a new booking

# send data like the following example to create a hall
*{
    "name":"S&S Halls and Venues",
    "roomId": 12,
    "seats": "1000",
    "amenities":["swimming pool", "Hot water", "kids play area","valet service","vending machines", "complementary spa", "gym", "200 parking spots"],
    "price":"4500"
}

# send data like the following example to book a room
*{
    "roomId": 15, 
    "customerName": "Anil Kumar MR",
    "date": "2023/01/12", 
    "startTime": "00",
    "endTime": "12"
}
