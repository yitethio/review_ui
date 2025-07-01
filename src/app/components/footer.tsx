import { Container, Group, Text, Divider, Image, Flex } from '@mantine/core';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-23">
      <Container size="lg" className="py-8">
        <Flex justify="space-between" align="start" wrap="wrap" gap="md">
          {/* Logo & description */}
          <Flex align="center" gap="sm">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={12}
            height={12}
            fit="contain"
          />
            <Text  className="font-bold text-base">Local Lens</Text>
          </Flex>

          {/* Navigation Links */}
          <Group >
            <Link href="#" className="text-sm text-gray-600 hover:text-black">Explore</Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-black">Write a Review</Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-black">List a Business</Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-black">Privacy</Link>
          </Group>
        </Flex>

        <Divider my="md" />

        <Flex justify="space-between" align="center" wrap="wrap">
          <Text size="sm" color="dimmed">
            © {new Date().getFullYear()} Local Lens. All rights reserved.
          </Text>
          {/* Optional Social Icons */}
          <Group >
            {/* Replace with real icons/links later */}
            <Text className="text-sm text-gray-600">🌐</Text>
            <Text className="text-sm text-gray-600">📘</Text>
            <Text className="text-sm text-gray-600">🐦</Text>
          </Group>
        </Flex>
      </Container>
    </footer>
  );
}
