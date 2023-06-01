import { component$ } from '@builder.io/qwik';
import { QwikLogo } from '../../icons/qwik';
import { Link } from '@builder.io/qwik-city';

import styles from './navbar.module.css';

export default component$(() => {
  return (
    <header class={ styles.header }>
      <div class={ ['container', styles.wrapper] }>
        <div class={ styles.logo }>
          <Link href="/" title="qwik">
            <QwikLogo height={ 50 } width={ 143 } />
          </Link>
        </div>
        <ul>
          <li>
            <Link href="/dashboard/">Admin Dashboard</Link>
          </li>
          <li>
            <Link href="/login/">Login</Link>
          </li>
          <li>
            <Link href="/pokemons/list-ssr/">SSR list server</Link>
          </li>
          <li>
            <Link href="/pokemons/list-client/">CSR list client</Link>
          </li>
          <li>
            <Link href="/counter/">CounterHook</Link>
          </li>
        </ul>
      </div>
    </header>
  );
});
