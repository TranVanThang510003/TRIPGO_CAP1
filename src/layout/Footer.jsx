const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t mt-12 ml-[130px] mr-[130px]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-start mt-10">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-4xl font-bold text-blue-900">TripGo.</h2>
          <div className="mb-4 mt-6">
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#">Về chúng tôi</a>
              </li>
              <li>
                <a href="#">TripGo Blog</a>
              </li>
              <li>
                <a href="#">Cơ hội nghề nghiệp</a>
              </li>
              <li>
                <a href="#">Phiếu quà tặng TripGo</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">Thông tin cần biết</h3>
            <ul className="mt-6 space-y-2 ">
              <li>
                <a href="#">Điều khoản và điều kiện</a>
              </li>
              <li>
                <a href="#">Quy chế hoạt động</a>
              </li>
              <li>
                <a href="#">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="#">Quy định về thanh toán</a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">Đối tác</h3>
            <ul className="mt-6 space-y-2">
              <li>
                <a href="#">Đăng ký nhà cung cấp</a>
              </li>
              <li>
                <a href="#">Đối tác đăng nhập</a>
              </li>
              <li>
                <a href="#">Đối tác liên kết</a>
              </li>
              <li>
                <a href="#">Chương trình cho bạn mới</a>
              </li>
              <li>
                <a href="#">Hợp tác marketing & phân phối</a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">Theo dõi chúng tôi trên</h3>
            <div className="flex space-x-4 mt-6">
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  className="w-10 h-10 "
                />
              </a>
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  className="w-10 h-10 rounded-full"
                />
              </a>
              <a href="#">
                <img
                  src="https://cdn.pixabay.com/photo/2021/06/23/18/31/twitter-6359396_960_720.png"
                  alt="Twitter"
                  className="w-10 h-10  rounded-full"
                />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Hotline: 1900 1234 <br />
                Email: TripGo@gmail.com <br />
                Số điện thoại: +84 236 3827111 <br />
                Địa chỉ: 03 Quang Trung, P. Hải Châu 1, Q. Hải Châu, Việt Nam
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-gray-200 pt-4 text-center text-gray-500 text-sm">
        All rights reserved @TripGo.com
      </div>
    </footer>
  );
};

export default Footer;
