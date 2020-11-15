namespace we {
  export namespace utils {
    export function getCardResName(resName: string) {
      if (!resName) {
        return null;
      }
      if (!env.isMobile) {
        if (resName === 'back') {
          return 'd_sq_ba_card_back_png';
        } else if (resName === 'red') {
          return 'd_bcba_panel_shoe_card_red_png';
        } else {
          return `d_sq_bac_large_poker_${resName}_png`;
        }
      }

      if (resName === 'back') {
        console.log('m_sq_bac_small_poker_backside_png');
        return 'm_sq_bac_small_poker_backside_png';
      } else if (resName === 'red') {
          return 'm_bcba_red_card_png';
        } else {
          console.log(`m_sq_bac_small_poker_${resName}_vertical_png`);
        return `m_sq_bac_small_poker_${resName}_vertical_png`;
      }
    }
  }
}
