export function numFormatter(num) {
    num = parseFloat(num);
    if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(3).replace(/\.0$/, '') + 'T';
    }
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(3).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(3).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(3).replace(/\.0$/, '') + 'K';
    }

    return num.toFixed(2);
}

export function numberWithCommas(x) {
    //return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (x != undefined && x != null)
        return x.toLocaleString('en-US');
    else
        return x;
}
