import Header from "./components/header"
import Footer from "./components/footer"
import {
  Container,
  Title,
  Button,
  Group,
  Image,
  Text,
  Tabs,
  Avatar,
  Flex,
  Divider,
  ScrollArea,
  TabsList,
  TabsTab,
  TabsPanel,
  Rating,
} from '@mantine/core';


export default function Home() {
  const filters = ['Restaurants', 'Coffee Shops', 'Parks', 'Museums'];

  const cards = [
    { title: 'The Cozy Corner Cafe', rating: 4.6, reviews: 21, image: '/images/p1.svg' },
    { title: 'The GreenLeaf Park', rating: 4.8, reviews: 11, image: '/images/p2.svg' },
    { title: 'The ArtHouse Gallery', rating: 4.2, reviews: 9, image: '/images/p3.svg' },
    { title: 'The Night Owl Lounge', rating: 4.5, reviews: 13, image: '/images/p4.svg' },
    { title: 'The Book Nook', rating: 4.3, reviews: 15, image: '/images/p5.svg' },
    { title: 'The City View Terrace', rating: 4.6, reviews: 8, image: '/images/p6.svg' },
    { title: 'The Night Owl Lounge', rating: 4.5, reviews: 13, image: '/images/p4.svg' },
    { title: 'The Book Nook', rating: 4.3, reviews: 15, image: '/images/p5.svg' },
    { title: 'The City View Terrace', rating: 4.6, reviews: 8, image: '/images/p6.svg' },
  ];

  const reviews = [
    {
      name: 'Sophia Bennett',
      avatar: '/images/av1.svg',
      review:
        'The ambiance at The Cozy Corner Cafe is delightful, with soft lighting and comfortable seating. The signature dish, the Sunrise Breakfast, is a must-try...',
    },
    {
      name: 'Ethan Carter',
      avatar: '/images/p1.svg',
      review:
        'The Modern Art Gallery is a great place to spend an afternoon. The exhibits are well-curated, and the space is open and inviting...',
    },
    {
      name: 'Olivia Davis',
      avatar: '/images/av1.svg',
      review:
        'The lakeside retreat offers a serene escape from the city. The cabins are well-maintained, and the views are breathtaking...',
    },
  ];
  return (
    <>
    <Header/>
    <Container size="lg" className="mt-4 space-y-10">
      {/* Filter Bar */}
      <Group >
        {filters.map((filter) => (
          <Button key={filter} variant="light" radius="xl" color="gray">
            {filter}
          </Button>
        ))}
      </Group>

      {/* Popular Section */}
      <section>
        <Title order={3} className="mb-3 font-semibold py-6">
          Popular in your area
        </Title>
        <ScrollArea  type="always">
          <Group className="min-w-fit">
            {cards.slice(0, 7).map((card) => (
              <div key={card.title} className="w-48 shrink-0">
                <Image
                  src={card.image}
                  radius="md"
                  height={120}
                  className="mb-2"
                  alt='Card Image'
                />
                <Text className="font-medium text-sm">{card.title}</Text>
                <Text size="xs" color="gray">
                  {card.rating} ★ · {card.reviews} reviews
                </Text>
              </div>
            ))}
          </Group>
        </ScrollArea>
      </section>

      {/* Recently Reviewed */}
      <section>
        <Title order={3} className="mb-3 font-semibold py-6">
          Recently Reviewed
        </Title>
        <ScrollArea  type="always">
          <Group className="min-w-fit">
            {cards.slice(1, 7).map((card) => (
              <div key={card.title} className="w-48 shrink-0">
                <Image
                  src={card.image}
                  radius="md"
                  height={120}
                  className="mb-2"
                  alt="Card Image"
                  // Add alt props to Image eleme
                  />
                  <Text className="font-medium text-sm">{card.title}</Text>
                  <Text size="xs" color="gray">
                    {card.rating} ★ · {card.reviews} reviews
                  </Text>
                </div>
              ))}
            </Group>
          </ScrollArea>
        </section>

      {/* Top & Latest Reviews */}
      <section>
        <Title order={3} className="mb-4 font-semibold">
          Top & Latest Reviews
        </Title>
        <Tabs defaultValue="top">
        <TabsList>
    <TabsTab value="all">All</TabsTab>
    <TabsTab value="top">Top</TabsTab>
    <TabsTab value="latest">Latest</TabsTab>
  </TabsList>
          <TabsPanel value="top" pt="sm">
            <div className="space-y-6 mt-4">
              {reviews.map((user, idx) => (
                <div key={idx} className="space-y-2">
                  <Flex align="center" gap="sm">
                    <Avatar src={user.avatar} radius="xl" />
                    <Text className="font-medium">{user.name}</Text>
                  </Flex>
                  <Rating value={3.5} fractions={2} readOnly/>
                  <Text className="text-sm text-gray-700 leading-relaxed">
                    {user.review}
                  </Text>
                  <Divider />
                </div>
              ))}
            </div>
          </TabsPanel>

          {/* Repeat for "All" and "Latest" if needed */}
          <TabsPanel value="all" pt="sm">Coming soon...</TabsPanel>
          <TabsPanel value="latest" pt="sm">Coming soon...</TabsPanel>
        </Tabs>
      </section>
    </Container>

    <Footer/>
    
    </>
  );
}
