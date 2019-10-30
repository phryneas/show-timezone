import { pages } from "../lib/pages";
import { api } from "../lib/api";

(function iife() {
  const HAS_RUN = Symbol.for("extension-show-timezone-has-run");
  if ((window as any)[HAS_RUN]) {
    return;
  }
  (window as any)[HAS_RUN] = true;

  console.log("content script loaded");

  let observer = new MutationObserver(onMutation);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  let currentPages = pages.filter(page =>
    page.matchUrl.test(window.location.hostname + window.location.pathname)
  );

  const allMatchingElements = new Set(
    currentPages
      .flatMap(page => Array.from(document.querySelectorAll(page.cssSelector)))
      .filter(isHTMLElement)
  );
  allMatchingElements.forEach(handleNewElementWithFirstMatchingPage);

  function onMutation(mutations: MutationRecord[]) {
    for (const mutation of mutations) {
      Array.from(mutation.addedNodes)
        .filter(isHTMLElement)
        .forEach(handleNewElementWithFirstMatchingPage);
    }
  }

  function handleNewElementWithFirstMatchingPage(element: HTMLElement) {
    const firstMatchingPage = currentPages.find(page =>
      element.matches(page.cssSelector)
    );
    if (firstMatchingPage) firstMatchingPage.elementAdded(element, api);
  }

  function isHTMLElement(elem: any): elem is HTMLElement {
    return elem instanceof HTMLElement;
  }
})();
