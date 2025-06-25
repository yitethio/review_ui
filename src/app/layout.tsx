
import "./globals.css";
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <MantineProvider theme={theme}>
       <body>
        {children}
      </body>
       </MantineProvider>
    
    </html>
  );
}
