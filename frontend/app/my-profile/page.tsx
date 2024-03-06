'use client';
import { Form } from "@/components/ui/form";
import { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"




export default function MyProfil() {
    const [flipped, setFlipped] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    const buttonToShow = flipped ? document.getElementById('edit') : document.getElementById('save');
    const buttonToHide = flipped ? document.getElementById('save') : document.getElementById('edit');

    buttonToShow.style.opacity = "100%";
    buttonToHide.style.opacity = "0%";
    document.querySelectorAll("input").forEach(input => {
        input.disabled = !input.disabled;
    });
    var profilPicture = document.getElementById('profil-picture')
    var form = document.getElementsByTagName('form')[0]
    if (flipped == false) {
        document.getElementById('save').style.transform = "translateY(0rem)";
        document.getElementById('edit').style.transform  = "translateY(-5rem)";
        profilPicture.style.opacity = "100%"
        form.style.height = "550px"
      }
    else {
        document.getElementById('save').style.transform = "translateY(-6rem)";
        document.getElementById('edit').style.transform  = "translateY(-12rem)";
        profilPicture.style.opacity = "0%"
        form.style.height = "450px"
      }

    setFlipped(!flipped);
  };
    return (
    <div className={"h-full flex "}>
    <Sidebar className="max-w-[25%]" />
    <form onSubmit={handleClick} className="w-full mx-24 my-auto border flex flex-col h-[450px] p-6 rounded-lg shadow-sm duration-500">
      <label className="mb-4">
        <strong>Nom:</strong> 
        <input disabled type="text" className="px-2 rounded border-2 border-solid border-black form-input mt-1 block w-full focus:text-white focus:bg-black" />
      </label>
      <label className="mb-4">
        <strong>Prénom:</strong>
        <input disabled type="text" className="px-2 rounded border-2 border-solid border-black form-input mt-1 block w-full focus:text-white focus:bg-black" />
      </label>

      <label className="mb-4">
        <strong>Email:</strong>
        <input disabled type="text" className="px-2 rounded border-2 border-solid border-black form-input mt-1 block w-full focus:text-white focus:bg-black" />
      </label>

      <label className="mb-4">
        <strong>Mot de passe:</strong>
        <input disabled type="password" className="px-2 rounded border-2 border-solid border-black form-input mt-1 block w-full focus:text-white focus:bg-black" />
      </label>
        <label className="flex items-center">
        <input
            disabled
            type="file"
            className="h-[40px] block w-20 opacity-0 cursor-pointer absolute"
        />
        <span id="profil-picture" className="text-white rounded cursor-pointer inline-block p-2 mx-auto flex justify-center group opacity-0 duration-500">
            <img
            src="https://cdn-icons-png.flaticon.com/512/4675/4675250.png"
            alt=""
            className="w-28 h-28 mx-auto group-hover:opacity-20"
                        />
            <svg  className="hidden group-hover:block w-8 h-8 absolute mx-auto bottom-[230px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
            </svg>
        </span>
          </label>
      <AlertDialog>
        <AlertDialogTrigger>
        <button 
            id="save"
            style={{  width: '125px', scale: '0.5', border: "3px solid #0f172a"}}
            type="submit"
            value="Sauvegarder"
            className="opacity-0 bg-emerald-400 hover:bg-white text-white -translate-y-24 px-4 py-2 rounded-full  cursor-pointer duration-500 ease-in-out mx-auto mb-4"
                >
            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="##0f172a" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
            </svg>
        </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enregistrées !</AlertDialogTitle>
            <AlertDialogDescription>
             Vos données ont été correctement modififées
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        <button style={{ backgroundColor: '#0f172a', transform: 'translateY(-12rem)'}}
            id="edit"
            type="submit"
            className="opacity-100 text-white px-4 -translate-y-24 py-2 rounded cursor-pointer duration-500 ease-in-out"
          >Modifier mes données</button>

    </form>
    </div>
    );
}