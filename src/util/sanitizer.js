import xss from 'xss';

let options = {
  whiteList: {
    ...xss.whiteList,
    iframe: ['width', 'height', 'src', 'frameborder', 'allowfullscreen'],
  },
};

let boundXSS = (value) => {
  return xss(value, options);
};

export default boundXSS;
