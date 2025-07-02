'use client';
import {
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  
  Title,
  Text,
  
  Group,

} from '@mantine/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { loginUser } from '../../../store/authSlice';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData) as any);
    if (loginUser.fulfilled.match(result)) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Left Form Section */}
        <div className="p-10">
          <Title  order={2} className="mb-1 font-black text-3xl text-gray-900 pb-4">Holla,<br />Welcome Back</Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              placeholder="stanley@gmail.com"
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
            
            <Group justify="space-between" mt="xs">
              <Checkbox label="Remember me" color="violet" />
              <Link href="#" className="text-sm text-gray-600 hover:text-violet-600">
                Forgot Password?
              </Link>
            </Group>

            <Button fullWidth color="violet" type="submit" radius="md">
              Sign In
            </Button>
          </form>

          <Text size="sm" ta="center" className="mt-6">
            Don’t have an account?{' '}
            <Link href="/auth/register" className="text-violet-600 font-medium hover:underline">
              Sign Up
            </Link>
          </Text>
        </div>

        {/* Right Illustration Section */}
        <div className="relative hidden md:block bg-gradient-to-tr from-[#836FFF] to-[#C488FF]">
          <Image
            src="/images/image.png"
            alt="Login Illustration"
            width={600}
            height={600}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
