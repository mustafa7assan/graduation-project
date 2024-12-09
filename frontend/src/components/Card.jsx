const Card = ({ children, bg = "bg-gray-100" }) => {
  return <div className={`${bg} p-10 rounded-xl shadow-md`}>{children}</div>;
};

export default Card;
