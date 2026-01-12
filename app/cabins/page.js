import CabinList from "@/app/_components/CabinList";
import { Suspense } from "react";
// import Loading from "@/app/cabins/loading";
import Spinner from "../_components/Spinner";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "@/app/_components/ReservationReminder";

// questo funzionamento viene impostato a livello di percorso di pagina, ma possiamo impostarlo anche a livello di singolo componente o addirittura di singola funzione che recupera i dati
//export const revalidate = 3600; //(si tratta di secondi) Questo valore ci permette di definire quanto tempo deve passare prima che la pagina venga rigenerata fornendo così dati nuovi aggiornati, questo valore non può essere passato da una variabile deve essere per forza un valore inserito da noi
export const revalidate = 15; 

export const metadata = {
  title: 'Cabins',
};

export default async function Page({searchParams}) {  // searchParams è un oggetto che contiene i parametri di ricerca passati nell'url, ad esempio ?capacity=small e viene passato automaticamente da Next.js ai componenti di pagina che ne fanno richiesta

  // console.log("SEARCH PARAMS", searchParams);

  const filter = searchParams?.capacity ?? "all";


  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy natures beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>


      <Suspense fallback={<Spinner/>} key={ filter }>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>

    </div>
  );
}
