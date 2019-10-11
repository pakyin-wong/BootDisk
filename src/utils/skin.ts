module utils {

    export function getSkin(name:string) {

        let device:string = "desktop";

        //check current device
        return `resource/skin_${device}/${name}.exml`;
    }
}