'use client'

import UpdateButton from "@/components/UpdateButton";
import ReduxProvider from "@/store/reduxProvider";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <ReduxProvider>
      <main>
        <h2>WOW</h2>
        <Button>WOWWW</Button>
        <UpdateButton />
      </main>
    </ReduxProvider>
  );
}
