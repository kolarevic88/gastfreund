import {TypesEnum} from "../enums/types.enum";

function getBackgroundColor(type: string): string {
    let backgroundColor = '#5A5A5A'
    switch (type) {
        case TypesEnum.TODO:
            backgroundColor= '#4590D5';
            break;
        case TypesEnum.IN_PROGRESS:
            backgroundColor= '#D03D5B';
            break;
        case TypesEnum.DONE:
            backgroundColor= '#15253E';
            break;
    }
    return backgroundColor;
}
export default getBackgroundColor;
