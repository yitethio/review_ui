'use client';
import React from 'react';
import {
  AppShell,
  Group,
  TextInput,
  Button,
  Title,
  Flex,
  Container,
  Image,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';



export default function Header() {
  const router = useRouter();
  return (
    <Container fluid className="border-b border-gray-200 bg-white">
      <Flex justify="space-between" align="center" h={60} px="md">
        
        {/* Left section with logo and horizontal title */}
        <Flex align="center" className="gap-2">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={12}
            height={12}
            fit="contain"
          />
          <Title order={3} className="font-bold text-base">
            Local&nbsp;Lens
          </Title>
        </Flex>

        {/* Center navigation */}
        <Group>
          <Button variant="subtle" color="gray">Explore</Button>
          <Button variant="subtle" color="gray">Write a Review</Button>
          <Button variant="subtle" color="gray">List a Business</Button>
        </Group>

        {/* Right search & auth */}
        <Group>
          <TextInput
            placeholder="Search"
            leftSection={<IconSearch size={16} />}
            className="w-64"
          />
          <Button variant="subtle" color="dark" onClick={() => router.push('/auth/register')}>Sign up</Button>
          <Button 
            variant="filled" 
            color="dark" 
            onClick={() => router.push('/auth/login')}
          >
            Log in
          </Button>
        </Group>
      </Flex>
    </Container>
  );
}
