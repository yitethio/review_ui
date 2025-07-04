'use client';
import React, { useEffect, useState } from 'react';
import {
  Group,
  TextInput,
  Button,
  Title,
  Flex,
  Container,
  Image,
  Avatar,
  Stack,
  Burger,
  Drawer,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [opened, { toggle, close }] = useDisclosure(false);
  const [isMobile, setIsMobile] = useState(false);

  const getInitials = (name: string | null) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Container fluid className="border-b border-gray-200 bg-white">
        <Flex justify="space-between" align="center" h={60} px="md">
          {/* Left: Logo */}
          <Flex align="center" className="gap-2">
            <Image src="/images/logo.svg" alt="Logo" width={20} height={20} fit="contain" />
            <Title order={3} className="font-bold text-base">
              Local&nbsp;Lens
            </Title>
          </Flex>

          {/* Desktop nav content (only if not mobile) */}
          {!isMobile && (
            <Group gap="sm">
              <TextInput
                placeholder="Search"
                leftSection={<IconSearch size={16} />}
                className="w-64"
              />
              <Button variant="subtle" color="gray" onClick={() => router.push('/')}>
                Explore
              </Button>
              <Button variant="subtle" color="gray" onClick={() => router.push('/WriteRreview')}>
                Write a Review
              </Button>
              <Button variant="subtle" color="gray" onClick={() => router.push('/AddPlace')}>
                List a Business
              </Button>
              {isAuthenticated ? (
                <Avatar
                  onClick={() => router.push('/profile')}
                  color="blue"
                  radius="xl"
                  size="md"
                >
                  {getInitials(user.name)}
                </Avatar>
              ) : (
                <>
                  <Button variant="subtle" color="dark" onClick={() => router.push('/auth/register')}>
                    Sign up
                  </Button>
                  <Button variant="filled" color="dark" onClick={() => router.push('/auth/login')}>
                    Log in
                  </Button>
                </>
              )}
            </Group>
          )}

          {/* Mobile: Burger icon */}
          {isMobile && (
            <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
          )}
        </Flex>
      </Container>

      {/* Drawer for mobile */}
      <Drawer
        opened={opened}
        onClose={close}
        size="75%"
        padding="md"
        title="Menu"
        position="right"
        withCloseButton={false}
      >
        <Flex direction="column" justify="space-between" style={{ height: '100%' }}>
          <Stack gap="md">
            <TextInput placeholder="Search" leftSection={<IconSearch size={16} />} />

            <Button variant="subtle" onClick={() => { router.push('/'); close(); }}>
              Explore
            </Button>
            <Button variant="subtle" onClick={() => { router.push('/WriteRreview'); close(); }}>
              Write a Review
            </Button>
            <Button variant="subtle" onClick={() => { router.push('/AddPlace'); close(); }}>
              List a Business
            </Button>
          </Stack>

          <Box>
            {isAuthenticated ? (
              <Avatar
                onClick={() => { router.push('/profile'); close(); }}
                color="blue"
                radius="xl"
                size="md"
              >
                {getInitials(user.name)}
              </Avatar>
            ) : (
              <Group grow mt="md">
                <Button variant="outline" onClick={() => { router.push('/auth/register'); close(); }}>
                  Sign up
                </Button>
                <Button variant="filled" onClick={() => { router.push('/auth/login'); close(); }}>
                  Log in
                </Button>
              </Group>
            )}
          </Box>
        </Flex>
      </Drawer>
    </>
  );
}
