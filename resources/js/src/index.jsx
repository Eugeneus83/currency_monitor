import ReactDOM from 'react-dom/client';
import App from './App';

if (document.getElementById('app')) {

    const app = ReactDOM.createRoot(document.getElementById('app'));
    app.render(<App />);
}
