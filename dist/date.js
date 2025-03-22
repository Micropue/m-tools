export const date = (regexp = "Y-m-d H:i:s") => {
    const _ = new Date();
    const year = _.getFullYear();
    const month = (_.getMonth() + 1) < 10 ? `0${_.getMonth() + 1}` : `${_.getMonth() + 1}`;
    const date = _.getDate() < 10 ? `0${_.getDate()}` : `${_.getDate()}`;
    const day = _.getDay();
    const timestamp = _.getTime();
    const hour = _.getHours() < 10 ? `0${_.getHours()}` : `${_.getHours()}`;
    const minute = _.getMinutes() < 10 ? `0${_.getMinutes()}` : `${_.getMinutes()}`;
    const second = _.getSeconds() < 10 ? `0${_.getSeconds()}` : `${_.getSeconds()}`;
    const monthsString = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const toString = () => {
        const regexps = [
            { regex: /Y/, text: year },
            { regex: /m/, text: month },
            { regex: /F/, text: monthsString[Number(month) - 1] },
            { regex: /d/, text: date },
            { regex: /w/, text: day },
            { regex: /H/, text: hour },
            { regex: /i/, text: minute },
            { regex: /s/, text: second },
            { regex: /A/, text: Number(hour) >= 12 ? 'PM' : 'AM' }
        ];
        const result = (() => {
            let _regexp = regexp || "Y-m-d H:i:s";
            regexps.forEach(item => {
                _regexp = _regexp.replace(new RegExp(item.regex, 'g'), String(item.text));
            });
            return _regexp;
        })();
        return result;
    };
    return {
        year,
        month,
        date,
        day,
        timestamp,
        hour,
        minute,
        second,
        toString
    };
};
