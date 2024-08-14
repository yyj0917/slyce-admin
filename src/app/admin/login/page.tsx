// app/login/page.tsx
"use client";

import { useState } from 'react';
import { supabase } from '@/libs/supabase/client';
import { useRouter } from 'next/navigation';
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // 아이콘 추가


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { email, password } = values;
            const { error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
      
            if (error) {
                console.error('Error signing in:', error.message);
                // 여기에서 에러 메시지를 사용자에게 표시할 수 있습니다.
                alert('로그인 실패');
                return;
            }
            alert('로그인 성공');
      
            // 로그인 성공 시 대시보드로 이동
            window.location.href = '/admin';
          } catch (error) {
            console.error('Unexpected error:', error);
          }
        };
    return (
        <div className='w-full h-[80vh] flex justify-center items-center'>

            <div className='border-2 rounded-lg w-[400px] h-[400px] p-10 flex flex-col justify-around'>
                <h1 className='text-center text-2xl'>Login</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />

                                </FormControl>
                            {/* <FormMessage /> */}
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <div className='relative'>
                                    <FormControl>
                                        <Input 
                                            placeholder="password" 
                                            type={showPassword ? 'text' : 'password'} // 비밀번호 숨김/표시
                                            {...field}
                                        />

                                    </FormControl>
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-xl"
                                    >
                                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    </button>
                                </div>
                                {/* <FormMessage /> */}
                            </FormItem>
                        )}
                        />
                        <Button variant={'primary'} type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
  }

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();

//     const handleLogin = async () => {
//         try {
//             // 로그인 시도
//             const { error } = await supabase.auth.signInWithPassword({
//                 email,
//                 password,
//             });
//             if (error) throw error;
            
//             // 로그인 성공 시 대시보드로 이동
//             router.push('/admin');
//         } catch (error) {
//             setError('Invalid email or password');
//         }
//     };

//     return (
//         // <div>
//         //     <h1>Login</h1>
//         //     <input
//         //         type="email"
//         //         placeholder="Enter your email"
//         //         value={email}
//         //         onChange={(e) => setEmail(e.target.value)}
//         //     />
//         //     <input
//         //         type="password"
//         //         placeholder="Enter your password"
//         //         value={password}
//         //         onChange={(e) => setPassword(e.target.value)}
//         //     />
//         //     <button onClick={handleLogin}>Login</button>
//         //     {error && <p>{error}</p>}
//         // </div>
        
//     );
// }
