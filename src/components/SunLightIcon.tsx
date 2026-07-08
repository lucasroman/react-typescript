import { useEffect, useState } from 'react';

function SunLightIcon() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  return (
    <div>
      <button className="button-theme" onClick={() => setIsDark(!isDark)}>
        {/* Shows sun or moon icon */}
        {isDark ?
          <i className="em em-sunny" aria-role="presentation"
            aria-label="BLACK SUN WITH RAYS"></i> :
          <i className="em em-crescent_moon" aria-role="presentation"
            aria-label="CRESCENT MOON"></i>
        }
      </button>
    </div>
  );
}

export default SunLightIcon;