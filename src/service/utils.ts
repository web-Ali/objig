/* eslint-disable @typescript-eslint/no-explicit-any */
export  function getCookie(name: any) {
    const matches = document.cookie.match(new RegExp(
        `(?:^|; )${  name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')  }=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}