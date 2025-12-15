import ButtonLogout from "../compondents/buttonlogout";
import FormNewBoard from "../compondents/formnewboard";

export default function Dashboard() {
  return (
    <main className="bg-base-200 min-h-screen flex items-start justify-center py-10 px-4">
      <section className="w-full max-w-3xl space-y-6">
        <header className="bg-base-100 rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <ButtonLogout />
        </header>

        <section>
          <FormNewBoard />
        </section>
      </section>
    </main>
  );
}
