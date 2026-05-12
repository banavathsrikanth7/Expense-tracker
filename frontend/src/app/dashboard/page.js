export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded">Total Balance</div>
        <div className="p-4 border rounded">Income</div>
        <div className="p-4 border rounded">Expenses</div>
      </div>
    </div>
  );
}