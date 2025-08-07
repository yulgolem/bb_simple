export default function AdminPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Администрирование</h1>
      <p className="text-neutral-400 mb-4">Удалить неактивные контексты.</p>
      <form action="/api/admin/contexts/cleanup" method="POST" className="flex items-center gap-2">
        <label className="text-sm text-neutral-400">Старше (дней):</label>
        <input name="days" defaultValue={30} type="number" min={0} max={365} className="w-24 bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2" />
        <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md">Удалить</button>
      </form>
      <p className="text-xs text-neutral-500 mt-3">Операция логируется на сервере.</p>
    </div>
  );
}


