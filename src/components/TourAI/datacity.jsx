const datacity = [
  {
    id: 1,
    name: "Phú Quốc",
    imageUrl: "https://rootytrip.com/wp-content/uploads/2024/07/phu-quoc.jpg",
    category: "Biển",
    coordinates: [103.9637, 10.2899], // Phú Quốc, Kiên Giang
  },
  {
    id: 2,
    name: "Nha Trang",
    imageUrl:
      "https://cdn.tuoitre.vn/471584752817336320/2023/4/18/tp-nha-trang-16818161974101240202452.jpeg",
    category: "Biển",
    coordinates: [109.1944, 12.2388], // Nha Trang, Khánh Hòa
  },
  {
    id: 3,
    name: "Đà Nẵng",
    imageUrl:
      "https://houserentaldanang.com/wp-content/uploads/2023/09/Vi-sao-da-nang-lai-thu-hut-nhieu-khach-du-lich-1.jpg",
    category: "Biển",
    coordinates: [108.2022, 16.0544], // Đà Nẵng
  },
  {
    id: 4,
    name: "Vịnh Hạ Long",
    imageUrl:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/08/09/vinh-ha-long-3-1624.jpg",
    category: "Núi",
    coordinates: [107.0807, 20.9101], // Vịnh Hạ Long, Quảng Ninh
  },
  {
    id: 5,
    name: "Quảng Bình",
    imageUrl:
      "https://www.bambooairways.com/documents/20122/1165110/di-quang-binh-mua-nao-dep-1-1024x683.jpg/9d17c773-4184-29f3-f409-0d0aaa6f1546?t=1695024329425",
    category: "Đồng bằng",
    coordinates: [106.6214, 17.4832], // Đồng Hới, Quảng Bình
  },
  {
    id: 6,
    name: "Ninh Bình",
    imageUrl:
      "https://ik.imagekit.io/tvlk/blog/2022/12/du-lich-ninh-binh-1.jpg?tr=dpr-2,w-675",
    category: "Đồng bằng",
    coordinates: [105.9756, 20.2534], // Ninh Bình
  },
  {
    id: 7,
    name: "Sapa",
    imageUrl:
      "https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/2141517477-1675341889920.jpg",
    category: "Núi",
    coordinates: [103.8417, 22.3355], // Sapa, Lào Cai
  },
  {
    id: 8,
    name: "Vũng Tàu",
    imageUrl:
      "https://vcdn1-dulich.vnecdn.net/2022/07/02/bien-vung-tau-jpeg-2320-165545-5919-1133-1656726932.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=BkyR747bWwRXDZPE7wX94w",
    category: "Biển",
    coordinates: [107.0763, 10.3498], // Vũng Tàu, Bà Rịa - Vũng Tàu
  },
  {
    id: 9,
    name: "Hà Nội",
    imageUrl:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg",
    category: "Đồng bằng",
    coordinates: [105.8545, 21.0285], // Hà Nội
  },
  {
    id: 10,
    name: "Huế",
    imageUrl:
      "https://image.vietgoing.com/destination/large/vietgoing_awy2103053798.webp",
    category: "Đồng bằng",
    coordinates: [107.5827, 16.4637], // Huế, Thừa Thiên Huế
  },
  {
    id: 11,
    name: "Mũi Né",
    imageUrl: "https://r2.nucuoimekong.com/wp-content/uploads/mui-ne.jpg",
    category: "Biển",
    coordinates: [108.2692, 10.9453], // Mũi Né, Bình Thuận
  },
  {
    id: 12,
    name: "Đà Lạt",
    imageUrl: "https://cdn3.ivivu.com/2023/10/du-lich-Da-Lat-ivivu.jpg",
    category: "Núi",
    coordinates: [108.4502, 11.9404], // Đà Lạt, Lâm Đồng
  },
  {
    id: 13,
    name: "Lý Sơn",
    imageUrl:
      "https://cdnphoto.dantri.com.vn/LFD-Dwb09tw2pP4iMDrssoRV1hs=/thumb_w/1920/2023/05/10/anh-2-ly-son-1683692364174.jpg?watermark=true",
    category: "Biển",
    coordinates: [109.1114, 15.3788], // Lý Sơn, Quảng Ngãi
  },
  {
    id: 14,
    name: "Ba Vì",
    imageUrl:
      "https://ik.imagekit.io/tvlk/blog/2017/10/kham-pha-vuon-quoc-gia-Ba-Vi-001.jpg",
    category: "Núi",
    coordinates: [105.361, 21.1175], // Ba Vì, Hà Nội
  },
  {
    id: 15,
    name: "Hội An",
    imageUrl: "https://cdn3.ivivu.com/2023/10/du-lich-hoi-an-ivivu-img1.jpg",
    category: "Đồng bằng",
    coordinates: [108.324, 15.8801], // Hội An, Quảng Nam
  },
  {
    id: 16,
    name: "Cà Mau",
    imageUrl:
      "https://vcdn1-dulich.vnecdn.net/2022/04/06/dulichCaMau01-1649220925-3009-1649240147.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=__uuV0wfll0lZgX01LNRsA",
    category: "Đồng bằng",
    coordinates: [105.1596, 9.1767], // Cà Mau
  },
  {
    id: 17,
    name: "Bắc Giang",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/Đường_phố_thành_phố_Bắc_Giang.jpg",
    category: "Đồng bằng",
    coordinates: [106.2011, 21.2819], // Bắc Giang
  },
  {
    id: 18,
    name: "Bình Thuận",
    imageUrl:
      "https://mia.vn/media/uploads/blog-du-lich/du-lich-binh-thuan-01-1695999943.jpg",
    category: "Biển",
    coordinates: [108.101, 11.0901], // Bình Thuận
  },
];

export default datacity;
