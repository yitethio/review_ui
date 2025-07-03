
import "./globals.css";
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { Providers } from './components/Providers';
import '@mantine/dropzone/styles.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MantineProvider theme={theme}>
            {children}
          </MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
