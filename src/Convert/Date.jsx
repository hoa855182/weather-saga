export const cvDate = (dt) => {
    const date = new Date(dt * 1000);
    let day = date.getDay();

    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Loading Data, Please wait";
    }

}

export const cvDa = (dt) => {
    const date = new Date(dt * 1000);
    let day = date.getDay();

    switch (day) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return "Loading Data, Please wait";
    }

}