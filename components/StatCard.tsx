function StatCard({ title, value }: any) {
  return (
    <div className="bg-[#020617] rounded-xl p-5">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
export default StatCard;