import "../styles/globals.css"
//Estilo global só pode ser importado no _app
export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
  }