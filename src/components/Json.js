/**
 * Created by David Maser on 09/06/2017.
 */
import './lib/validate-json';
import {app} from './Config';
import {Items} from './Items';
import {Errors} from './Errors';
import {Storage} from './Storage';
export const Json = {
  validateJSON() {
    $("#output_code").validateJSON({
      compress: false,
      reformat: true,
      onSuccess: (json) => {
        Errors.panelAlert('JSON Code is valid', 'good');
      },
      onError: (error) => {
        Errors.panelAlert('A JSON error has been encountered. The line on which the error has occured is highlighted.', 'error');
      }
    })
  },
  /**
   * Reads JSON that is pasted in the form in
   * translate JSON mode and prepares and formats
   * it to be output to the corresponding
   * form objects
   * @param {Boolean} storage Defines whether to store the data in localStorage when the JSON is traversed
   * @param {String} nodeName Defines the name to be used. Will be appended to the localStorage object's save name
   * @constructor
   */
  loadFromServer(path){
    let xPath = path === 'tlh' ? 'https://cdn.shopify.com/s/files/1/0050/3522/t/22/assets/banners.json' : 'https://cdn.shopify.com/s/files/1/1230/9376/t/2/assets/ALTI-banners.json';
    $.ajax({
      url: xPath,
      success: (data) => {
        let badString = JSON.stringify(data);
        let goodString = badString.slice(0, -1);
        goodString = `{${goodString.substr(1)}}`;
        Json.traverseJSON(false, '', goodString);
      }
    })
  },
  traverseJSON(storage, nodeName, fromAJAX) {
    let ctc;
    if ($(`${app.objects.b} textarea`).val() !== '' || localStorage.getItem('pgb_SavedNode') !== '' && fromAJAX === undefined) {
      if (storage === false) {
        ctc = $(`${app.objects.b} textarea`).val();
        if (ctc === '') {
          Errors.panelAlert('Form Does Not Contain JSON Data', 'error');
        }
      } else if (storage === true && nodeName !== '') {
        if (localStorage.getItem(`pgb_SavedNode_${nodeName}`) !== undefined && localStorage.getItem(`pgb_SavedNode_${nodeName}`) !== null && localStorage.getItem(`pgb_SavedNode_${nodeName}`) !== '') {
          ctc = localStorage.getItem(`pgb_SavedNode_${nodeName}`).replace(',null', '');
        } else {
          Errors.panelAlert('No Data Found In Local Storage', 'error');
        }
      }
      let prs = JSON.parse(ctc);
      let obj = prs.hero;
      let len = obj.length;
      let formItems = $(app.objects.cl).length;
      let formArray = [];
      if (formItems < len) {
        let build = true,
          bItems = len - formItems;
      }
      for (let h = 0; h < bItems; h++) {
        Items.addItems();
      }
      for (let i = 0; i < len; i++) {
        formArray.push(obj[i]);
      }
      this.jsonToForm(formArray);
      Errors.panelAlert('Data Translated To Form', 'good');
    } else if (fromAJAX !== '') {
      if (storage === false) {
        ctc = fromAJAX;
        if (ctc === '') {
          Errors.panelAlert('Form Does Not Contain JSON Data', 'error');
        }
      } else if (storage === true && nodeName !== '') {
        if (localStorage.getItem(`pgb_SavedNode_${nodeName}`) !== undefined && localStorage.getItem(`pgb_SavedNode_${nodeName}`) !== null && localStorage.getItem(`pgb_SavedNode_${nodeName}`) !== '') {
          ctc = localStorage.getItem(`pgb_SavedNode_${nodeName}`).replace(',null', '');
        } else {
          Errors.panelAlert('No Data Found In Local Storage', 'error');
        }
      }
      let prs = JSON.parse(ctc);
      let obj = prs.hero;
      let len = obj.length;
      let formItems = $(app.objects.cl).length;
      let formArray = [];
      if (formItems < len) {
        var build = true,
          bItems = len - formItems;
      }
      for (let h = 0; h < bItems; h++) {
        Items.addItems();
      }
      for (let i = 0; i < len; i++) {
        formArray.push(obj[i]);
      }
      this.jsonToForm(formArray);
      Errors.panelAlert('Data Translated To Form', 'good');
    } else {
      Errors.panelAlert('Please generate or paste JSON before using this function', 'error');
    }
  },
  /**
   * Takes formatted JSON sent from the TraverseJSON
   * function and outputs it to the mapped form
   * element
   * @param {Object} aCode Param is a JSON formatted object. Object can not be a string. Pass the string through JSON.parse first
   * @constructor
   */
  jsonToForm(aCode) {
    const jsLen = aCode.length;
    for (let i = 0; i < jsLen; i++) {
      const jsForm = `entry${i + 1}`;
      const formEl = `#${jsForm}`;
      $(formEl).find('.objStart').val(aCode[i].date.start);
      $(formEl).find('.objEnd').val(aCode[i].date.end);
      $(formEl).find('.objTitleEN').val(aCode[i].title.en);
      $(formEl).find('.objTitleFR').val(aCode[i].title.fr);
      $(formEl).find('.objTitleCol').val(aCode[i].title.color);
      $(formEl).find('.objTextEN').val(aCode[i].text.en);
      $(formEl).find('.objTextFR').val(aCode[i].text.fr);
      try {
        if (aCode[i].conditions.en !== null && aCode[i].conditions.en !== undefined && aCode[i].conditions.en !== '') {
          $(formEl).find('.objConditionsEN').val(aCode[i].conditions.en);
        } else {
          $(formEl).find('.objConditionsEN').val('');
        }
        if (aCode[i].conditions.fr !== null && aCode[i].conditions.fr !== undefined && aCode[i].conditions.fr !== '') {
          $(formEl).find('.objConditionsFR').val(aCode[i].conditions.fr);
        } else {
          $(formEl).find('.objConditionsFR').val('');
        }
      } catch (e) {
        console.log(e);
      }
      $(formEl).find('.objImageMain').val(aCode[i].image.url);
      $(formEl).find('.objImageAlt').val(aCode[i].image.altUrl);
      $(formEl).find('.objButtonEN').val(aCode[i].button.label.en);
      $(formEl).find('.objButtonFR').val(aCode[i].button.label.fr);
      $(formEl).find('.objButtonLink').val(aCode[i].button.url);
      if (aCode[i].date.delay === true || aCode[i].date.delay === false) {
        window.setTimeout(() => {
          core.panelAlert('Some delay entries are not numerical. Make sure to set all delay entries to a numerical value manually.', 'error');
        }, 2000);
      } else if (aCode[i].date.delay === '' || aCode[i].date.delay === null || aCode[i].date.delay === undefined || aCode[i].date.delay === 'undefined') {
        $(formEl).find('.objDelay').val(0);
      } else {
        $(formEl).find('.objDelay').val(aCode[i].date.delay);
      }
      $(formEl).find('.objCountdownShow').val(aCode[i].showCountdown);
      $(formEl).find(`.objButtonPopup option[value="${aCode[i].popUpLink}"]`).attr('selected', true).prop('selected', true);
      $(formEl).find(`.objButtonPopupLink option[value="${aCode[i].button.popUpLinkID}"]`).attr('selected', true).prop('selected', true);
      $(formEl).find(`.objCountdownShow option[value="${aCode[i].showCountdown}"]`).attr('selected', true).prop('selected', true);
      $(formEl).find(`.objHeroSticky option[value="${aCode[i].sticky}"]`).attr('selected', true).prop('selected', true);
      $(formEl).find(`.objHeroTitleShow option[value="${aCode[i].title.showTitle}"]`).attr('selected', true).prop('selected', true);
      $(formEl).find(`.objHeroSubtitleShow option[value="${aCode[i].text.showSubTitle}"]`).attr('selected', true).prop('selected', true);
      $(formEl).find(`.objHeroPromote option[value="${aCode[i].promote}"]`).attr('selected', true).prop('selected', true);
      if (aCode[i].active == true) {
        $(formEl).find('.mod-radio').find('input[type="radio"]').first().prop('checked', true);
        $(formEl).find('.mod-radio').find('input[type="radio"]').last().prop('checked', false);
      } else if (aCode[i].active == false) {
        $(formEl).find('.mod-radio').css('border-left-width', '6px').css('border-left-style', 'solid').css('border-left-color', 'rgb(253, 0, 0)');
        $(formEl).find('.mod-radio').find('input[type="radio"]').first().prop('checked', false);
        $(formEl).find('.mod-radio').find('input[type="radio"]').last().prop('checked', true);
      }
      if ($(app.objects.o).css('display') == 'block') {
        $(app.objects.o).hide();
        $(app.objects.r).css('overflow', 'auto');
      }
      $(app.objects.r).css('overflow', 'auto');
    }
  },
  /**
   * Serializes the form data in a JSON format
   * and passes the data to the outputJson
   * function
   * @param {String} meth
   * @param {String} name
   * @param {String} mode
   * @constructor
   */
  prepareJSON(meth, name, mode) {
    const c = [];
    if (mode === 'hero' || mode === '' || mode === null || mode === undefined) {
      $('.clonedInput form fieldset[data-role="hero"]').each(function () {
        const a = $(this).serializeArray();
        c.push(a);
      });
      if (meth === 'full') {
        this.outputJson(c, meth, null, mode);
      } else if (meth === 'save') {
        this.outputJson(c, meth, name, 'hero');
      }
    } else if (mode === 'hello') {
      $('.clonedInput form fieldset[data-role="hello"]').each(function () {
        const a = $(this).serializeArray();
        c.push(a);
      });
      this.outputJson(c, 'full', null, 'hello');
    }
  },
  /**
   * Receives the serialized data parsed in the
   * prepareJSON function and outputs JSON
   * formatted code to the output view
   * @param {Object} aCode
   * @param {String} meth
   * @param {String} name
   * @param {String} mode
   * @constructor
   */
  outputJson(aCode, meth, name, mode) {
    try {
      const nodes = aCode.length;
      const lastItem = nodes - 1;
      if (mode === 'hello') {
        var page_model = '{\n    "hello": [\n';
        for (var i = 0; i < nodes; i++) {
          page_model += `       {\n        "helloItem": "hello${i}",`;
          page_model += '\n        "date": {';
          page_model += `\n          "start": "${aCode[i][0].value}",`;
          page_model += `\n          "end": "${aCode[i][1].value}"`;
          page_model += '\n        },';
          page_model += '\n        "text": {';
          page_model += `\n          "en": "${aCode[i][2].value.trim().replace(/"/g, '')}",`;
          page_model += `\n          "fr": "${aCode[i][3].value.trim().replace(/"/g, '')}"`;
          page_model += '\n        }';
          if (i < lastItem) {
            page_model += '\n},\n';
          }
        }
        page_model += '\n      }\n   ]\n}';
      } else if (mode === 'hero') {
        page_model = '{\n    "hero": [\n';
        for (i = 0; i < nodes; i++) {
          //mapping
          if (aCode[i][15].value === '' || aCode[i][15].value === null || aCode[i][15].value === undefined) {
            var elemAAAA = 'null';
          } else {
            elemAAAA = aCode[i][15].value;
          }
          if (aCode[i][16].value === '' || aCode[i][16].value === null || aCode[i][16].value === undefined) {
            var elemA = true;
          } else {
            elemA = aCode[i][16].value;
          }
          if (aCode[i][17].value === '' || aCode[i][17].value === null || aCode[i][17].value === undefined) {
            var elemAA = true;
          } else {
            elemAA = aCode[i][17].value;
          }
          if (aCode[i][18].value === '' || aCode[i][18].value === null || aCode[i][18].value === undefined) {
            var elemAAA = true;
          } else {
            elemAAA = aCode[i][18].value;
          }
          if (aCode[i][14].value === '' || aCode[i][14].value === null || aCode[i][14].value === undefined) {
            var elemB = false;
          } else {
            elemB = aCode[i][14].value;
          }
          if (aCode[i][19].value === '' || aCode[i][19].value === null || aCode[i][19].value === undefined) {
            var elemC = false;
          } else {
            elemC = aCode[i][19].value;
          }
          if (aCode[i][22] !== undefined) {
            if (aCode[i][22].value === '' || aCode[i][22].value === null || aCode[i][22].value === undefined) {
              var elemD = true;
            } else {
              elemD = aCode[i][22].value;
            }
          } else {
            elemD = true;
          }
          if (aCode[i][20] !== undefined) {
            if (aCode[i][20].value === '' || aCode[i][20].value === null || aCode[i][20].value === undefined) {
              var elemDD = false;
            } else {
              elemDD = aCode[i][20].value;
            }
          } else {
            elemDD = false;
          }
          if (aCode[i][21] !== undefined) {
            if (aCode[i][21].value === '' || aCode[i][21].value === null || aCode[i][21].value === undefined) {
              var elemE = 0;
            } else {
              elemE = aCode[i][21].value;
            }
          } else {
            elemE = 0;
          }
          page_model += `{\n        "heroId": "hero-elem${i}",`;
          page_model += `\n        "active": ${elemD},`;
          page_model += `\n        "sticky": ${elemDD},`;
          page_model += `\n        "showCountdown": ${elemA},`;
          page_model += `\n        "popUpLink": ${elemB},`;
          page_model += '\n        "date": {';
          page_model += `\n          "start": "${aCode[i][0].value}",`;
          page_model += `\n          "end": "${aCode[i][1].value}",`;
          page_model += `\n          "delay": ${elemE}`;
          page_model += '\n        },';
          page_model += '\n        "title": {';
          page_model += `\n          "en": "${aCode[i][2].value.trim()}",`;
          page_model += `\n          "fr": "${aCode[i][3].value.trim()}",`;
          page_model += `\n          "color": "${aCode[i][4].value}",`;
          page_model += `\n          "showTitle": ${elemAA}`;
          page_model += '\n        },';
          page_model += '\n        "text": {';
          page_model += `\n          "en": "${aCode[i][5].value.trim()}",`;
          page_model += `\n          "fr": "${aCode[i][6].value.trim()}",`;
          page_model += `\n          "showSubTitle": ${elemAAA}`;
          page_model += '\n        },';
          page_model += '\n        "conditions": {';
          page_model += `\n          "en": "${aCode[i][7].value.trim()}",`;
          page_model += `\n          "fr": "${aCode[i][8].value.trim()}"`;
          page_model += '\n        },';
          page_model += `\n        "promote": ${elemC},`;
          page_model += '\n        "button": {';
          page_model += '\n          "label": {';
          page_model += `\n            "en": "${aCode[i][11].value.trim()}",`;
          page_model += `\n            "fr": "${aCode[i][12].value.trim()}"`;
          page_model += '\n          },';
          page_model += `\n        "url": "${aCode[i][13].value}",`;
          page_model += `\n        "popUpLinkID": "${elemAAAA}"`;
          page_model += '\n        },';
          page_model += '\n        "image": {';
          page_model += `\n          "url": "${aCode[i][9].value}",`;
          page_model += `\n          "altUrl": "${aCode[i][10].value}"`;
          page_model += '\n        }';
          if (i < lastItem) {
            page_model += '\n},\n';
          }
        }
        page_model += '\n      }\n   ]\n}';
      }
      if (meth === 'full') {
        if ($(app.objects.he).css('display') === 'block') {
          $(app.objects.he).css('display', 'none');
        }
        if ($(app.objects.h).css('display') === 'block') {
          $(app.objects.h).css('display', 'none');
        }
        if ($(app.objects.ls).css('display') === 'block') {
          $(app.objects.ls).css('display', 'none');
        }
        $(app.objects.o).attr(app.handlers.r, 'output');
        $(app.objects.o).css('display', 'block');
        $(`${app.objects.o} textarea`).val(page_model);
        $(app.objects.r).animate({scrollTop: 0}, app.animation.d.min).css('overflow', 'hidden');
        if (mode === 'hero') {
          Errors.errorHandler();
        }
        Errors.panelAlert('JSON Exported Successfuly', 'good');
      } else {
        Storage.saveNodeToLS(page_model, name);
      }
    } catch (e) {
      Errors.panelAlert('An unknown error has occured. Please make sure all required fields are filled.', 'error');
    }
  }
};