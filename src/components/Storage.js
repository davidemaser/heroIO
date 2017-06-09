/**
 * Created by David Maser on 09/06/2017.
 */
import {app} from './Config';
export const Storage = {
  /**
   * Saves a json node to localStorage
   * @param {String} val Defines the object position in the localStorage object
   * @param {String} name Defines the node name to be stored in the localStorag
   * @constructor
   */
  saveNodeToLS(val, name) {
    let newList = '';
    if (window.localStorage) {
      if (localStorage.getItem('pgb_SavedNode_LS') === null || localStorage.getItem('pgb_SavedNode_LS') === undefined) {
        localStorage.setItem('pgb_SavedNode_LS', "");
      }
      let getList = localStorage.getItem('pgb_SavedNode_LS');
      let getListLen = getList.split(',').length;

      if (getListLen > 0) {
        newList = `${getList},${name}`;
      } else {
        newList = name;
      }
      localStorage.setItem('pgb_SavedNode_LS', newList);
      localStorage.setItem(`pgb_SavedNode_${name}`, val);
      core.panelAlert('Data Saved To Local Storage', 'good');
    }
  },
  choseLocalSave() {
    try {
      $('#loadandsave-zone').attr(app.handlers.r, 'load').css('display', 'block');
      let a = localStorage.getItem(app.storage.n);
      let target = $('.lsOptions');
      if (a !== null || a !== undefined) {
        let b = a.split(',');
        let bLen = b.length;
        $('.lsOptions').find('option').remove();
        $(target).append('<option value="null">SELECT</option>');
        for (let i = 0; i < bLen; i++) {
          $(target).append(`<option value="${b[i]}">${b[i]}</option>`);
        }
      } else {
        $(target).append('<option value="null">No Local Storage Found</option>');
      }
    } catch (e) {
    }
  },
  /**
   * Executes a save of the json data into a localstorage
   * object
   * @param {String} method If method is 'do' or empty, object will be marked to save. If method is 'reset', localstorage object will be flushed
   * @constructor
   */
  doLocalSave(method) {
    if (method === 'do' || method === null) {
      $('#loadandsave-zone').attr('data-reason', 'save').css('display', 'block');
    } else if (method === 'reset') {
      localStorage.setItem('pgb_SavedNode_LS', "");
      for (let i = 0, len = localStorage.length; i < len; i++) {
        let key = localStorage.key(i);
        if (key.includes('pgb_SavedNode_') && !key.includes('pgb_SavedNode_LS')) {
          localStorage.removeItem(key);
        }
      }
    }
  },
  cacheClickedItem(item) {
    if (item.hasClass('childHidden')) {
      item.html('Hide Item').removeClass('childHidden');
      item.parent().parent().parent().parent().parent().find('fieldset[data-role="hero"]').slideToggle(300);
    } else if (!item.hasClass('childHidden')) {
      item.html('Show Item').addClass('childHidden');
      item.parent().parent().parent().parent().parent().find('fieldset[data-role="hero"]').slideToggle(300);
    }
  }
};