import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {

  const session = await auth();
  // console.log("Navigation session:", session);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (<Link
            href="/account"
            className="hover:text-accent-400 transition-colors flex items-center gap-4"
          >
            <Image className="h-8 rounded-full" src={session.user.image} alt={session.user.name} width={32} height={32} referrerPolicy="no-referrer" />
            <sapn>Guest area</sapn>
          </Link>) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              
              <sapn>Guest area</sapn>
            </Link>
          )
          }
        </li>
      </ul>
    </nav>
  );
}
