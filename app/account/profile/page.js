import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth, signOut } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";


export const metadata = {
  title: 'Update Profile',
  description: 'Update your guest profile information for a smoother check-in process.',
};

export default async function Page() {

  const session = await auth();
  // console.log('Session:', session);
  const guest = await getGuest(session.user.email);
  console.log('Guest:', guest);

  // Se guest è null, reindirizza o mostra un messaggio
  if (!guest) {
    return (
      <div>
        <h2 className="font-semibold text-2xl text-accent-400 mb-4">
          Profile not found
        </h2>
        <p className="text-lg mb-8 text-primary-200">
          Your profile was not created during sign-in. Please sign out and sign in again to create your profile.
        </p>
        <form action={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}>
          <button type="submit" className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all">
            Sign out and try again
          </button>
        </form>
      </div>
    );
  }

  // CHANGE

  const countryFlag = "pt.jpg";
  const nationality = "portugal";


  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>

        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />

      </UpdateProfileForm>
    </div>
  );
}
