import { useSession, signIn } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripejs';
import styles from './styles.module.scss';

interface SubscribeButonProps {
  priceId: string
}

export function SubscribeButton ({priceId}: SubscribeButonProps) {
  const [session] = useSession()

  async function handleSubscribe () {
    if(!session) {
      signIn('github')
      return;
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
