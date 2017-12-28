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

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?';
  const data = Object.assign({}, conmmonParams, {
    singerid: singerId,
    g_tk: 1769267188,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    order: 'listen',
    num: 100,
    begin: 0,
    songstatus: 1
  });
  return jsonp(url, data, options);
}
