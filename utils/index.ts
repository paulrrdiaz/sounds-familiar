import not from 'ramda/src/not';
import isNil from 'ramda/src/isNil';
import isEmpty from 'ramda/src/isEmpty';
import pipe from 'ramda/src/pipe';
import indexBy from 'ramda/src/indexBy';
import prop from 'ramda/src/prop';

const isNotNill = pipe(isNil, not);
const isNotEmpty = pipe(isEmpty, not);
const normalizeBy = (key: string) => (arr: any[]) => indexBy(prop(key), arr);
const normalizeByUID = normalizeBy('uid');

export { isEmpty, isNotNill, isNotEmpty, normalizeBy, normalizeByUID };
