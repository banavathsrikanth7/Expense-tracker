/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {

    const [dark,setDark] =
    useState(false);
useEffect(()=>{

const savedTheme=
localStorage.getItem(
"theme"
);

const isDark=
savedTheme==="dark";

document.documentElement
.classList.toggle(
"dark",
isDark
);

setDark(isDark);

},[]);



    function toggleTheme(){

        if(dark){

            document
            .documentElement
            .classList.remove(
                "dark"
            );

            localStorage.setItem(
                "theme",
                "light"
            );

        }

        else{

            document
            .documentElement
            .classList.add(
                "dark"
            );

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

        setDark(!dark);

    }

    return(

<button

onClick={
toggleTheme
}

className="
bg-black
text-white
dark:bg-white
dark:text-black
px-4
py-2
rounded-lg
"

>

{
dark
?

"☀️ Light"

:

"🌙 Dark"

}

</button>

)

}