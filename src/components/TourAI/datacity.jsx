const datacity = [
  // Existing cities
  {
    id: 1,
    name: "Phú Quốc",
    imageUrl: "https://rootytrip.com/wp-content/uploads/2024/07/phu-quoc.jpg",
    category: "Biển",
  },
  {
    id: 2,
    name: "Nha Trang",
    imageUrl:
      "https://cdn.tuoitre.vn/471584752817336320/2023/4/18/tp-nha-trang-16818161974101240202452.jpeg",
    category: "Biển",
  },
  {
    id: 3,
    name: "Đà Nẵng",
    imageUrl:
      "https://houserentaldanang.com/wp-content/uploads/2023/09/Vi-sao-da-nang-lai-thu-hut-nhieu-khach-du-lich-1.jpg",
    category: "Biển",
  },
  {
    id: 4,
    name: "Vịnh Hạ Long",
    imageUrl:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/08/09/vinh-ha-long-3-1624.jpg",
    category: "Núi",
  },
  {
    id: 5,
    name: "Quảng Bình",
    imageUrl:
      "https://www.bambooairways.com/documents/20122/1165110/di-quang-binh-mua-nao-dep-1-1024x683.jpg/9d17c773-4184-29f3-f409-0d0aaa6f1546?t=1695024329425",
    category: "Đồng bằng",
  },
  {
    id: 6,
    name: "Ninh Bình",
    imageUrl:
      "https://ik.imagekit.io/tvlk/blog/2022/12/du-lich-ninh-binh-1.jpg?tr=dpr-2,w-675",
    category: "Đồng bằng",
  },
  {
    id: 7,
    name: "Sapa",
    imageUrl:
      "https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/2141517477-1675341889920.jpg",
    category: "Núi",
  },
  {
    id: 8,
    name: "Vũng Tàu",
    imageUrl:
      "https://vcdn1-dulich.vnecdn.net/2022/07/02/bien-vung-tau-jpeg-2320-165545-5919-1133-1656726932.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=BkyR747bWwRXDZPE7wX94w",
    category: "Biển",
  },
  {
    id: 9,
    name: "Hà Nội",
    imageUrl:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg",
    category: "Đồng bằng",
  },
  {
    id: 10,
    name: "Huế",
    imageUrl:
      "https://image.vietgoing.com/destination/large/vietgoing_awy2103053798.webp",
    category: "Đồng bằng",
  },
  {
    id: 11,
    name: "Mũi Né",
    imageUrl: "https://r2.nucuoimekong.com/wp-content/uploads/mui-ne.jpg",
    category: "Biển",
  },
  {
    id: 12,
    name: "Đà Lạt",
    imageUrl: "https://cdn3.ivivu.com/2023/10/du-lich-Da-Lat-ivivu.jpg",
    category: "Núi",
  },
  {
    id: 13,
    name: "Lý Sơn",
    imageUrl:
      "https://cdnphoto.dantri.com.vn/LFD-Dwb09tw2pP4iMDrssoRV1hs=/thumb_w/1920/2023/05/10/anh-2-ly-son-1683692364174.jpg?watermark=true",
    category: "Biển",
  },
  {
    id: 14,
    name: "Ba Vì",
    imageUrl:
      "https://ik.imagekit.io/tvlk/blog/2017/10/kham-pha-vuon-quoc-gia-Ba-Vi-001.jpg",
    category: "Núi",
  },
  {
    id: 15,
    name: "Hội An",
    imageUrl: "https://cdn3.ivivu.com/2023/10/du-lich-hoi-an-ivivu-img1.jpg",
    category: "Đồng bằng",
  },
  {
    id: 16,
    name: "Cà Mau",
    imageUrl:
      "https://vcdn1-dulich.vnecdn.net/2022/04/06/dulichCaMau01-1649220925-3009-1649240147.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=__uuV0wfll0lZgX01LNRsA",
    category: "Đồng bằng",
  },
  {
    id: 17,
    name: "Bắc Giang",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/Đường_phố_thành_phố_Bắc_Giang.jpg",
    category: "Đồng bằng",
  },
  {
    id: 18,
    name: "Bình Thuận",
    imageUrl:
      "https://mia.vn/media/uploads/blog-du-lich/du-lich-binh-thuan-01-1695999943.jpg",
    category: "Biển",
  },
  {
    id: 19,
    name: "Lâm Đồng",
    imageUrl:
      "https://lamdong.gov.vn/sites/snnptnt/gioithieu/dautulamdong/SiteAssets/SitePages/LAM-DONG-TIEM-NANG-VA-THE-MANH/3612-TP-da-lat.jpg",
    category: "Núi",
  },
  {
    id: 20,
    name: "Quảng Ninh",
    imageUrl:
      "https://media.vneconomy.vn/w800/images/upload/2024/07/03/quang-ninh-lam-theo-loi-bac.jpg",
    category: "Biển",
  },
  {
    id: 21,
    name: "Hà Giang",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Dốc_Thẩm_Mã_2022_-_NKS.jpg/1200px-Dốc_Thẩm_Mã_2022_-_NKS.jpg",
    category: "Núi",
  },
  {
    id: 22,
    name: "Thanh Hóa",
    imageUrl:
      "https://bcp.cdnchinhphu.vn/334894974524682240/2023/2/27/thanhphothanhhoa-16774897649251166490864.jpg",
    category: "Đồng bằng",
  },
  {
    id: 23,
    name: "Tây Ninh",
    imageUrl:
      "https://tinviettravel.com/uploads/tours/2022_11/du-lich-tay-ninh-nui-ba-den.jpg",
    category: "Núi",
  },
  {
    id: 24,
    name: "Bình Định",
    imageUrl:
      "https://www.icisequynhon.com/wp-content/uploads/2020/05/quynhon-binhdinh.jpg",
    category: "Biển",
  },
  {
    id: 25,
    name: "Sóc Trăng",
    imageUrl:
      "https://images.baodantoc.vn/uploads/2023/Thang-11/Ngay-22/Hanh-Nguyen/Ta%20mon.jpg",
    category: "Đồng bằng",
  },
  {
    id: 26,
    name: "Yên Bái",
    imageUrl:
      "https://bcp.cdnchinhphu.vn/334894974524682240/2023/9/12/3311102-1694508091768808652599.jpg",
    category: "Núi",
  },
  {
    id: 27,
    name: "Nam Định",
    imageUrl:
      "https://xdcs.cdnchinhphu.vn/446259493575335936/2024/1/4/namdinh-170433602496391230907.jpeg",
    category: "Đồng bằng",
  },
  {
    id: 28,
    name: "Bạc Liêu",
    imageUrl:
      "https://thamhiemmekong.com/wp-content/uploads/2020/04/nhahatcaovanlau2.jpg",
    category: "Đồng bằng",
  },
  {
    id: 29,
    name: "Hải Phòng",
    imageUrl:
      "https://i0.wp.com/heza.gov.vn/wp-content/uploads/2023/10/hai_phong-scaled.jpg?fit=2560%2C1662&ssl=1",
    category: "Biển",
  },
  {
    id: 30,
    name: "Cần Thơ",
    imageUrl: "https://cdn3.ivivu.com/2023/10/du-lịch-cần-thơ-ivivu1.jpg",
    category: "Đồng bằng",
  },
];

export default datacity;
