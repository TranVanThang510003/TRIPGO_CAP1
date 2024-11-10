
const axios = require('axios');

const sql = require('mssql'); // Import toàn bộ thư viện mssql

// Bạn có thể dùng các kiểu dữ liệu qua sql.
const { NVarChar, Text, Int, Decimal, Bit, DateTime } = sql;

// Thay thế bằng API Key của bạn
const API_KEY = 'fsq362AA3Ievw1dnDTSsX6S6QpexVv9SUCMoI99U+yjZy0g=';

// Cấu hình kết nối đến SQL Server
const dbConfig = {
    user: 'admin1',
    password: '123456',
    server: 'DESKTOP-553UGMH',
    database: 'TRIPGO',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Hàm để lấy danh sách địa điểm từ Foursquare
async function fetchPlaces(city, category) {
    const url = `https://api.foursquare.com/v3/places/search`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': API_KEY
            },
            params: {
                'near': city,
                'limit': 10,
                'categories': category // Mã danh mục cho các loại địa điểm
            }
        });

        const places = response.data.results;
        return places;

    } catch (error) {
        console.error('Error fetching places:', error);
        return [];
    }
}

// Hàm để lưu thông tin địa điểm vào bảng LOCATION
async function saveLocationToDatabase(place) {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('location_name', NVarChar, place.name)
            .input('address', NVarChar, place.location.formatted_address || 'Unknown')
            .input('description', Text, place.description || 'No description available')
            .input('image', NVarChar, place.categories[0]?.icon.prefix + 'bg_64' + place.categories[0]?.icon.suffix)
            .query(`INSERT INTO LOCATION (LOCATION_NAME, ADDRESS, DESCRIPTION, IMAGE) 
                    VALUES (@location_name, @address, @description, @image);
                    SELECT SCOPE_IDENTITY() AS id;`);
        
        console.log(`Location ${place.name} saved successfully!`);
        return result.recordset[0].id; // Trả về LOCATION_ID để sử dụng khi lưu các thông tin liên quan

    } catch (error) {
        console.error('Error saving location:', error);
    }
}

// Hàm để lưu thông tin khách sạn vào bảng HOTEL
async function saveHotelToDatabase(place, locationId) {
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('hotel_name', NVarChar, place.name)
            .input('location_id', Int, locationId)
            .input('price', Decimal, 1000000) // Thay đổi nếu có giá thực tế từ API
            .input('star_rating', Int, 4) // Đánh giá mặc định
            .input('amenities', NVarChar, 'Free Wifi, Breakfast included') // Tiện ích mặc định
            .input('chain', NVarChar, place.categories[0]?.name)
            .input('is_breakfast', Bit, 1)
            .input('is_free_cancellation', Bit, 1)
            .input('child_free_policy', Bit, 1)
            .input('images', NVarChar, place.categories[0]?.icon.prefix + 'bg_64' + place.categories[0]?.icon.suffix)
            .query(`INSERT INTO HOTEL (HOTEL_NAME, LOCATION_ID, PRICE, STAR_RATING, AMENITIES, CHAIN, IS_BREAKFAST, IS_FREE_CANCELLATION, CHILD_FREE_POLICY, IMAGES)
                    VALUES (@hotel_name, @location_id, @price, @star_rating, @amenities, @chain, @is_breakfast, @is_free_cancellation, @child_free_policy, @images)`);
        
        console.log(`Hotel ${place.name} saved successfully!`);

    } catch (error) {
        console.error('Error saving hotel:', error);
    }
}

// Hàm để lưu thông tin nhà hàng vào bảng RESTAURANT
async function saveRestaurantToDatabase(place, locationId) {
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('restaurant_name', NVarChar, place.name)
            .input('menu_id', Int, null) // Chưa có menu nên để null
            .input('uptime', NVarChar, '8:00 AM - 10:00 PM') // Thời gian hoạt động mặc định
            .input('cuisine_type', NVarChar, place.categories[0]?.name)
            .input('meal_type', NVarChar, 'Breakfast, Lunch, Dinner')
            .input('star_rating', Decimal, 4.5)
            .input('is_open', Bit, 1)
            .input('addresses', NVarChar, place.location.formatted_address || 'Unknown')
            .input('phone', NVarChar, place.tel || 'Unknown')
            .input('location_id', Int, locationId)
            .input('images', NVarChar, place.categories[0]?.icon.prefix + 'bg_64' + place.categories[0]?.icon.suffix)
            .query(`INSERT INTO RESTAURANT (RESTAURANT_NAME, MENU_ID, UPTIME, CUISINE_TYPE, MEAL_TYPE, STAR_RATING, IS_OPEN, ADDRESSES, PHONE, LOCATION_ID, IMAGES)
                    VALUES (@restaurant_name, @menu_id, @uptime, @cuisine_type, @meal_type, @star_rating, @is_open, @addresses, @phone, @location_id, @images)`);
        
        console.log(`Restaurant ${place.name} saved successfully!`);

    } catch (error) {
        console.error('Error saving restaurant:', error);
    }
}

// Hàm để lưu thông tin tour vào bảng PUBLIC_TOUR
async function savePublicTourToDatabase(place, locationId) {
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('public_tour_name', NVarChar, place.name)
            .input('public_tour_type', NVarChar, 'Day Tour')
            .input('instruction_language', NVarChar, 'Vietnamese, English')
            .input('day_number', Int, 1)
            .input('start_day', DateTime, new Date())
            .input('end_day', DateTime, new Date(new Date().getTime() + 24 * 60 * 60 * 1000)) // Kết thúc sau 1 ngày
            .input('descriptions', Text, 'Tour quanh thành phố với các địa điểm nổi bật.')
            .input('descriptions_highlight', Text, 'Khám phá văn hóa và lịch sử.')
            .input('location_id', Int, locationId)
            .input('price', Decimal, 500000) // Giá mặc định
            .input('images', NVarChar, place.categories[0]?.icon.prefix + 'bg_64' + place.categories[0]?.icon.suffix)
            .query(`INSERT INTO PUBLIC_TOUR (PUBLIC_TOUR_NAME, PUBLIC_TOUR_TYPE, INSTRUCTION_LANGUAGE, DAY_NUMBER, START_DAY, END_DAY, DESCRIPTIONS, DESCRIPTIONS_HIGHLIGHT, LOCATION_ID, PRICE, IMAGES)
                    VALUES (@public_tour_name, @public_tour_type, @instruction_language, @day_number, @start_day, @end_day, @descriptions, @descriptions_highlight, @location_id, @price, @images)`);
        
        console.log(`Public Tour ${place.name} saved successfully!`);

    } catch (error) {
        console.error('Error saving public tour:', error);
    }
}

// Hàm để lưu thông tin hoạt động vui chơi vào bảng ACTIVITY_FUN
async function saveActivityFunToDatabase(place, locationId) {
    try {
        const pool = await sql.connect(dbConfig); 
        await pool.request()
        .input('activity_fun_name', NVarChar, place.name)
        .input('location_id', Int, locationId)
        .input('price', Decimal, 200000)
        .input('descriptions', Text, 'Hoạt động vui chơi giải trí cho gia đình.')
        .input('images', NVarChar, place.categories[0]?.icon.prefix + 'bg_64' + place.categories[0]?.icon.suffix)
        .query(`INSERT INTO ACTIVITY_FUN (ACTIVITY_FUN_NAME, LOCATION_ID, PRICE, DESCRIPTIONS, IMAGES)
            VALUES (@activity_fun_name, @location_id, @price, @descriptions, @images)`);


    } catch (error) {
        console.error('Error saving activity fun:', error);
    }
}
// Hàm chính để lấy dữ liệu và lưu vào SQL Server
async function main() {
    const cities = ['Hanoi', 'Ho Chi Minh City', 'Da Nang']; // Thay bằng danh sách 63 tỉnh thành
    const categories = {
        hotel: '19014', // Mã danh mục cho khách sạn
        restaurant: '13065', // Mã danh mục cho nhà hàng
        activity: '16000' // Mã danh mục cho hoạt động vui chơi
    };

    for (const city of cities) {
        console.log(`Fetching data for city: ${city}`);

        // Lấy danh sách khách sạn và lưu vào database
        const hotels = await fetchPlaces(city, categories.hotel);
        for (const hotel of hotels) {
            const locationId = await saveLocationToDatabase(hotel);
            if (locationId) {
                await saveHotelToDatabase(hotel, locationId);
            }
        }

        // Lấy danh sách nhà hàng và lưu vào database
        const restaurants = await fetchPlaces(city, categories.restaurant);
        for (const restaurant of restaurants) {
            const locationId = await saveLocationToDatabase(restaurant);
            if (locationId) {
                await saveRestaurantToDatabase(restaurant, locationId);
            }
        }

        // Lấy danh sách hoạt động vui chơi và lưu vào database
        const activities = await fetchPlaces(city, categories.activity);
        for (const activity of activities) {
            const locationId = await saveLocationToDatabase(activity);
            if (locationId) {
                console.log('Saving activity fun with locationId:', locationId);
                await saveActivityFunToDatabase(activity, locationId);
            }
            
        }

          // Lấy danh sách tour và lưu vào database
          const publicTours = await fetchPlaces(city, categories.hotel); // Giả sử dùng mã danh mục tương tự để lấy tour
          for (const tour of publicTours) {
              const locationId = await saveLocationToDatabase(tour);
              if (locationId) {
                  await savePublicTourToDatabase(tour, locationId);
              }
          }
        }
          
}

main();
