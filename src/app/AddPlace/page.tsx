'use client';
import Header from "../components/header"
import Footer from "../components/footer"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
// Change this line

// To this
import { createInstitution } from '../../store/institutionSlice';
import type { AppDispatch } from '../../store/store';
import Image from 'next/image';
import {
  TextInput,
  Button,
  Container,
  Title,
  Paper,
  Group,
  Textarea,
  Text,
  SimpleGrid,
  rem
} from '@mantine/core';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export default function AddPlace() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
  });
  const [images, setImages] = useState<File[]>([]);

  const handleImageDrop = (files: File[]) => {
    setImages((prevImages) => [...prevImages, ...files]);
    
    // Create preview URLs for the new images
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prevUrls[index]);
      return prevUrls.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('description', formData.description);
      images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      // In handleSubmit, update these lines
      const result = await dispatch(createInstitution(formDataToSend));
      if (createInstitution.fulfilled.match(result)) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
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
            
            <Dropzone
              onDrop={handleImageDrop}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={5 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              mb="xl"
            >
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
              {previewUrls.length > 0 && (
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl" mb="xl">
                {previewUrls.map((url, index) => (
                  <div key={url} style={{ position: 'relative' }}>
                    <Image
                      src={url}
                      alt={`Upload preview ${index + 1}`}
                      width={100}
                      height={100}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <Button
                      size="xs"
                      color="red"
                      style={{
                        position: 'absolute',
                        top: rem(8),
                        right: rem(8),
                      }}
                      onClick={() => removeImage(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </SimpleGrid>
            )}
                <Dropzone.Accept>
                  <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>

           
            
            <Group justify="flex-end">
              <Button 
                type="submit" 
                color="dark" 
                loading={isLoading}
                disabled={images.length === 0}
              >
                {isLoading ? 'Posting...' : 'Post'}
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
      <Footer/>
    </>
  );
}