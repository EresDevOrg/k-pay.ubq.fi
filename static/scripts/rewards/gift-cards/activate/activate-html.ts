import { GiftCard } from "../../../../../shared/types";

const html = String.raw;

export function getGiftCardActivateInfoHtml(giftCard: GiftCard) {
  return html`
    <div class="redeem-info-wrapper" data-show="false" data-info-for="${giftCard.productId}">
      <div class="redeem-info">
        <div class="close-btn">
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Edit / Close_Square">
              <path
                id="Vector"
                d="M9 9L11.9999 11.9999M11.9999 11.9999L14.9999 14.9999M11.9999 11.9999L9 14.9999M11.9999 11.9999L14.9999 9M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4801 4 18.9079 4.21799C19.2842 4.40973 19.5905 4.71547 19.7822 5.0918C20.0002 5.51962 20.0002 6.07967 20.0002 7.19978V16.7998C20.0002 17.9199 20.0002 18.48 19.7822 18.9078C19.5905 19.2841 19.2842 19.5905 18.9079 19.7822C18.4805 20 17.9215 20 16.8036 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z"
                stroke="#ccc"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </div>
        <div class="instructions">
          <p>${giftCard.redeemInstruction.concise}</p>
          ${giftCard.redeemInstruction.concise != giftCard.redeemInstruction.verbose ? `<p>${giftCard.redeemInstruction.verbose}</p>` : ``}
        </div>
      </div>
    </div>
  `;
}
