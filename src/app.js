/**
 * Created by David Maser on 09/06/2017.
 */
import validator from '../assets/js/validate-json';
import {app} from './components/Config';
import {Json} from './components/Json';
import {Storage} from './components/Storage';
import {Validator} from './components/Validators';
import {Items} from './components/Items';
import {Init} from './components/Init';
import {Version} from './components/Version';
import {Language} from './components/Language';
import {Errors} from './components/Errors';
import {Preview} from './components/Preview';
import {Utilities} from './components/Utilities';
import './components/EventHandlers';

let pfHero = 0;
let pfMode = app.params.s;
let pfExport = 'hero';
let sPos = 0;
let pfLang = app.lang;

$(() => {
  /**
   * Main document ready initialized function
   */
  Init.setHeadSec();
  Init.initializeTheme();
  Init.initHelp();
  Version.getVersion(true);
  Init.loadAPIparams();
  Language.languageManager(app.lang, true);
  window.setInterval(() => {
    Version.getVersion(false);
  }, 600000);
  $('.date_obj').datetimepicker({format: 'MM/DD/YYYY HH:mm'});

  $('.btnAdd').attr('disabled', false);
  // Disable the "remove" button
  $('.btnDel').attr('disabled', true);
});