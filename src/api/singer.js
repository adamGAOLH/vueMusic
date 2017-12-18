import jsonp from 'common/js/jsonp';
import {
  conmmonParams,
  options
} from './config';
// import axios from 'axios';

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';

  const data = Object.assign({}, conmmonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 703121016,
    hostUin: 0,
    platform: 'yqq'
  });
  return jsonp(url, data, options);
}
