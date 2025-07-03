'use client';
import Header from "../../components/header"
import Footer from "../../components/footer"

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Select, Group, Rating, Text, SimpleGrid, Button, rem, Image } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { createReview, selectLoading, selectError } from '@/store/reviewSlice';
import { AppDispatch } from '@/store/store';
import { fetchInstitutions, selectInstitutions, setSelectedInstitution, selectSelectedInstitution } from '@/store/institutionSlice';

export default function WriteReview() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [place, setPlace] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number>(1.5);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageDrop = (files: File[]) => {
    setImages((prevImages) => [...prevImages, ...files]);
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!place || !comment || !rating || images.length === 0) return;

    const formData = new FormData();
    formData.append('rating', rating.toString());
    formData.append('comment', comment);
    formData.append('institution', place); // This should be the institution ID from search
    images.forEach((image) => {
      formData.append('images', image);
    });

    await dispatch(createReview(formData));
  };

  const institutions = useSelector(selectInstitutions);
  const selectedInstitution = useSelector(selectSelectedInstitution);

  useEffect(() => {
    dispatch(fetchInstitutions());
  }, [dispatch]);

  const handleInstitutionSelect = (value: string | null) => {
    const selected = institutions.find(inst => inst._id === value);
    dispatch(setSelectedInstitution(selected || null));
    setPlace(selected?._id || '');
  };
 
  

  return (
    <>
      <Header/>
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">How was your experience?</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Select
              label="Search for a place"
              placeholder="Select an institution"
              data={institutions.map(inst => ({
                value: inst._id || '',
                label: inst.name
              }))}
              value={selectedInstitution?._id}
              onChange={handleInstitutionSelect}
              searchable
              maxDropdownHeight={200}
  
            />
          </div>
         
        </div>

        <div>
          <textarea
            placeholder="Comment Here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-100 min-h-[150px]"
          />
        </div>

        <Group>
          
          <Rating
            fractions={2}
            value={rating}
            onChange={setRating}
          />
        </Group>

        <div>
          <h2 className="text-xl font-semibold mb-2">Add a photo</h2>
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
                        width={80}
                        height={80}
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
        </div>

        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading || !place || !comment || !rating || images.length === 0}
          className="w-full bg-black text-white py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
}