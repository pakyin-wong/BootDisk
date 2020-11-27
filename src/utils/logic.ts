namespace we {
    export namespace utils {
        export namespace bam {
            export function isPlayerFlipAllowed(chipLayer: ui.ChipLayer) {
                let allowed = false;
                if (chipLayer && chipLayer.getConfirmedBetDetails()) {
                    chipLayer.getConfirmedBetDetails().map(value => {
                        if (value.field === we.ba.BetField.PLAYER) {
                            if (value.amount > 0) {
                                allowed = true;
                            }
                        }
                    });
                }
                return allowed;
            }

            export function isBankerFlipAllowed(chipLayer: ui.ChipLayer) {
                let allowed = false;
                if (chipLayer && chipLayer.getConfirmedBetDetails()) {
                    chipLayer.getConfirmedBetDetails().map(value => {
                        if (value.field === we.ba.BetField.BANKER || value.field === we.ba.BetField.SUPER_SIX_BANKER) {
                            if (value.amount > 0) {
                                allowed = true;
                            }
                        }
                    });
                }
                return allowed;
            }
        }
    }
}