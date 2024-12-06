/* eslint-disable react/prop-types */

const IconHeart = ({
  defaultLiked = true,
  initialLiked = false,
  liked = false,
  className = "",
  onClick = () => {},
}) => {
  const [newLiked, setNewLiked] = useState(initialLiked);

  const handleClick = () => {
    setNewLiked((prev) => !prev); // Toggle the liked state
    onClick(!newLiked); // Call the passed onClick handler with the new liked state
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill={defaultLiked ? (newLiked || liked ? "red" : "none") : "none"}
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-heart ${className}`} // Sửa lỗi cú pháp
      onClick={handleClick}
      role="button" // Thêm thuộc tính role
      aria-pressed={newLiked} // Thêm thuộc tính aria-pressed
      tabIndex="0" // Cho phép điều hướng bằng bàn phím
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }} // Thêm sự kiện bàn phím để tương tác
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
};

export default IconHeart;
