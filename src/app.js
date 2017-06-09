/**
 * Created by David Maser on 09/06/2017.
 */
import "../css/globals.css";
import "../assets/lib/bootstrap-datetimepicker.min.css";
import "../assets/lib/bootstrap.min.css";
import '../assets/lib/bootstrap.min';
import '../assets/lib/bootstrap-datetimepicker.min';
import '../assets/fonts/webFont.css';
//import 'moment'; let webpack resolve moment in the assets/lib folder
import {app} from './components/Config';
import {Init} from './components/Init';
import {Version} from './components/Version';
import {Language} from './components/Language';
import './components/EventHandlers';

global.pfHero = 0;
global.pfMode = app.params.s;
global.pfExport = 'hero';
global.sPos = 0;
global.pfLang = app.lang;

$(() => {
  Init.setHeadSec();
  Init.initializeTheme();
  Init.initHelp();
  Version.getVersion(true);
  Language.languageManager(app.lang, true);
  window.setInterval(() => {
    Version.getVersion(false);
  }, 600000);
  $('.date_obj').datetimepicker({format: 'MM/DD/YYYY HH:mm'});
  $('.btnAdd').attr('disabled', false);
  $('.btnDel').attr('disabled', true);
});