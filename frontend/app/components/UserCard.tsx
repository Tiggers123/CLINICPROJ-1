const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-lamaPink even:bg-white p-4 flex-1 min-w-[220px] shadow-md">
      <h2 className="capitalize text-md  text-black">{type}</h2>
      <span className="text-[15px] bg-gray-50  px-2 py-1 rounded-full text-black">
        2024/25
      </span>
    </div>
  );
};

export default UserCard;
