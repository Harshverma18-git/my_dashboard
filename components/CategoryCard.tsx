function CategoryCard({ name, percent }: any) {
  return (
    <div className="bg-[#020617] rounded-xl p-5">
      <p className="text-gray-400 mb-2">{name}</p>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-[#75a8db]  h-2 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-right text-sm mt-2">{percent}%</p>
    </div>
  );
}
export default CategoryCard;