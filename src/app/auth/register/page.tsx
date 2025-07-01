'use client';
import { TextInput, PasswordInput, Button, Container, Title, Paper } from '@mantine/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '../../../store/authSlice';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData) as any);
    
    if (registerUser.fulfilled.match(result)) {
      router.push('/');
    }
  };

  return (
    <Container size="xs" className="mt-20">
      <Paper shadow="md" p="xl" radius="md">
        <Title order={2} className="text-center mb-6">Create an Account</Title>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            required
            label="Name"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button
            type="submit"
            fullWidth
          >
            Register
          </Button>
          <div className="text-center mt-4">
            <Link href="/auth/login" className="text-blue-500 hover:text-blue-700">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </Paper>
    </Container>
  );
}