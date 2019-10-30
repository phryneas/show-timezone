import { Api } from "./api";

interface Page {
  matchUrl: RegExp;
  cssSelector: string;
  elementAdded(element: HTMLElement, api: Api): void;
  elementRemoved?(element: HTMLElement): void;
}

export const pages: Page[] = [
  {
    matchUrl: /^(www\.)?github\.com/,
    cssSelector: '.vcard-detail[itemprop="homeLocation"]',
    async elementAdded(elem, api) {
      const span = elem.querySelector("span.p-label");
      if (!span) {
        return;
      }
      const location = span.textContent || "";

      const infoElem = document.createElement("span");
      infoElem.textContent = "please wait";
      elem.appendChild(infoElem);
      const locationInfo = await api.getLocationInfo(location);
      infoElem.textContent = `offset by ${locationInfo.timeOffset} hours`;
    }
  }
];
