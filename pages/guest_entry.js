import Head from "next/head";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function GuestEntry(){
  const router = useRouter();

  function handleForm(e){
    e.preventDefault();
    let form = document.getElementById("form");
    let formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    axios.post("http://localhost:5000/guest_entry", data).then(res=>{
        toast.success("Guest entry successful", {theme:"dark"});
        setTimeout(()=>router.push("/"), 2000);
    }
    ).catch(err=>toast.error("Guest entry failed", {theme:"dark"}));
  }
  return (
    <main>
      <Head>
        <title>Guest Entry | EZFlow</title>
      </Head>
      <header className="w-full p-4 h-full" style={{minHeight:"100vh"}}>
        <h2 className="font-fine text-xl mt-10"><span className="hover:underline cursor-pointer" onClick={()=>{router.push("/")}}>&lt; Go Back</span></h2>
        <h1 className="text-5xl font-bold my-4">Guest Entry</h1>
        <form id="form">
          <input type="text" name="name" placeholder="Name" className="py-2 px-4 rounded-md border w-full text-left capitalize bg-transparent my-2"/>
          <input type="text" name="phone" placeholder="Phone" className="py-2 px-4 rounded-md border w-full text-left capitalize bg-transparent my-2"/>
          <input type="text" name="address" placeholder="Address" className="py-2 px-4 rounded-md border w-full text-left capitalize bg-transparent my-2"/>
          <input type="text" name="purpose" placeholder="Purpose of visit" className="py-2 px-4 rounded-md border w-full text-left capitalize bg-transparent my-2"/>
          <input type="submit" onClick={handleForm} className="py-2 px-4 rounded-md border text-center capitalize bg-green-500 border-green-500 hover:bg-green-700 hover:border-green-700 cursor-pointer my-2"/>
        </form>
        
      </header>
    </main>
  )
}