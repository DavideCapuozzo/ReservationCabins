"use server";

import { signIn, signOut, auth } from "@/app/_lib/auth";
import { supabase } from './supabase';
import { revalidatePath } from "next/cache";
import { se } from "date-fns/locale";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";


export async function updateGuest(formData) {

    const session = await auth();
    if (!session) throw new Error('You must be logged in');
    const nationalID = formData.get('nationalID');
    const [nationality, countryFlag] = formData.get('nationality').split('%');
    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error('Invalid National ID');

    const updateData = { nationality, countryFlag, nationalID };

    const { data, error } = await supabase
        .from('guest')
        .update(updateData)
        .eq('id', session?.user?.guestId)

    if (error) throw new Error('Guest could not be updated');

    revalidatePath('/account/profile');

}

export default async function createBooking(bookingData, formData) {

    const session = await auth();
    console.log('SESSIONE', session);
    if (!session) throw new Error('You must be logged in');

    const newBooking = {
        ...bookingData,
        guestId: session.user.guestId,
        numGuest: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        isPaid: false,
        hasBreakfast: false,
        status: 'unconfirmed',
    };

    //console.log('NEW BOOKING', newBooking);

    const { error } = await supabase
        .from('bookings')
        .insert([newBooking])

    if (error) {
        throw new Error('Booking could not be created');
    }

    revalidatePath(`/cabins/${newBooking.cabinId}`);
    
    redirect('/cabins/thankyou');

}

export async function deleteReservation(bookingId) {


    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error)
        throw new Error('Booking could not be deleted');

    revalidatePath('/account/reservations'); //Aggiornare una pagina statica o cached dopo una modifica dei dati

}


export async function updateBooking(formData) {

    const bookingId = Number(formData.get('bookingId'));
    console.log('BOOKI111', bookingId);

    const session = await auth();
    console.log('SESSIONE', session);
    if (!session) throw new Error('You must be logged in');

    const guestBookings = await getBookings(session.user.guestId);
    console.log('BOOKINGS', guestBookings);
    const guestBookingIds = guestBookings.map((booking) => booking.id);



    if (!guestBookingIds.includes(bookingId)) throw new Error('You are not authorized to update this booking');

    const updateData = {
        numGuest: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000),
    };


    const { error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)
        .select()
        .single();

    if (error) throw new Error('Booking could not be updated');

    revalidatePath(`/account/reservations/edit/${bookingId}`);
    revalidatePath('/account/reservations');

    redirect('/account/reservations');


}



export async function signInAction() {
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" });
}