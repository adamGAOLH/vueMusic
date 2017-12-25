// 添加classname
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}
// 判断是否有classname
export function hasClass(el, className) {
  // 以空白字符为开头或结尾的
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

export function getData(el, name, val) {
  const prefix = 'data-';
  name = prefix + name;
  if (val) {
    // setAttribute() 方法添加指定的属性，并为其赋指定的值。
    return el.setAttribute(name, val);
  } else {
    // getAttribute() 方法返回指定属性名的属性值
    return el.getAttribute(name);
  }
}
