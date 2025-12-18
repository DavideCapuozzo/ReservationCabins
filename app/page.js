/* @@@ NOTE @@@

--- ROUTES IN NEXT.JS ---
Ad ogni cartella corrisponde una route che verrà visualizzata anche nell'URL.
La cartella "app" è la root del progetto.
Il file "page.js" all'interno della cartella "app" corrisponde alla route "/" (home).
Se volessi creare una route "/about", dovrei creare una cartella "about" all'interno della cartella "app" e al suo interno un file "page.js".

--- Link in Next.js ---
In Next.js, per creare link tra le pagine si utilizza il componente "Link" importato da 'next/link'.
Questo componente permette di navigare tra le pagine senza ricaricare l'intera pagina, migliorando le performance dell'applicazione.
Esempio:
import Link from 'next/link';
<Link href="/about">About</Link>

--- Layout in Next.js ---
Next.js supporta i layout a livello di cartella. Se crei un file "layout.js" all'interno di una cartella, quel layout verrà applicato a tutte le pagine e sottocartelle all'interno di quella cartella.
Quindi ik layout dovrà contenere il tag HTML, BODY.

--- Loading in Next.js ---
Next.js supporta un file "loading.js" che viene mostrato durante il caricamento delle pagine.
Questo file può essere creato all'interno della cartella "app" o in qualsiasi sottocartella per personalizzare il caricamento per quella specifica sezione dell'app.
Se il file loading è presente, verrà mostrato automaticamente durante il caricamento di qualsiasi pagina.

--- SUSPENSE in Next.js ---
<Suspense> è un componente di React (integrato in Next.js) che serve per gestire il caricamento asincrono di parti della UI.
Mostra un contenuto di fallback (es. spinner o testo) mentre un componente o dei dati stanno ancora caricando, in modo tale che il resto della pagina venga visualizzato immediatamente senza dover aspettare il caricamento completo.
cosa che avverrebbe utulizzando un semplice loading

🧩 Come funziona
<Suspense fallback={<p>Loading cabins...</p>}>
  <CabinList />
</Suspense>

CabinList può essere un componente asincrono (async function) che fa fetch di dati.
React sospende il rendering finché non arriva la risposta.
Nel frattempo mostra il fallback.

🚀 In Next.js:
Funziona nativamente nel App Router (/app).
Permette il server component streaming → la pagina viene inviata a pezzi, mostrando subito ciò che è pronto.
Migliora la percezione di velocità e la user experience.

--- Server e Client Components in Next.js ---
Per default, tutti i componenti in Next.js sono Server Components, il che significa che vengono renderizzati sul server.
Se vuoi creare un Client Component (che viene eseguito nel browser), devi aggiungere la direttiva "use client" all'inizio del file.


--- Fetching Data in Next.js ---
Next.js fornisce diversi metodi per recuperare dati, tra cui:

1. **Static Generation (SG)**: I dati vengono recuperati al momento della build e la pagina viene generata staticamente. Questo è utile per contenuti che non cambiano frequentemente.
2. **Server-side Rendering (SSR)**: I dati vengono recuperati ad ogni richiesta, garantendo che l'utente veda sempre le informazioni più aggiornate.
3. **Client-side Rendering (CSR)**: I dati vengono recuperati nel browser, consentendo interazioni più dinamiche.

--- Componenti di Pagina ---
Se un componente è creato esclucivamente per una pagina, è consigliato creare il componente all'interno della cartella della pagina stessa.
PS: così facendo non potrai utilizzare quel componente da altre parti dell'applicazione.

--- Esclusione di cartelle dal routing ---
Se vuoi creare una cartella che non deve essere considerata una route, puoi anteporre un underscore (_) al nome della cartella.
Esempio: "_components", "_utils", ecc.

--- Metadata in Next.js ---
Next.js permette di definire i metadata delle pagine (come titolo e descrizione) direttamente nei file "layout.js" o "page.js" utilizzando l'export "metadata".
Esempio:
export const metadata = {
  title: 'My Page Title',
  description: 'My page description',
};
Questi metadata verranno automaticamente inseriti nel tag <head> della pagina.

Posso anche personalizzare il titolo e la descrizione per ogni pagina utilizzando un template nella pagina layout.js
export const metadata = {
  title:{
    template: '%s | The Wild Oasis',
    default: 'The Wild Oasis'
  },
  description: {
    template: '%s | Luxurious cabin hotel, located in the heart of Italian Dolomites, surrounded by beautiful mountains and dark forests.',
    default: 'Luxurious cabin hotel, located in the heart of Italian Dolomites, surrounded by beautiful mountains and dark forests.'
  }
};

%s andrà sostituito dal titolo e dalla descrizione specifici della pagina, se definiti.

--- Metadata Dinamica ---

export async function generateMetadata({ params }) {
    const cabin = await getCabin(params.cabinId);
    return {
        title: cabin.name,
        description: cabin.description,
    };
}

--- Favicon in Next.js ---
Per aggiungere una favicon al progetto Next.js, devi posizionare il file della favicon (ad esempio, "icon.estensione") nella cartella "app" alla radice del progetto.
Next.js servirà automaticamente i file presenti nella cartella "app" alla radice del sito. 

--- Fonts in Next.js ---
Next.js offre un'integrazione nativa con Google Fonts tramite il modulo 'next/font/google'.
Questo permette di importare e utilizzare i font di Google in modo ottimizzato, migliorando le performance del sito.
Esempio:
import { Josefin_Sans } from 'next/font/google';
const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});
Il font può poi essere applicato globalmente o a specifici componenti utilizzando la proprietà className.
Inserendolo nella classe del body nel layout.js, il font verrà applicato a tutto il sito.
<body className={`bg-primary-950 text-primary-100 min-h-screen ${josefin.className}`}>

--- IMAGE IN Next.js ---
Next.js fornisce un componente "Image" importato da 'next/image' che offre ottimizzazioni automatiche per le immagini, come il lazy loading e il ridimensionamento.
Questo ci permette di migliorare le performance del sito (le immagini vengono caricate solo quando sono visibili all'utente e vengono ottimizzate per diverse dimensioni dello schermo in formato WebP).
Esempio:
import Image from 'next/image';
<Image src="/logo.png" height={60} width={60} quality={10} alt="The Wild Oasis logo" />
Posso anche specificare la qualità dell'immagine con la proprietà "quality" (valore da 1 a 100).
DIMENSIONI:
- width: larghezza in pixel dell'immagine.
- height: altezza in pixel dell'immagine.
Se non specifico width e height, Next.js mostrerà un warning in console.

Per far si che non venga richiesto width e height, posso importare immagini locali utilizzando un import standard di JavaScript e l'immagine si addatterà automaticamente al contenitore.
Esempio:
import bg from '@/public/bg.png';
<Image src={bg} alt="Mountains and forests with two cabins" />
In questo modo Next.js gestirà automaticamente le dimensioni dell'immagine.

Aggiungendo la proprietà "fill", l'immagine riempirà completamente il contenitore padre. (width: 100%; height: 100%; position: absolute;)
in questo caso se nel contenitore padre avremo altri elementi come testi e bottoni andranno direttamente a sovrapporsi all'immagine.

Possiamo usare anche la proprietà "object-fit" per controllare come l'immagine si adatta al contenitore (es. object-cover, object-contain, ecc.)

Abbiamo anche la proprirtà placeholder="blur" per mostrare un'immagine sfocata mentre l'immagine principale viene caricata.

--- IMMAGINI DINAMICHE IN NEXT.JS ---
Usare <Image /> di Next.js con URL dinamici (es. da Supabase) mantenendo le ottimizzazioni di Next.

✅ Configurazione (next.config.mjs)

Serve a dire a Next da quali domini può caricare immagini remote:

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lmxdeehgocrvegqqkhyd.supabase.co',
        pathname: '/storage/v1/object/public/cabin-images/**',
      },
    ],
  },
};
export default nextConfig;


Questo autorizza tutte le immagini tipo:

https://lmxdeehgocrvegqqkhyd.supabase.co/storage/v1/object/public/cabin-images/cabin-1.jpg

🧱 Componente (CabinCard.jsx)
function CabinCard({ cabin }) {
  const { name, image } = cabin;

  return (
    <div className="flex border-primary-800 border">
      <Image
        src={image}
        fill
        alt={`Cabin ${name}`}
        className="flex-1 border-r border-primary-800"
      />
    </div>
  );
}


Qui image è un URL dinamico (es. preso da Supabase).
Next verifica che rispetti il pattern del next.config.mjs, e se sì:

ottimizza l’immagine (resize, lazy load, WebP, ecc.),

la serve in sicurezza tramite /_next/image.

--- SUPABASE ---
Per creare la connesione a Supabase, utilizziamo il client ufficiale "@supabase/supabase-js". che dobbiamo preinstallare trmite npm i @supabase/supabase-js
Creiamo un file "supabase.js" all'interno della cartella "app/_lib" (cartella con underscore per escluderla dal routing).
In questo file importiamo la funzione createClient da "@supabase/supabase-js" e creiamo un'istanza del client Supabase utilizzando l'URL e la chiave anonima che abbiamo salvato nelle variabili d'ambiente.
Esportiamo poi il client Supabase per poterlo utilizzare in altre parti dell'applicazione.
import { createClient } from "@supabase/supabase-js";
export const supabase= createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

--- API ROUTES in Next.js ---
Next.js supporta le API Routes, che permettono di creare endpoint API direttamente all'interno dell'applicazione Next.js.
Questi endpoint possono essere utilizzati per gestire richieste HTTP come GET, POST, PUT, DELETE, ecc.
Per creare un'API Route, devi creare una cartella "api" all'interno della cartella "app" (es. app/api) e al suo interno creare file JavaScript o TypeScript che rappresentano gli endpoint API.
Ogni file all'interno della cartella "api" corrisponde a un endpoint API accessibile tramite l'URL "/api/nome-file".
In questo caso pero abbiamo creato un file "data-service.js" all'interno della cartella "app/_lib" per gestire tutte le operazioni di CRUD (Create, Read, Update, Delete) con Supabase.

--- DYNAMIC ROUTES in Next.js ---
Next.js supporta le Dynamic Routes, che permettono di creare pagine con URL dinamici basati su parametri.
Per creare una Dynamic Route, devi utilizzare le parentesi quadre nella cartella all'interno della cartella "app".
Al suo interno andari a creare il file page.js che rappresenta la pagina dinamica.
Nel nostro caso specifico siamo andati a creare la pagina per visualizzare le singole camere (cabins) utilizzando una Dynamic Route basata sull'ID della cabina.
All' interno di questo file troviamo il seguente codice:
export default async function Page({ params }) {   // params è un oggetto che contiene i parametri dinamici estratti dall'URL è cosi di default
    const cabin = await getCabin(params.cabinId);
    const { id, name, maxCapacity, regularPrice, discount, image, description } =
        cabin;

PARAMS:
Il parametro "params" è un oggetto che contiene i parametri dinamici estratti dall'URL.
In questo caso, "params.cabinId" rappresenta l'ID della cabina estratto dall'URL dinamico.
Ad esempio, se l'URL è "/cabins/123", allora "params.cabinId" sarà "123".
Utilizziamo questo ID per recuperare i dati specifici della cabina dal database Supabase tramite la funzione "getCabin".

--- ERROR UI ---
Next.js permette di creare una pagina di errore personalizzata creando un file "error.js" all'interno della cartella "app". )
Questa pagina dovrà essere un Client Component (deve contenere "use client" all'inizio del file) perché potrebbe includere interazioni con l'utente, come pulsanti per riprovare il caricamento della pagina.
Verranno quindi catturati solo gli errori di rendering della pagina e non errori di fetching dati nel server.

Mentre per la gestione delle pagine non trovate (404) possiamo creare un file "not-found.js" all'interno della cartella "app" o in qualsiasi sottocartella per personalizzare la pagina 404 per quella specifica sezione dell'app.

In oltre se gestiamo gli errori di fetching dati nel server (es. con try-catch o con if) possiamo utilizzare la funzione "notFound()" importata da 'next/navigation' per mostrare la pagina 404 personalizzata quando i dati non vengono trovati.
export async function getCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

--- PAGINE STATICHE E DINAMICHE ---
Per default, Next.js genera pagine statiche (Static Generation) durante la build del progetto.
Tuttavia, se una pagina contiene operazioni asincrone (es. fetching dati) che non possono essere risolte durante la build, Next.js genererà quella pagina come Server-side Rendering (SSR), rendendola dinamica.
In questo caso, la pagina verrà renderizzata sul server ad ogni richiesta, garantendo che l'utente veda sempre le informazioni più aggiornate.

Nel nostro caso in particolare alla sezione 34 Lezione 454 abbiamo questa situazione:
Route (app)                              Size     First Load JS
┌ ○ /                                    526 B           102 kB
├ ○ /_not-found                          150 B          87.4 kB
├ ○ /about                               732 B          93.1 kB
├ ○ /account                             150 B          87.4 kB
├ ○ /account/profile                     181 B          92.6 kB
├ ○ /account/reservations                181 B          92.6 kB
├ ○ /cabins                              185 B           101 kB
├ ƒ /cabins/[cabinId]                    181 B          92.6 kB
└ ○ /icon.png                            0 B                0 B
+ First Load JS shared by all            87.2 kB
  ├ chunks/117-8b81c81bc36ef16f.js       31.7 kB
  ├ chunks/fd9d1056-749e5812300142af.js  53.6 kB
  └ other shared chunks (total)          1.86 kB


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

tutto cio possiamo visualizzarlo andando a lanciare il comando:
npx next build

--- RENDERE STATICHE ANCHE LE PAGINE DINAMICHE ---
sei un esperto di react e nexjs, voglio capire il funzionamento di pagine statiche e dinamiche e in particolare del perchè conviene rendere delle pagine che next definisce dinamiche statiche in modo da aumentare le prestazioni in particolare ho un app di prenoatazione stanze e se da prima il sito risultava così :
Route (app)                              Size     First Load JS
┌ ○ /                                    526 B           102 kB
├ ○ /_not-found                          150 B          87.4 kB
├ ○ /about                               732 B          93.1 kB
├ ○ /account                             150 B          87.4 kB
├ ○ /account/profile                     181 B          92.6 kB
├ ○ /account/reservations                181 B          92.6 kB
├ ○ /cabins                              185 B           101 kB
├ ƒ /cabins/[cabinId]                    181 B          92.6 kB
└ ○ /icon.png                            0 B                0 B
+ First Load JS shared by all            87.2 kB
  ├ chunks/117-8b81c81bc36ef16f.js       31.7 kB
  ├ chunks/fd9d1056-749e5812300142af.js  53.6 kB
  └ other shared chunks (total)          1.86 kB


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

ora risulta così 
 ✓ Generating static pages (15/15)
 ✓ Collecting build traces    
 ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    526 B           102 kB
├ ○ /_not-found                          150 B          87.4 kB
├ ○ /about                               732 B          93.1 kB
├ ○ /account                             150 B          87.4 kB
├ ○ /account/profile                     181 B          92.6 kB
├ ○ /account/reservations                181 B          92.6 kB
├ ○ /cabins                              185 B           101 kB
├ ● /cabins/[cabinId]                    181 B          92.6 kB
├   ├ /cabins/1
├   ├ /cabins/2
├   ├ /cabins/3
├   └ [+2 more paths]
└ ○ /icon.png                            0 B                0 B
+ First Load JS shared by all            87.2 kB
  ├ chunks/117-8b81c81bc36ef16f.js       31.7 kB
  ├ chunks/fd9d1056-749e5812300142af.js  53.6 kB
  └ other shared chunks (total)          1.86 kB


○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML
ChatGPT ha detto:

Perfetto — ottima domanda, e molto rilevante per capire come Next.js ottimizza prestazioni e SEO 💪
Vediamo di chiarire cosa sta succedendo e perché passare da pagine dinamiche (ƒ) a pagine statiche (●) è una buona mossa nel tuo caso.

🔍 1. Cos’è la differenza tra pagine statiche e dinamiche in Next.js
○ Static (Static Rendering)

La pagina viene pre-renderizzata al build time, cioè una volta sola quando fai next build.

Il risultato è HTML statico, servito da CDN — nessuna esecuzione del server ad ogni richiesta.

Esempio tipico: /about, /home, /cabins (lista di stanze)

➡️ Velocissimo perché il server non fa calcoli runtime.

ƒ Dynamic (Server-side Rendering - SSR)

La pagina viene generata ad ogni richiesta (runtime) con getServerSideProps() o fetching lato server.

Ogni utente che entra → Next.js esegue il codice sul server, fa query, genera HTML e poi risponde.

Esempio: /cabins/[cabinId] se viene generato al volo ogni volta.

➡️ Più lento, perché ogni richiesta è un rendering nuovo.

● SSG (Static Site Generation con paths dinamici)

È un compromesso intelligente tra i due mondi.

Next.js genera pagine statiche anche per percorsi dinamici (es. /cabins/1, /cabins/2, ecc.) al build time.

Usa getStaticPaths() + getStaticProps() per dire a Next.js quali slug/cabinId generare.

➡️ Ottieni prestazioni da statico anche per pagine che normalmente sarebbero dinamiche!

⚙️ 2. Cosa è successo nel tuo caso
Prima:
├ ƒ /cabins/[cabinId]


→ Questa era dinamica SSR: ogni volta che un utente visitava una cabina, il server rigenerava l’HTML.
Buono se i dati cambiano spesso, ma lento e con costo server alto.

Ora:
├ ● /cabins/[cabinId]
├   ├ /cabins/1
├   ├ /cabins/2
├   ├ /cabins/3
├   └ [+2 more paths]


→ Adesso stai usando SSG (Static Site Generation).
Next.js ha pre-costruito le pagine /cabins/1, /cabins/2, ecc. al momento del build.

✅ Risultato:

Queste pagine sono statiche, servite direttamente da CDN.

Non richiedono nessuna esecuzione del server.

Riduzione drastica del TTFB (Time To First Byte).

Perfetto per SEO (Google indicizza HTML già pronto).

Scalabilità enorme — puoi servire milioni di utenti senza carico aggiuntivo sul backend.

⚡ 3. Perché conviene (nel caso delle stanze prenotabili)

Nel tuo caso (prenotazione stanze / “cabins”):

Le informazioni base delle stanze (nome, descrizione, prezzo, immagini) cambiano raramente.

Non serve rigenerare ogni volta via SSR.

Meglio generarle una volta sola (SSG) e servirle staticamente.

Puoi aggiornare solo quando cambia qualcosa, con:

Revalidation (revalidate) → rigenerazione automatica dopo un tempo.

On-demand ISR → rigeneri manualmente quando aggiorni i dati nel CMS/DB.

➡️ In pratica:

export async function getStaticPaths() {
  const cabins = await fetchCabins();
  return {
    paths: cabins.map(cabin => ({ params: { cabinId: cabin.id.toString() } })),
    fallback: 'blocking', // o 'false' se vuoi solo i pre-generati
  };
}

export async function getStaticProps({ params }) {
  const cabin = await fetchCabinById(params.cabinId);
  return {
    props: { cabin },
    revalidate: 60 * 60, // rigenera ogni ora, opzionale
  };
}

🧠 4. In sintesi
Tipo	Simbolo	Quando si genera	Dove vive	Performance	Esempio
Static	○	Al build	CDN	⚡⚡⚡	/about
SSR (dinamico)	ƒ	A ogni richiesta	Server	🐢	/cabins/[id] prima
SSG	●	Al build (per path dinamici)	CDN	⚡⚡⚡	/cabins/[id] ora
ISR	● + revalidate	Periodicamente o on-demand	CDN	⚡ + aggiornabile	/cabins/[id] con revalidate
✅ 5. Benefici ottenuti nel tuo build

Pagine /cabins/[id] ora statiche e veloci

Ridotto carico sul server

Miglior SEO e UX

Build leggermente più lungo, ma runtime quasi istantaneo

Possibilità di usare Incremental Static Regeneration per dati aggiornabili

REGOLA:
-Dati che cambiano raramente → SSG (static)
-Dati che cambiano spesso o sono personalizzati → SSR (dynamic)
-Dati che cambiano ogni tanto → ISR (static + revalidate)

--- next.config.mjs ---

@type {import('next').NextConfig}
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lmxdeehgocrvegqqkhyd.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
        search: '',
      },
    ],
  },
  output: 'export',   // <-- Aggiunto per esportazione statica completa di tutto il sito
};

export default nextConfig;

una volta aggiunto questo parametro, quando eseguo il comando "npx run build" verrà generata una cartella di nome "out" contenente tutti i file statici del sito pronti per essere distribuiti su qualsiasi server statico (es. Netlify, Vercel, GitHub Pages, ecc.)


--- USE CLIENT ---
Per indicare che un componente deve essere eseguito come Client Component in Next.js, è necessario aggiungere la direttiva "use client" all'inizio del file del componente.
Questo è importante perché, per default, tutti i componenti in Next.js sono Server Components, che vengono eseguiti sul server.
Aggiungendo "use client", si specifica che il componente deve essere eseguito nel browser, consentendo l'uso di funzionalità specifiche del client come lo stato locale, gli effetti collaterali e gli eventi del DOM.

use state ad esempio non funziona nei server components (essendo un hook di React che gestisce il cambio stato di un componente che cambiano nel tempo e salva questi suoi valori nella memoria del browser) quindi se voglio utilizzarlo devo trasformare il componente in client component aggiungendo "use client" all'inizio del file.


--- Come passare dati da client a server components ---
Vogliamo passare lo stato del filtro (che ci permette di filtrare per il numero di posti nelle cabine) dal componente Filter (Client Component) al componente CabinList (Server Component).
Per fare cio il modo migliore in next per condividere questo stato è passarlo nell'URL come query parameter.
Utilizzando router.replace() del componente Filter, andiamo a modificare l'URL della pagina corrente aggiungendo il parametro di query "capacity" con il valore del filtro selezionato dall'utente.
In questo modo, quando il componente CabinList viene renderizzato, può leggere il valore del filtro direttamente dall'URL utilizzando "searchParams" (proprietà disponibile nei Server Components che permette di accedere ai parametri di query dell'URL).
In questo modo, il componente CabinList può recuperare i dati filtrati in base al valore selezionato dall'utente nel componente Filter.
(i file che abbiamo in gioco sono app/cabins/page.js, app/cabins/components/Filter.jsx, app/cabins/components/CabinList.jsx)

RICAPITOLANDO:
il componente Filter è richiamato nella pagina cabins/page.js che a sua volta passa il valore del filtro al componente CabinList che si occupa di recuperare i dati filtrati da Supabase in base al valore del filtro selezionato dall'utente.


########## filter.js (Client Component) #############
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



--- COME FUNZIONA SUSPENCE NEL CASO DEI FILTRI ---
In questo caso specifico, il componente Filter è un Client Component (contiene "use client" all'inizio del file) perché gestisce l'interazione dell'utente tramite un menu per selezionare il filtro di capacità.
<Suspense fallback={<Spinner/>} key={filter}>
  <CabinList filter={filter} />
</Suspense>

siamo andati a racchiudere il componente CabinList all'interno di un componente <Suspense> con un fallback di tipo Spinner (componente che mostra una rotellina di caricamento) e abbiamo aggiunto la proprietà "key" con valore "filter" (valore che rappresenta il filtro di capacità selezionato dall'utente).
se non avessimo utilizzato la proprietà "key", React avrebbe riutilizzato il componente CabinList esistente quando il filtro cambia, senza rieseguirlo e mostrando quindi i dati vecchi per poi mostrare i nuovi dati una volta caricati.


--- Come passare dati da server a client ---
in questo caso:
<UpdateProfileForm>

        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
        />

      </UpdateProfileForm>

dobbiamo per forza dal nostro file server component profile/page.js richiamare il componente UpadateProfileForm (Client Component) e passargli come props i dati recuperati dal server (in questo caso la nazionalità dell'utente). (nel nostro file profile/page avremo un children che conterrà il componente SelectCountry)

rricapitolando:
Abbiamo il nostro formProfile che chiaramente è un componente lato client che ci permette di compilare i dati del notro cliente
Abbiamo la pagina profile/page.js che è un server component
Abbiamo il componente SelectCountry che è un componente lato server che a sua volta va a richiamare un api che restituisce tutti i paesi del mondo
Per far si che il componente SlectCountry venga passato lato client per poter quindi visulizzare e selezionare nel form i paesi dobbiamo passare come children il valore di selectCountry
tramite il componente che UpdateProfileForm dalla pagina profile/page.js


-------- Promise --------------------------------
In cabinId page.js abbiamo questo codice:

const cabin = await getCabin(params.cabinId);
const settings = await getSettings();
const bookedDates = await getBookedDatesByCabinId(params.cabinId);

che letto cosi ci sta facendo recuperare dei dati da alcune chiamate

In questo punto si crea un rallentamnto importante in quanto ogni richiesta è scollegata l'una dall'altra e richiede ognuna di esse un tempo prima di ricevere una risposta
andando a rallentare il caricamento complessivo della pagina.

Per gestire al meglio questa situaizone andiamo ad ut ilizzare le Promise di JavaScript che ci permettono di eseguire più operazioni asincrone in parallelo, migliorando le prestazioni complessive.

const [cabin, settings, bookedDates] = await Promise.all([getCabin(params.cabinId), getSettings(), getBookedDatesByCabinId(params.cabinId)]);

MA QUESTO NON RIMANE COMUNQU EIL MIGLIOR MODO PER GESTIRE UNA SITUAZIONE DLE GENERE, infatti:
Andiamo a portar fuori dal nostro componente cabinId page.js <DateSelector /> <ReservationForm /> che andiamo a gestire in un componente a parte in modo tale che la pagina cabinId page.js si occupi solo di recuperare i dati e passarli come props ai componenti figli.
e dopo di che andiamo a richiamare il componente <Reservation> all'interno del quale andremo a gestire il caricamento dei dati di <DateSelector /> <ReservationForm />
e faremo visualizzare il nostro componente interno nella pagina cabinId page.js tramite Suspense in modo tale che la pagina venga caricata subito e il componente Reservation venga caricato in un secondo momento senza bloccare il caricamento della pagina principale.



------------------------- CREATO L'AZIONE PER SALVARE I DATI COMPILATI NEL FORM DAL CLIENTE SUL DATABASE SUPABASE (ACTION.JS)----------------------------
export async function updateGuest(formData) {

    const session = await auth();
    if (!session) throw new Error('You must be logged in');
    const nationalID = formData.get('nationalID');
    const [nationality, countryFlag] = formData.get('nationality').split('%');
    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error('Invalid National ID');
    const updateData = { nationality, countryFlag, nationalID };
    // console.log('Updating guest with data:', updateData);

    const { data, error } = await supabase
        .from('guest')
        .update(updateData)
        .eq('id', session?.user?.guestId)

    if (error) throw new Error('Guest could not be updated');



}
*/

import Link from "next/link";
import Image from "next/image";
import bg from '@/public/bg.png';




export default function Home() {
  return (
    
    
   
      <main className="mt-24">
        <Image src={bg} fill className="object-cover object-top" quality={80} placeholder="blur" alt="Mountains and forests with two cabins" />

        <div className="relative z-10 text-center">
          <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
            Welcome to paradise.
          </h1>
          <Link
            href="/cabins"
            className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Explore luxury cabins
          </Link>
        </div>
      </main>
    
  );

  
}
