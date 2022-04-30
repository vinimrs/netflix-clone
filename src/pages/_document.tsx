import React from 'react';
import Document, {
    DocumentContext,
    Html,
    Main,
    NextScript,
    Head,
    DocumentProps,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document<DocumentProps> {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />),
                });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render(): JSX.Element {
        return (
            <Html lang="pt-BR">
                <Head>
                    <meta charSet="UTF-8" />
                    <link rel="icon" href="./netflix-logo-1.svg" />

                    <meta name="theme-color" content="#000000" />
                    <meta name="description" content="Netflix page clone" />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="apple-touch-icon" href="./netflix-logo-1.svg" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
