import styles from './styles.module.scss';

interface SubscribeButonProps {
  priceId: string
}

export function SubscribeButton ({priceId}: SubscribeButonProps) {
  return (
    <button 
      className={styles.subscribeButton}
      type="button">
      Subscribe now
    </button>
  )
}