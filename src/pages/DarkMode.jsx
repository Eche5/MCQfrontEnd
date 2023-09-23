import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function DarkMode() {
  const [isFakeDark, setIsFakeDark] = useState(false);
  useEffect(
    function() {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <div>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>
      <Outlet />
    </div>
  );
}

export default DarkMode;
