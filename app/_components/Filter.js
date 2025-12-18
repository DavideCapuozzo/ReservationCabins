"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Filter() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const activeFilter = searchParams?.get("capacity") || "all";

    function handleFilter(filter){
        console.log("FILTER SELECTED", filter);
        const params = new URLSearchParams(searchParams);  // andiamo ad inserire nella nuova istanza serchParams i parametri già esistenti per non perderli in caso avessimo  avuto altri filtri oltre alla capacità se non li avessimo passati sarebbero andati persi
        params.set("capacity", filter);
        router.replace(`${pathname}?${params.toString()}` , {scroll: false} );  // router.replace ci permette di cambiare l'url senza ricaricare la pagina, in questo modo possiamo aggiornare i parametri di ricerca senza perdere lo stato della pagina, con {scroll: false} evitiamo che la pagina venga scrollata in alto automaticamente quando cambiamo il filtro
    }

    return (
        <div className="border border-primary-800 flex ">


            <Button filter='all' handleFilter={handleFilter} activeFilter={activeFilter}>All cabins</Button>
            <Button filter='small' handleFilter={handleFilter} activeFilter={activeFilter}>1&mdash;3 guests</Button>
            <Button filter='medium' handleFilter={handleFilter} activeFilter={activeFilter}>4&mdash;7 guests</Button>
            <Button filter='large' handleFilter={handleFilter} activeFilter={activeFilter}>8&mdash;12 guests</Button>

        </div>
    )
}

function Button({ filter, handleFilter, activeFilter, children }){
    return (
        <button className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? "bg-primary-700 text-primary-50" : ""}`} onClick={()=>handleFilter(filter)}>{children}</button>
    );
}
