import Link from "next/link";
import styles from "./SignUp.module.css";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default function SignUp() {
  
  async function submitAction(formData: FormData) {
    "use server";
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const data = {name, email}
    if (name && email) {
        await prisma.user.create({ data });
        redirect('/create')
    }

  }
  return (
    <div className={styles.page}>
      <form action={submitAction}>
        <h1>Sign Up</h1>
        <input name="name" placeholder="Name" type="text" required />
        <input name="email" placeholder="Email address" type="email" required />
        <button type="submit">Sign Up</button>
        <Link href="/" className={styles.back}>
          or Cancel
        </Link>
      </form>
    </div>
  );
}
