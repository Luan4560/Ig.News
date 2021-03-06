import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripejs';
import styles from './styles.module.scss';

export function SubscribeButton () {
  const [session] = useSession()
  const router = useRouter()

  async function handleSubscribe () {
    if(!session) {
      signIn('github')
      return;
    }

    if(session.activeSubscription) {
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/subscribe')

      const {sessionId} = response.data;

      const stripe = await getStripeJs();

      stripe.redirectToCheckout({sessionId})

    }catch(err) {
      alert(err.message)
    }
  }

  return (
    <button
      className={styles.subscribeButton}
      type="button"
      onClick={handleSubscribe}
      >
      Subscribe now
    </button>
  )
}
