namespace we {
  export namespace rc {
    export class RcLobbyRoadPanel extends lo.LoLobbyRoadPanel {
      protected dtRoadNames: string[] = [
        'dt1v2',
        'dt1v3',
        'dt1v4',
        'dt1v5',
        'dt1v6',
        'dt1v7',
        'dt1v8',
        'dt1v9',
        'dt1v10',
        'dt2v3',
        'dt2v4',
        'dt2v5',
        'dt2v6',
        'dt2v7',
        'dt2v8',
        'dt2v9',
        'dt2v10',
        'dt3v4',
        'dt3v5',
        'dt3v6',
        'dt3v7',
        'dt3v8',
        'dt3v9',
        'dt3v10',
        'dt4v5',
        'dt4v6',
        'dt4v7',
        'dt4v8',
        'dt4v9',
        'dt4v10',
        'dt5v6',
        'dt5v7',
        'dt5v8',
        'dt5v9',
        'dt5v10',
        'dt6v7',
        'dt6v8',
        'dt6v9',
        'dt6v10',
        'dt7v8',
        'dt7v9',
        'dt7v10',
        'dt8v9',
        'dt8v10',
        'dt9v10',
      ];

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'RcLobbyRoadPanel');
      }

      public changeLang() {
        this.road1Btn['labelDisplayDown']['text'] = this.road1Btn['labelDisplayUp']['text'] = 'B/S';
        this.road2Btn['labelDisplayDown']['text'] = this.road2Btn['labelDisplayUp']['text'] = 'O/E';
        this.road3Btn['labelDisplayDown']['text'] = this.road3Btn['labelDisplayUp']['text'] = 'DT';
        // this.updateActiveLine(false);
      }

      protected init() {
        super.init();

        // dropdown 1
        let arrColRoadTypes = new eui.ArrayCollection([
          ui.NewDropdownItem(0, () => `Ball 1`),
          ui.NewDropdownItem(1, () => `Ball 2`),
          ui.NewDropdownItem(2, () => `Ball 3`),
          ui.NewDropdownItem(3, () => `Ball 4`),
          ui.NewDropdownItem(4, () => `Ball 5`),
          ui.NewDropdownItem(5, () => `Ball 6`),
          ui.NewDropdownItem(6, () => `Ball 7`),
          ui.NewDropdownItem(7, () => `Ball 8`),
          ui.NewDropdownItem(8, () => `Ball 9`),
          ui.NewDropdownItem(9, () => `Ball 10`),
        ]);
        this.road1SelectPanel.dropdown.data.replaceAll(arrColRoadTypes.source);
        this.road1SelectPanel.dropdown.select(0);

        // dropdown 2
        arrColRoadTypes = new eui.ArrayCollection([
          ui.NewDropdownItem(0, () => `Ball 1`),
          ui.NewDropdownItem(1, () => `Ball 2`),
          ui.NewDropdownItem(2, () => `Ball 3`),
          ui.NewDropdownItem(3, () => `Ball 4`),
          ui.NewDropdownItem(4, () => `Ball 5`),
          ui.NewDropdownItem(5, () => `Ball 6`),
          ui.NewDropdownItem(6, () => `Ball 7`),
          ui.NewDropdownItem(7, () => `Ball 8`),
          ui.NewDropdownItem(8, () => `Ball 9`),
          ui.NewDropdownItem(9, () => `Ball 10`),
        ]);
        this.road2SelectPanel.dropdown.data.replaceAll(arrColRoadTypes.source);
        this.road2SelectPanel.dropdown.select(0);

        // dropdown 3
        const arr = [];
        let c = 0;
        for (let i = 1; i < 10; i++) {
          for (let j = i + 1; j <= 10; j++) {
            arr.push(ui.NewDropdownItem(c, () => i + ' VS ' + j));
            c++;
          }
        }
        arrColRoadTypes = new eui.ArrayCollection(arr);
        this.road3SelectPanel.dropdown.data.replaceAll(arrColRoadTypes.source);
        this.road3SelectPanel.dropdown.select(0);
      }

      public destroy() {
        super.destroy();
      }
    }
  }
}
