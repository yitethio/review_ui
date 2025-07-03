'use client';
import Header from "../components/header"
import Footer from "../components/footer"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Container, Title, Text, Paper, Group, Button, SimpleGrid, Rating, Image, Loader, Card, Badge, Avatar } from '@mantine/core';
import { logout } from '@/store/authSlice';
import { AppDispatch } from '@/store/store';
import { getUserReviews, selectUserReviews, selectLoading } from '@/store/reviewSlice';
import Cookies from 'js-cookie';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';


export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const userReviews = useSelector(selectUserReviews);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    const userId = Cookies.get('userId');
    console.log('UserId from cookies:', userId); // Debug log
    if (userId) {
      console.log('Dispatching getUserReviews'); // Debug log
      dispatch(getUserReviews());
    } else {
      console.log('No userId found in cookies'); // Debug log
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const theme = useMantineTheme();
  const isXs = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const isSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const isLg = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

  const getCols = () => {
    if (isXs) return 1;
    if (isSm) return 1;
    if (isMd) return 2;
    if (isLg) return 3;
    return 3;
  };

  return (
    <>
      <Header />
      <Container size="lg" py="xl">
        <Card shadow="sm" p="xl" radius="md" withBorder mb="xl">
          <Group  align="flex-start">
            <Group>
              <Avatar
                size="xl"
                radius="xl"
                src={null}
                color="blue"
              >{(Cookies.get('userName') || '?')[0].toUpperCase()}</Avatar>
              <div>
                <Title order={2} mb="xs">{Cookies.get('userName')}</Title>
                <Text size="sm" color="dimmed" mb="xs">{Cookies.get('userEmail')}</Text>
                <Badge
                  variant="gradient"
                  gradient={{ from: Cookies.get('userVerified') === 'true' ? 'teal' : 'orange', to: Cookies.get('userVerified') === 'true' ? 'lime' : 'red' }}
                >
                  {Cookies.get('userVerified') === 'true' ? 'Verified' : 'Unverified'}
                </Badge>
              </div>
            </Group>
            <Button color="red" variant="light" onClick={handleLogout}>Logout</Button>
          </Group>
        </Card>

        <Title order={3} mb="lg">Your Reviews</Title>
        {loading ? (
          <Group justify="center" py="xl">
            <Loader size="lg" variant="dots" />
          </Group>
        ) : userReviews?.length ? (
          <SimpleGrid
            w="100%"
            cols={getCols()}
            spacing="lg"
          >
            {userReviews.map((review) => (
              <Card key={review._id} shadow="sm" p="xl" radius="md"  style={{ minHeight: 300 }} withBorder>
                <Group justify="space-between" mb="md">
                  <div>
                    <Text fw={500} size="lg" mb="xs">{review.institution?.name || 'Unknown Institution'}</Text>
                    <Text size="sm" color="dimmed">{formatDate(review.createdAt)}</Text>
                  </div>
                  <Rating value={review.rating} readOnly fractions={2} size="lg" />
                </Group>
                <Text mb="lg" lineClamp={3}>{review.comment}</Text>
                {review.images && review.images.length > 0 && (
                  <Card.Section p="sm">
                    <SimpleGrid cols={2} spacing="xs">
                      {review.images.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          radius="md"
                          height={160}
                          fit="cover"
                        />
                      ))}
                    </SimpleGrid>
                  </Card.Section>
                )}
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Paper p="xl" withBorder radius="md" style={{ textAlign: 'center' }}>
            <Text size="lg" color="dimmed">No reviews yet</Text>
            <Button
              variant="light"
              color="blue"
              mt="md"
              onClick={() => router.push('/write-review')}
            >
              Write Your First Review
            </Button>
          </Paper>
        )}
      </Container>
      <Footer />
    </>
  );
}