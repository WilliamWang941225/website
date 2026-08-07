import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type BackHomeButtonProps = {
  to?: string;
  label?: string;
};

export default function BackHomeButton({
  to = "/",
  label = "Home",
}: BackHomeButtonProps) {
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const updateFloatingState = () => {
      setIsFloating(window.scrollY > 120);
    };

    updateFloatingState();
    window.addEventListener("scroll", updateFloatingState, { passive: true });

    return () => window.removeEventListener("scroll", updateFloatingState);
  }, []);

  return (
    <div className="back-home-slot">
      <nav
        className={`back-home-wrapper${isFloating ? " is-floating" : ""}`}
        aria-label="Breadcrumb"
      >
        <Link
          to={to}
          state={to === "/" ? { scrollToHomePosition: true } : undefined}
          className="back-home-link"
        >
          <span aria-hidden="true">←</span>
          <span>{label}</span>
        </Link>
      </nav>
    </div>
  );
}
