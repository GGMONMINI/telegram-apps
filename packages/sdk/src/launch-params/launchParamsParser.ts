import type { LaunchParams } from './types.js';
import { initDataParser } from '../init-data/index.js';
import { boolean, searchParams, string, type ValueParser } from '../parsing/index.js';
import { themeParamsParser } from '../theme-params/index.js';

/**
 * Returns parser used to parse launch params.
 */
export function launchParamsParser(): ValueParser<LaunchParams, false> {
  return searchParams<LaunchParams>({
    botInline: {
      type: boolean().optional(),
      from: 'tgWebAppBotInline',
    },
    initData: {
      type: initDataParser().optional(),
      from: 'tgWebAppData',
    },
    initDataRaw: {
      type: string().optional(),
      from: 'tgWebAppData',
    },
    platform: {
      type: string(),
      from: 'tgWebAppPlatform',
    },
    showSettings: {
      type: boolean().optional(),
      from: 'tgWebAppShowSettings',
    },
    startParam: {
      type: string().optional(),
      from: 'tgWebAppStartParam',
    },
    themeParams: {
      type: themeParamsParser(),
      from: 'tgWebAppThemeParams',
    },
    version: {
      type: string(),
      from: 'tgWebAppVersion',
    },
  }, 'LaunchParams');
}
