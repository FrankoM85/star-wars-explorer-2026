import { useEffect, useRef, useState } from "react";
import { Icon } from "semantic-ui-react";
import { formatValue } from "./categoryFormatting.js";

function MobileCategoryList({ name, items, nameField, onOpen }) {
  const listRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  function updateScroll() {
    const list = listRef.current;
    if (!list) return;
    setShowBackToTop(list.scrollHeight > list.clientHeight && list.scrollTop > 0);
  }

  useEffect(() => {
    const observer = new ResizeObserver(updateScroll);
    observer.observe(listRef.current);
    observer.observe(listRef.current.querySelector("ul"));
    return () => observer.disconnect();
  }, []);

  function backToTop() {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    listRef.current.scrollTo({ top: 0, behavior });
    window.scrollTo({ top: 0, behavior });
    listRef.current.querySelector("button")?.focus({ preventScroll: true });
  }

  return (
    <div ref={listRef} className="mobile-category-list" role="region" aria-label={`${name} list`} onScroll={updateScroll}>
      <ul className="mobile-category-cards">
        {items.map((item, index) => (
          <li key={item.url ?? index}>
            <button
              type="button"
              className="mobile-category-card"
              aria-label={`View details for ${formatValue(item[nameField])}`}
              aria-haspopup="dialog"
              onClick={(event) => onOpen(item, event)}
            >
              <span>{formatValue(item[nameField])}</span>
              <Icon name="chevron right" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      <span className="mobile-list-status" role="status">
        {items.length} találat
      </span>
      {showBackToTop && (
        <button type="button" className="mobile-list-action mobile-back-to-top" aria-label="Ugrás a tetejére" onClick={backToTop}>
          <Icon name="arrow up" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default MobileCategoryList;
