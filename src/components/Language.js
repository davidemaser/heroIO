/**
 * Created by David Maser on 09/06/2017.
 */
import {app} from './Config';
export const Language = {
  /**
   * Language manager that handles the switching between
   * english and french
   * @param {String} lng Define the language to be queried. Can be en_EN or fr_FR
   * @param {Boolean} init Define wether the language manager should be initialized or if this is a summary language translation process
   * @constructor
   */
  languageManager: (lng, init) => {
    let newLang;
    lng = $(app.dom.h).attr('data-language') || lng;
    switch (lng) {
      case "en_EN":
        newLang = 'fr_FR';
        $('.app_lang_toggle').attr('data-set-lang', newLang);
        init !== true ? $(app.dom.h).attr('data-language', newLang) : null;
        break;
      case "fr_FR":
        newLang = 'en_EN';
        $('.app_lang_toggle').attr('data-set-lang', newLang);
        init !== true ? $(app.dom.h).attr('data-language', newLang) : null;
        break;
    }
    /**
     * Function iterates through page objects and
     * applies the translations
     * @param {Object} obj Object contains an array of language items picked up by html data attributes. This is used by the parent function
     * @constructor
     */
    function translatePageItems(obj){
      for (const o in obj) {
        $(`[data-lang-id="${obj[o].objID}"]`).html(obj[o].objTran);
      }
    }
    try {
      if (init === true) {
        newLang = lng;
      }
      $.ajax({
        type: app.methods.g,
        url: `${app.languageRoot}${newLang}.json`,
        success(data) {
          const actionLen = data.node.section[0].actions.length;
          const loadLen = data.node.section[1].load.length;
          const errorLen = data.node.section[2].errors.length;
          const helpLen = data.node.section[3].help.length;
          const lngContainer = [];
          for (let i = 0; i < actionLen; i++) {
            lngContainer.push({
              objID: data.node.section[0].actions[i].id,
              objTran: data.node.section[0].actions[i].translate
            });
          }
          for (let j = 0; j < loadLen; j++) {
            lngContainer.push({
              objID: data.node.section[1].load[j].id,
              objTran: data.node.section[1].load[j].translate
            });
          }
          for (let k = 0; k < errorLen; k++) {
            lngContainer.push({
              objID: data.node.section[2].errors[k].id,
              objTran: data.node.section[2].errors[k].translate
            });
          }
          for (let l = 0; l < helpLen; l++) {
            lngContainer.push({
              objID: data.node.section[3].help[l].id,
              objTran: data.node.section[3].help[l].translate
            });
          }
          new translatePageItems(lngContainer);
        }
      })
    } catch (e) {
      console.log(e);
    }
  }
}