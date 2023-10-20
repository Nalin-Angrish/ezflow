import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <Head>
        <title>EZFlow</title>
      </Head>
      <header className="w-full text-center p-4 h-full flex justify-center items-center flex-col" style={{height:"100vh"}}>
        <h1 className="text-5xl font-bold my-4">EZFlow</h1>
        <h2 className="text-xl font-thin my-2">Seamless Entry Management for Students of IIT Ropar</h2>
        <div className="w-full h-full flex">
          <button className="flex-1 bg-green-500 m-10 text-2xl rounded-xl hover:bg-green-800 hover:translate-y-3" onClick={()=>{router.push("/student_entry")}}>Student Entry <span className="font-thin"><br/>(ID Card Required)</span></button>
          <button className="flex-1 bg-green-500 m-10 text-2xl rounded-xl hover:bg-green-800 hover:translate-y-3" onClick={()=>{router.push("/guest_entry")}}>Guest Entry</button>
        </div>
      </header>
    </main>
  )
}
