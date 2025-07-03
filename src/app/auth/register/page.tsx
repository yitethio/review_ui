'use client';
import {
  TextInput,
  PasswordInput,
  Button,
  
  Title,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { registerUser } from '../../../store/authSlice';
import { AppDispatch } from '../../../store/store';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      router.push('/auth/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Left Form Section */}
        <div className="p-10">
          <Title order={2} className="mb-1 font-black text-3xl text-gray-900 pb-3">
            Get Started<br />Create an Account
          </Title>                            
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextInput
              placeholder="you@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <PasswordInput
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Button fullWidth color="violet" type="submit" radius="md">
              Sign Up
            </Button>
          </form>

          <Text size="sm" ta="center" className="pt-10">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-violet-600 font-medium hover:underline">
              Login
            </Link>
          </Text>
        </div>

        {/* Right Illustration Section */}
        <div className="relative hidden md:block bg-gradient-to-tr from-[#836FFF] to-[#C488FF]">
          <Image
            src="/images/image.png"
            alt="Register Illustration"
            width={600}
            height={600}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
