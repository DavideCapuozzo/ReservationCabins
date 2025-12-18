import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: 'Account',
};

export default async function AccountPage() {

  const session = await auth()

  console.log('Session in AccountPage:', session);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {session?.user?.name}
      </h2>
    </div>
  );
}
