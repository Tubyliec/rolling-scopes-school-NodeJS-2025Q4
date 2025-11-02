export const parseUserName = (arg) => {
    const index = arg[0].indexOf('=');
    return arg[0].slice(index+1);
}