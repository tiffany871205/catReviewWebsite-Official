import { useEffect } from "react";
import { Popover } from "bootstrap";

export default function useBootstrapPopovers(
  selector = '[data-bs-toggle="popover"]'
) {
  useEffect(() => {
    const triggers = document.querySelectorAll(selector);
    const instances = Array.from(triggers).map(
      (el) => new Popover(el, { html: true, trigger: "focus" })
    );
    return () => instances.forEach((p) => p.dispose());
  }, [selector]);
}
