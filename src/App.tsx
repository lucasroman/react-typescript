import { useState, useEffect } from 'react';
import { FetchResult } from './components/Fetch';
import './styles/Fetch.css';

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  return (
    <div>
      <button className="button-theme" onClick={() => setIsDark(!isDark)}>
        {/* Shows sun or moon icon */}
        {isDark ?
          <i className="em em-crescent_moon" aria-role="presentation"
            aria-label="CRESCENT MOON"></i> :
          <i className="em em-sunny" aria-role="presentation"
            aria-label="BLACK SUN WITH RAYS"></i>
        }
      </button>
      <FetchResult />
    </div>
  );
}

export default App;
