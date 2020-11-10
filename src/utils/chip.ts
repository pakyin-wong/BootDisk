namespace we {
  export namespace utils {
    export const chipImageMapping = {
      [100]: 'Lv1_Orange',
      [1000]: 'Lv1_Yellow',
      [2000]: 'Lv1_Magentas_Dark',
      [3000]: 'Lv1_Violet',
      [5000]: 'Lv1_Blue',
      [10000]: 'Lv1_Green',
      [20000]: 'Lv1_Gray_Light',
      [30000]: 'Lv1_Brown',
      [50000]: 'Lv1_Blue_Dark',
      [100000]: 'Lv2_Purple_Light',
      [200000]: 'Lv2_GreenBlue',
      [500000]: 'Lv2_Blue_Dark',
      [1000000]: 'Lv2_Red',
      [2000000]: 'Lv2_Mud',
    };
    export const chipImages = [
      'Lv1_Orange',
      'Lv1_Yellow',
      'Lv1_Magentas_Dark',
      'Lv1_Violet',
      'Lv1_Blue',
      'Lv1_Green',
      'Lv1_Gray_Light',
      'Lv1_Brown',
      'Lv1_Blue_Dark',
      'Lv1_Black',
      'Lv2_Orange',
      'Lv2_Mud',
      'Lv2_Purple_Dark',
      'Lv2_Red',
      'Lv2_Blue_Light',
      'Lv2_Green',
      'Lv2_Purple_Light',
      'Lv2_Brown',
      'Lv2_Blue_Dark',
      'Lv2_GreenBlue',
    ];

    //       protected chipImageMapping = ['Lv1_Yellow', 'Lv1_Light_Red', 'Lv1_Blue', 'Lv1_Green', 'Lv1_Blue_Dark', 'Lv2_Purple_Light', 'Lv2_Green', 'Lv2_Blue_Light', 'Lv2_Red', 'Lv2_Mud'];

    // export function getChipImage(val: number) {
    //   if (!chipImageMapping[val]) {
    //     // get the image with nearest smaller chip value
    //     const vals = Object.keys(chipImageMapping);
    //     for (let i = 0; i < vals.length; i++) {
    //       if (val < parseInt(vals[i])) {
    //         return chipImageMapping[vals[i]];
    //       }
    //     }
    //     return chipImageMapping[vals.length];
    //   } else {
    //     return chipImageMapping[val];
    //   }
    // }

    export function getChipImage(val: number) {
      let idx = env.denomList.indexOf(val);
      if (idx<0 || idx >= chipImages.length) {
        throw new Error('Wrong chip value');
      }
      return chipImages[idx];
    }

    export function getChipLabelColor(val: number) {
      if (val < 100000) {
        return 0x000000b3;
      } else {
        return 0xf4f0b2ff;
      }
    }
  }
}
