const htmlToString = (string: string) => string.replace(/(<([^>]+)>)/gi, '');

export { htmlToString };