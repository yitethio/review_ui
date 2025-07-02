'use client';
import Header from "../../components/header"
import Footer from "../../components/footer"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addInstitution } from '../../../store/institutionSlice';
import {
  TextInput,
  Button,
  Container,
  Title,
  Paper,
  Group,
  Textarea,
} from '@mantine/core';
import type { RootState } from '../../../store/store';

export default function AddPlace() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await dispatch(addInstitution(formData) as any);
    if (addInstitution.fulfilled.match(result)) {
      router.push('/');
    }
  };

  return (
   <>
    <Header/>
    <Container size="sm" py="xl">
      <Paper radius="md" p="xl" withBorder>
        <Title order={2} mb="md">Add a place</Title>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="The Name Of The Place"
            placeholder="Enter place name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            mb="md"
          />
          
          <TextInput
            label="The Location Link"
            placeholder="Enter location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            mb="md"
          />
          
          <Textarea
            label="Description"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            mb="xl"
            minRows={4}
          />
          
          <Group justify="flex-end">
            <Button type="submit" color="dark">Post</Button>
          </Group>
        </form>
      </Paper>
    </Container>
    <Footer/>
   </>
  );
}