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
      <div style={{ position: "absolute", top: "30px", left: "20px" }}>
          <img src="/logo.png" alt="IIT Ropar" className="w-35 h-32" />
        </div>
        <div style={{position:  "absolute", top: "30px", right: "20px"}}>
          <img src="./darkbg.png" alt="Softcom" className="w-24 h-auto" />
        </div>
        <h1 className="text-5xl font-bold my-4">IIT Ropar Entry Management System</h1>
        <h2 className="text-xl font-thin my-2">Seamless Entry Management for Students of IIT Ropar</h2>
        <div className="w-full h-full flex">
          <div className="flex-1 flex justify-center items-center">
            <button className="bg-green-500 m-10 text-3xl rounded-xl hover:bg-green-800 hover:translate-y-3 p-16" style={{width:"400px", height:"270px"}} onClick={()=>{router.push("/student_entry_home")}}>Record Home Entry<span className="font-thin"><br/>(ID Card Required)</span></button>
            <button className="bg-green-500 m-10 text-3xl rounded-xl hover:bg-green-800 hover:translate-y-3 p-14" style={{width:"400px", height:"270px"}} onClick={()=>{router.push("/student_entry_regular")}}> Record Regular Entry  <span className="font-thin"><br/>(ID Card Required)</span></button>
          {/* </div>
          <div className="flex-1 flex justify-center items-center"> */}
          <button className="bg-green-500 m-10 text-3xl rounded-xl hover:bg-green-800 hover:translate-y-3 p-16" style={{width:"400px", height:"270px"}} onClick={()=>{router.push("/guest_entry")}}>Guest Entry</button>
          </div>
          </div>
      </header>
    </main>
  )
}
