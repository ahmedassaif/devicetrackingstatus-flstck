import AuditList from "./components/table/main-table";

export default async function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            <p className="text-2xl px-4 font-bold">Audits</p>
            <AuditList />
        </div>
    )
}