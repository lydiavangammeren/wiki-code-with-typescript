"use client"
import Link from 'next/link'
import styles from './SignUp.module.css'
import { useRouter } from 'next/navigation';

export default function SignUp() {
    const router = useRouter();
    async function submitData(event: React.SyntheticEvent<HTMLFormElement>) {
     event.preventDefault();   
     const formData = new FormData(event.currentTarget);
     const name = String(formData.get('name'));
     const email = String(formData.get('email'));
     const data = {name, email}
     if (name && email) {
        await fetch('http://localhost:3000/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(data)})
        router.push('/');
    }
    }
    return (
        <div className={styles.page}>
            <form onSubmit={submitData}>
                <h1>Sign Up</h1>
                <input name='name' placeholder='Name' type='text' required/>
                <input name='email' placeholder='Email address' type='email' required/>
                <button type='submit'>Sign Up</button>
                <Link href='/' className={styles.back}>or Cancel</Link>
            </form>
        </div>
    )
}