import { profileEnd } from "console";

export const mergedArrayOfObjects = (a1: Array<any>, a2: Array<any>, id: any) => {

    return a1.map(itm => ({
        ...a2.find((item) => (item[id] === itm[id]) && item),
        ...itm
    }));
}
export const sortObjectByProperty = (obj: Array<any>, property: any, isAscending: boolean) => {
    const tempObj = [...obj];
    if (property === `startDate` || property === `endDate`) {
        if (isAscending) {
            return tempObj.sort((a, b) => (new Date(a[property]) > new Date(b[property]) ? 1 : -1));
        }
        else {
            return tempObj.sort((a, b) => (new Date(a[property]) > new Date(b[property]) ? -1 : 1));
        }
    }
    if (isAscending) {
        return tempObj.sort((a, b) => (a[property] > b[property] ? 1 : -1));
    }
    else {
        return tempObj.sort((a, b) => (a[property] > b[property] ? -1 : 1));
    }
}