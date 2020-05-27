namespace we {
  export namespace core {
    export const Event = {
      TOGGLE_SIDE_GAMELIST: 'TOGGLE_SIDE_GAMELIST',
      TOGGLE_MOBILE_DROPDOWN: 'TOGGLE_MOBILE_DROPDOWN',
      TOGGLE_SILDER_MENU: 'TOGGLE_SILDER_MENU',
      TOGGLE_OVERLAY_PANEL: 'TOGGLE_OVERLAY_PANEL',
      TOGGLE_MESSAGE_PANEL: 'TOGGLE_MESSAGE_PANEL',
      VOICE_UPDATE: 'EV_VOICE_UPDATE',
      BGM_UPDATE: 'EV_BGM_UPDATE',
      MODE_UPDATE: 'EV_MODE_UPDATE',
      METER_UPDATE: 'EV_METER_UPDATE',
      ENTER_SCENE: 'EV_ENTER_SCENE',
      SWITCH_LEFT_HAND_MODE: 'SWITCH_LEFT_HAND_MODE',
      SWITCH_LANGUAGE: 'i18n_SWITCH_LANGUAGE',
      CONNECT_SUCCESS: 'MQTT_EV_CONNECT_SUCCESS',
      CONNECT_FAIL: 'MQTT_EV_CONNECT_FAIL',
      PLAYER_PROFILE_UPDATE: 'PLAYER_PROFILE_UPDATE',
      TABLE_LIST_UPDATE: 'TABLE_LIST_UPDATE',
      TABLE_INFO_UPDATE: 'TABLE_INFO_UPDATE',
      TABLE_BET_INFO_UPDATE: 'TABLE_BET_INFO_UPDATE',
      PLAYER_BET_INFO_UPDATE: 'PLAYER_BET_INFO_UPDATE',
      PLAYER_BET_RESULT: 'PLAYER_BET_RESULT',
      BALANCE_UPDATE: 'BALANCE_UPDATE',
      MATCH_GOOD_ROAD_TABLE_LIST_UPDATE: 'MATCH_GOOD_ROAD_TABLE_LIST_UPDATE',
      MATCH_GOOD_ROAD_DATA_UPDATE: 'MATCH_GOOD_ROAD_DATA_UPDATE',
      ROADMAP_UPDATE: 'ROADMAP_UPDATE',
      BET_TABLE_LIST_UPDATE: 'BET_TABLE_LIST_UPDATE',
      LIVE_PAGE_LOCK: 'LIVE_PAGE_LOCK',
      LIVE_DISPLAY_MODE: 'LIVE_DISPLAY_MODE',
      INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
      EXCEED_BET_LIMIT: 'EXCEED_BET_LIMIT',
      BET_CHIP_CHANGE: 'BET_CHIP_CHANGE',
      BET_LIMIT_CHANGE: 'BET_LIMIT_CHANGE',
      BET_DENOMINATION_CHANGE: 'BET_DENOMINATION_CHANGE',
      SIDE_PANEL_CHANGE: 'SIDE_PANEL_CHANGE',
      GOOD_ROAD_ADD: 'GOOD_ROAD_ADD',
      GOOD_ROAD_MODIFY: 'GOOD_ROAD_MODIFY',
      GOOD_ROAD_REMOVE: 'GOOD_ROAD_REMOVE',
      GOOD_ROAD_EDIT: 'GOOD_ROAD_EDIT',
      GOOD_ROAD_DATA_UPDATE: 'GOOD_ROAD_DATA_UPDATE',
      NOTIFICATION: 'NOTIFICATION',
      ORIENTATION_UPDATE: 'ORIENTATION_UPDATE',
      UPDATE_NAVBAR_OPACITY: 'UPDATE_NAVBAR_OPACITY',
      BET_COMBINATION_UPDATE: 'BET_COMBINATION_UPDATE',
      BET_COMBINATION_AMOUNT_UPDATE: 'BET_COMBINATION_AMOUNT_UPDATE',
      CARD_FLIPPED: 'CARD_FLIPPED',
    };

    export const MQTT = {
      READY: 'READY',
      TABLE_LIST_UPDATE: 'TABLE_LIST_UPDATE',
      GAME_STATUS_UPDATE: 'GAME_STATUS_UPDATE',
      GAME_STATISTIC_UPDATE: 'GAME_STATISTIC_UPDATE',
      BALANCE_UPDATE: 'BALANCE_UPDATE',
      PLAYER_BET_INFO_UPDATE: 'PLAYER_BET_INFO_UPDATE',
      PLAYER_BET_RESULT: 'PLAYER_BET_RESULT',
      ERROR: 'ERROR',
      CONNECT_SUCCESS: 'MQTT_EV_CONNECT_SUCCESS',
      CONNECT_FAIL: 'MQTT_EV_CONNECT_FAIL',
      TABLE_BET_INFO_UPDATE: 'TABLE_BET_INFO_UPDATE',
      BET_TABLE_LIST_UPDATE: 'BET_TABLE_LIST_UPDATE',
      NOTIFICATION_ROADMAP_MATCH: 'NOTIFICATION_ROADMAP_MATCH',
    };

    export const Error = {
      WFCABLE_ERROR: 'WFCABLE_ERROR',
    };
  }
}
