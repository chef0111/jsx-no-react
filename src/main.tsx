/* @jsx createElement */
import { mount, createElement } from '@/jsx-runtime';
import App from '@/App';

const root = document.getElementById('app');

if (root) {
  try {
    mount(<App />, root);
  } catch (error) {
    console.error('❌ Error mounting app:', error);
    console.error('Error stack:', (error as Error).stack);
  }
} else {
  console.error('❌ Root element not found!');
}
