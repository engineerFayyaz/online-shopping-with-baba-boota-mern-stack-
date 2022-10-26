import dynamic from 'next/dynamic';
import '../styles/easy-responsive-tabs.css';
import '../styles/custom.css';
import '../styles/responsive.css';
import '../styles/globals.css';
// import 'react-responsive-modal/styles.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Appearance from '../components/Appearance';

import { updateCart } from '../redux/cart.slice';
import { wrapper } from '../redux/store';
import { getStorageData } from '../utils/useLocalStorage';
import { ToastContainer } from 'react-toastify';
import Router from 'next/router';
import { SessionProvider, useSession, getSession } from 'next-auth/react';
import Loader from '../components/Loader';
import axios from 'axios';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const cartData = useSelector(state => state.cart);
  useEffect(() => {
    cartApiCall();
  }, [cartData]);
  const cartApiCall = async () => {
    let a = await getSession();
    if (a) {
      if (cartData.items == 0) {
        let { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/cart/deletecart`,
          { user_id: a.user.id }
        );
      } else {
        let { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/cart/createcart`,
          { ...cartData, user_id: a.user.id }
        );
        console.log(data);
      }
    }
  };
  useEffect(() => {
    async function updateStoreData() {
      dispatch(updateCart(await getStorageData('CART')));
    }
    updateStoreData();
    return () => {
      dispatch(updateCart([]));
    };
  }, [dispatch]);

  useEffect(() => {
    Router.events.on('routeChangeStart', url => {
      setLoading(true);
    });

    Router.events.on('routeChangeComplete', url => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <SessionProvider session={pageProps.session}>
        {loading && <Loader />}
        <Appearance />
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />{' '}
      </SessionProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
