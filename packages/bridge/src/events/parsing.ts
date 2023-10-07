import {
  number,
  string,
  boolean,
  json,
  rgb,
  createValueParserGen,
} from '@tma.js/parsing';

import type {
  ClipboardTextReceivedPayload, CustomMethodInvokedPayload,
  InvoiceClosedPayload, PhoneRequestedPayload,
  PopupClosedPayload, QrTextReceivedPayload,
  ThemeChangedPayload,
  ViewportChangedPayload, WriteAccessRequestedPayload,
} from './payloads.js';

function isNullOrUndefined(value: unknown): boolean {
  return value === null || value === undefined;
}

const rgbOptional = rgb().optional();
const num = number();

const windowWidthParser = createValueParserGen((value) => (value === null || value === undefined
  ? window.innerWidth
  : num.parse(value)));

/**
 * Parses incoming value as ThemeChangedPayload.
 */
export const themeChangedPayload = json<ThemeChangedPayload>({
  theme_params: json({
    bg_color: rgbOptional,
    text_color: rgbOptional,
    hint_color: rgbOptional,
    link_color: rgbOptional,
    button_color: rgbOptional,
    button_text_color: rgbOptional,
    secondary_bg_color: rgbOptional,
  }),
});

/**
 * Parses incoming value as ViewportChangedPayload.
 * @param value - value to parse.
 */
export const viewportChangedPayload = json<ViewportChangedPayload>({
  height: number(),
  width: windowWidthParser(),
  is_state_stable: boolean(),
  is_expanded: boolean(),
});

/**
 * Parses incoming value as PopupClosedPayload.
 */
export const popupClosedPayload = json<PopupClosedPayload>({
  button_id: string({ isEmpty: isNullOrUndefined }).optional(),
});

/**
 * Parses incoming value as QrTextReceivedPayload.
 */
export const qrTextReceivedPayload = json<QrTextReceivedPayload>({
  data: string().optional(),
});

/**
 * Parses incoming value as InvoiceClosedPayload.
 */
export const invoiceClosedPayload = json<InvoiceClosedPayload>({
  slug: string(),
  status: string(),
});

/**
 * Parses incoming value as clipboard text received payload.
 */
export const clipboardTextReceivedPayload = json<ClipboardTextReceivedPayload>({
  req_id: string(),
  data: (value) => (value === null ? value : string().optional().parse(value)),
});

/**
 * Parses incoming value as WriteAccessRequestedPayload.
 */
export const writeAccessRequestedPayload = json<WriteAccessRequestedPayload>({ status: string() });

/**
 * Parses incoming value as PhoneRequestedPayload.
 */
export const phoneRequestedPayload = json<PhoneRequestedPayload>({ status: string() });

/**
 * Parses incoming value as CustomMethodInvokedPayload.
 */
export const customMethodInvokedPayload = json<CustomMethodInvokedPayload>({
  req_id: string(),
  result: (value) => value,
  error: string().optional(),
});
