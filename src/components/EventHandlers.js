/**
 * Created by David Maser on 09/06/2017.
 */
import {app} from '../components/Config';
import {Utilities} from './Utilities';
import {Items} from './Items';
import {Json} from './Json';
import {Preview} from './Preview';
import {Language} from './Language';
import {Validator} from './Validators';
import {Init} from './Init';
import {Storage} from './Storage';
import {Errors} from './Errors';
$(function(){
$(app.objects.bo).on('click', '.btnAdd', () => {
  Items.addItems();
}).on('click', '.app_lang_toggle', () => {
  const lng = $('.app_lang_toggle').attr('data-set-lang');
  Language.languageManager(lng);
}).on('click', '.overlay_close', () => {
  $('.overlay_close').parent().parent().hide();
  $(app.objects.r).css('overflow', 'auto');
  $('.overlay_message').css('display', 'none')
}).on('click', '.select_content', () => {
  const $this = $(`${app.objects.b} textarea`);
  $this.select();
  // Work around Chrome's little problem
  $this.mouseup(() => {
    // Prevent further mouseup intervention
    $this.unbind("mouseup");
    return false;
  });
}).on('click', '.gotoItem', function () {
  const a = $(this).data('item');
  $(app.objects.r).animate({
    scrollTop: $(app.objects.e + a).offset().top - 60
  }, app.animation.d.min);
  if ($(app.objects.o).css('display') == 'block') {
    $(app.objects.r).css('overflow', 'auto');
    $('#oapp.objects.output').css('display', 'none')
  }
  if ($(app.objects.he).css('display') == 'block') {
    $(app.objects.he).css('display', 'none');
  }
}).on('click', '.about_app,.version_number', e => {
  window.open("../release.html", "_blank", "scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no");
}).on('click', '.btnAddMulti', () => {
  $('#query-zone').toggle();
  $(app.objects.r).animate({scrollTop: 0}, app.animation.d.min);
  if ($(app.objects.o).css('display') == 'block') {
    $(app.objects.o).css('display', 'none');
  }
  if ($(app.objects.h).css('display') == 'block') {
    $(app.objects.h).css('display', 'none');
  }
  $('.num_select').focus();
}).on('click', app.objects.c, (e) => {
  const a = $(app.objects.c).data('handler');
  Validator.validateImage('main', a);
  e.preventDefault();
}).on('click', '.multiquery_close', () => {
  $('.multiquery_close').parent().parent().hide();
}).on('click', '.check_alt_image', (e) => {
  const a = $('.check_alt_image').data('handler');
  Validator.validateImage('alt', a);
  e.preventDefault();
}).on('click', '.overlay_validate', () => {
  Json.validateJSON();
}).on('click', '.overlay_trim', () => {
  Utilities.cleanWhitespace();
  Errors.panelAlert('Whitespace and line breaks have been removed.', 'good');
}).on('click', '.previewItem.large', (e) => {
  $(app.objects.r).animate({scrollTop: sPos}, app.animation.d.min).css('overflow', 'hidden');
  const a = $('.previewItem.large').data('hero');
  Preview.previewFeature(a, 'large', pfLang);
  e.preventDefault();
}).on('click', '.previewItem.small', (e) => {
  $(app.objects.r).animate({scrollTop: sPos}, app.animation.d.min).css('overflow', 'hidden');
  const a = $('.previewItem.small').data('hero');
  Preview.previewFeature(a, 'small', pfLang);
  e.preventDefault();
}).on('click', '.removeThisItem', () => {
  const a = $('.removeThisItem').data('item');
  Items.deleteItems(a);
}).on('click', '.loadItem', () => {
  const a = $('.loadItem').attr(app.handlers.i);
  Json.traverseJSON(true, a);
}).on('click', '.copy-zone', () => {
  Utilities.OpenInNewTab('https://github.com/davidemaser/heroIO');
}).on('click', '.showHelp', () => {
  $(app.objects.he).toggle();
  if ($(app.objects.he).css('display') === 'block') {
    $(app.objects.r).animate({scrollTop: 0}, app.animation.d.min).css('overflow', 'hidden');
  } else {
    $(app.objects.r).css('overflow', 'auto');
  }
  if ($(app.objects.o).css('display') === 'block') {
    $(app.objects.o).css('display', 'none');
  }
  if ($(app.objects.h).css('display') === 'block') {
    $(app.objects.h).css('display', 'none');
  }
}).on('click', '.help_close', () => {
  if ($(app.objects.he).css('display') === 'block') {
    $('.help_close').parent().parent().hide();
    $(app.objects.r).css('overflow', 'auto');
  }
}).on('click', '.renderer_close', () => {
  if ($(app.objects.h).css('display') === 'block') {
    $('.renderer_close').parent().parent().hide();
    $(app.objects.r).css('overflow', 'auto');
    $(app.objects.h).find('.render_output').empty();
  }
}).on('click', '.btnNmode', () => {
  let a = $(app.dom.b).attr('data-nmode');
  if (a === 'hero') {
    $(app.dom.b).attr('data-nmode', 'hello');
    $('.btnNmode').attr('data-nmode', 'hello');
    $('.btnNmode').html('Switch to Hero Banner Mode');
    Init.switchModes('hello')
  } else if (a === 'hello') {
    $(app.dom.b).attr('data-nmode', 'hero');
    $('.btnNmode').attr('data-nmode', 'hero');
    $('.btnNmode').html('Switch to Hello Bar Mode');
    Init.switchModes('hero')
  }
}).on('click', '.btnDel', () => {
  Items.deleteItems('last');
}).on('click', '.hideItem', function (e) {
  Storage.cacheClickedItem($(this));
  e.preventDefault();
}).on('click', '.submit_json', () => {
  let a = $('.submit_json').attr('data-nmode');
  Json.prepareJSON('full', null, a);
}).on('click', '.translate_json', () => {
  $('.overlay_message').html('');
  $(app.objects.r).animate({scrollTop: 0}, app.animation.d.min).css('overflow', 'hidden');
  $(app.objects.o).attr(app.handlers.r, 'translate').css('display', 'block').find('#output_code').val('').attr('placeholder', 'Paste you code here');
}).on('click', '.translate_from_server', () => {
  let xPath = $('.translate_from_server').attr('tlh');
  Json.loadFromServer(xPath);
}).on('click', '.save_json', function () {
  if (app.save === true) {
    Storage.doLocalSave();
  } else {
    confirm('The save to localstorage feature is disabled. Change the save value to true in the globals file.');
  }
}).on('click', '.import_json', (e) => {
  Storage.choseLocalSave();
}).on('click', '.planb_friendly', (e) => {
  Utilities.planBify();
  e.preventDefault();
}).on('click', '.overlay_translate', () => {
  Json.traverseJSON(false);
}).on('click', '.errors_reset', () => {
  $('input,select').attr('style', '').attr('placeholder', '');
  $('.errorList').css('display', 'none');
  $(app.objects.r).css('overflow', 'auto');
  $(app.objects.i).find('.input_alerts').remove();
  $(app.objects.i).contents().unwrap();
  Errors.panelAlert('Errors Reset', 'good');
}).on('click', '.form_reset', e => {
  $(app.objects.r).animate({scrollTop: 0}, app.animation.d.min).css('overflow', 'hidden');
  $('.clonedInput:gt(0)').remove();
  $('.snapTo').find('li:gt(0)').remove();
  $('input').val('');
  $('input,select').attr('style', '').attr('placeholder', '');
  $('.errorList').css('display', 'none');
  $(app.objects.r).css('overflow', 'auto');
  $(app.objects.i).find('.input_alerts').remove();
  $(app.objects.i).contents().unwrap();
  $('.reordered').remove();
  Errors.panelAlert('Form Reset To Default', 'good');
  e.preventDefault();
}).on('click', '.itemize_reset', e => {
  Items.resetItems();
  e.preventDefault();
}).on('click', '.form_local_reset', e => {
  Storage.doLocalSave('reset');
  $(app.objects.l).hide();
  e.preventDefault();
}).on('click', 'input,select', function () {
  $(this).attr('style', '').attr('placeholder', '');
  if ($(this).parent().hasClass('input_holders')) {
    $(this).parent().find('.input_alerts').remove();
    $(this).unwrap();
  }
}).on('click', '.helpItem', function () {
  let a = $(this).data('target');
  Utilities.jumpToHelper(a);
}).on('click', '.image_count', () => {
  $('.image_count').attr('style', '');
  $('.image_count').text('Shopify CDN');
}).on('click', '.btnSwitch', (e) => {
  pfLang = $('.btnSwitch').data('language');
  $('.btnSwitch').removeClass('view-active');
  $(`.btnSwitch[data-language="${pfLang}"]`).addClass('view-active');
  if ($(app.objects.ro).children().not('.preview_warning').length > 0) {
    Preview.previewFeature(pfHero, pfMode, pfLang)
  }
  Errors.panelAlert('Preview language changed', 'good');
  e.preventDefault();
}).on('click', '.panel-body.bottom_level_bt', () => {
  $('.panel-body.bottom_level_bt').slideUp();
}).on('click', '.show_me_how', () => {
  let a = $('.show_me_how').data('target') - 1;
  $(app.objects.r).animate({scrollTop: 0}, {
    duration: app.animation.d.min,
    complete() {
      $(app.objects.he).show();
      Utilities.jumpToHelper(a);
    }
  }).css('overflow', 'hidden');
}).on('click', '.helpItemReset', () => {
  $(app.objects.hi).animate({
    opacity: 1
  }, app.animation.d.min);
}).on('click', '.settings_toggle', function (e) {
  let a = $(this).attr('data-theme');
  $('html').attr(app.handlers.t, a);
  if (window.localStorage) {
    localStorage.setItem('pgb_Theme', a);
  }
  Errors.panelAlert('Theme Settings Updated', 'good');
  e.preventDefault();
}).on('click', '.moveUpThisItem', function (fn) {
  let a = $(this).data('item');
  let b = a - 1;
  let c = $(this).parent().parent().parent().parent().parent().parent();
  let d = $(c).closest(app.objects.cl).prev();
  let e = $(c).data('split');
  $(c).attr(app.handlers.s, (e - 1));
  $(c).insertBefore(d);
  $(app.objects.r).animate({
    scrollTop: $(app.objects.e + a).offset().top - 60
  }, app.animation.d.min);
  //$(d).closest(app.objects.cl).prev();
  $(this).parent().parent().parent().find('.reordered').remove();
  $(this).parent().parent().parent().find('.btn.btn-info:not(.dropdown-toggle)').prepend('<span title="This entry has been moved from it\'s original position" class="glyphicon glyphicon-fullscreen reordered" aria-hidden="true"></span>');
  Errors.panelAlert('Item Order Changed', 'good');
  fn.preventDefault();
}).on('click', '.moveDownThisItem', function (fn) {
  let a = $(this).data('item');
  let b = a - 1;
  let c = $(this).parent().parent().parent().parent().parent().parent();
  let d = $(c).closest(app.objects.cl).next();
  let e = $(c).data('split');
  let f = $(d).attr('id');
  if (f.includes('entry')) {
    $(c).attr(app.handlers.s, (e + 1));
    $(c).insertAfter(d);
    $(app.objects.r).animate({
      scrollTop: $(app.objects.e + a).offset().top - 60
    }, app.animation.d.min);
    $(this).parent().parent().parent().find('.reordered').remove();
    $(this).parent().parent().parent().find('.btn.btn-info:not(.dropdown-toggle)').prepend('<span title="This entry has been moved from it\'s original position" class="glyphicon glyphicon-fullscreen reordered" aria-hidden="true"></span>');
    Errors.panelAlert('Item Order Changed', 'good');
  } else {
    Errors.panelAlert('If I move down any further, I\'ll be off the page.', 'error');
  }
  fn.preventDefault();
}).on('keyup', 'input', function () {
  let a = $(this).val().length;
  let compLen;
  if ($(this).hasClass('objTitleEN') || $(this).hasClass('objTitleFR') || $(this).hasClass('objTextEN') || $(this).hasClass('objTextFR')) {
    compLen = 35;
  } else if ($(this).hasClass('objButtonEN') || $(this).hasClass('objButtonFR')) {
    compLen = 15;
  }
  if (a > compLen) {
    if ($(this).parent().attr('class') !== 'input_holders') {
      $(this).wrap('<div class="input_holders"></div>').parent().append('<div class="input_alerts" title="The length of your text may be too long for the hero banner container. Make sure to check that it displays correctly."><span class="glyphicon glyphicon-exclamation-sign"></span></div>');
      $(this).focus();
    }
  } else {
    if (a <= compLen) {
      if ($(this).parent().attr('class') === 'input_holders') {
        $(this).parent().find('.input_alerts').remove();
        $(this).unwrap();
        $(this).focus();
      }
    }
  }
}).on('keyup', '.num_select', (e) => {
  if (e.keyCode === 13) {
    $('.num_select').trigger("enterKey");
    Items.addMulti($('.num_select').val());
    $('.num_select').parent().parent().parent().parent().hide();
  }
}).on('keyup', '.lsl_select', (e) => {
  if (e.keyCode === 13) {
    $('.lsl_select').trigger("enterKey");
    Json.prepareJSON('save', $('.lsl_select').val());
    $('.lsl_select').parent().parent().parent().parent().hide();
    Init.setHeadSec();
  }
}).on('keyup', `${app.objects.o}[${app.handlers.r}="translate"] #output_code`, function (e) {
  if (e.keyCode === 45) {
    $(this).trigger("enterKey");
    Json.traverseJSON(false);
    e.preventDefault();
  }
}).on('change', '.objHeroSticky', () => {
  let a = $('.objHeroSticky').val();
  if (a === 'true') {
    $('.objHeroSticky').parent().parent().find('.objHeroPromote option[value="true"]').attr('selected', false);
  } else if (a === 'false') {
    //$('.objHeroSticky').parent().parent().find('.objHeroPromote option[value="false"]').attr('selected',true);
  }
}).on('change', '.objButtonPopup', () => {
  let a = $('.objButtonPopup').val();
  if (a === 'true') {
    $('.objButtonPopup').parent().parent().find('.objButtonPopupLink').attr('style', '');
  } else if (a === 'false') {
    $('.objButtonPopup').parent().parent().find('.objButtonPopupLink').css('opacity', 0.3);
  }
}).on('change', '.input_radio', function () {
  let a = $(this).parent().parent().parent().parent().parent().attr('id').replace('entry', '');
  if ($(this).val() === 'true') {
    $(this).parent().parent().css('border-left', '6px solid #68B81F');
    $(this).parent().parent().parent().parent().find('h2').find('span').removeClass('label-danger').addClass('label-default');
    $(`.gotoItem[${app.handlers.i}="${a}"]`).removeClass('redout').attr('title', '');
  } else {
    $(this).parent().parent().css('border-left', '6px solid #FD0000');
    $(this).parent().parent().parent().parent().find('h2').find('span').removeClass('label-default').addClass('label-danger');
    $(`.gotoItem[${app.handlers.i}="${a}"]`).addClass('redout').attr('title', 'This Hero entry is not activated');
  }
}).on('change', '.lsOptions', () => {
  try {
    if ($('.lsOptions').val() !== "" || $('.lsOptions').val() !== "undefined" || $('.lsOptions').val() !== undefined || $('.lsOptions').val() !== "null" || $('.lsOptions').val() !== null) {
      let a = $('.lsOptions').val();
      Json.traverseJSON(true, a);
      $('#loadandsave-zone').css('display', 'none');
    } else {
      panelAlert('Please select a valid data item from the dropdown', 'error');
    }
  } catch (e) {

  }
}).on('click', '.addConditions', () => {
  let $targetObject = $('.addConditions').parent().parent().parent().parent().parent().parent().find('.form-group.option-selection');
  let $targetStatus = $targetObject.css('display');
  if ($targetStatus === 'none') {
    $targetObject.css('display', 'table');
  } else if ($targetStatus === 'table') {
    $targetObject.css('display', 'none')
  }
});
$(window).on('scroll', () => {
  if ($(window).scrollTop() + $(window).height() === $(document).height()) {
    $('.copy-zone').fadeIn(app.animation.d.min);
  } else {
    $('.copy-zone').fadeOut(app.animation.d.min);
  }
}).on('resize', () => {
  Utilities.scrollState('a');
});
$(document).on('keydown', e => {
  if (e.keyCode === 71 && e.ctrlKey) {
    let a = $('.submit_json').attr('data-nmode');
    Json.prepareJSON('full', null, a);
    e.preventDefault();
  }
  if (e.keyCode === 82 && e.ctrlKey) {
    Items.deleteItems();
    e.preventDefault();
  }
  if (e.keyCode === 73 && e.ctrlKey && !e.altKey) {
    Items.addItems();
    e.preventDefault();
  }
  if (e.keyCode === 73 && e.ctrlKey && e.altKey) {
    $('#query-zone').toggle();
    $(app.objects.r).animate({scrollTop: 0}, app.animation.d.min);
    if ($(app.objects.o).css('display') === 'block') {
      $(app.objects.o).css('display', 'none');
    }
    if ($(app.objects.h).css('display') === 'block') {
      $(app.objects.h).css('display', 'none');
    }
    $('.num_select').focus();
    e.preventDefault();
  }
  if (e.keyCode === 83 && e.ctrlKey && e.shiftKey) {
    if (app.save === true) {
      Storage.doLocalSave();
    } else {
      confirm('The save to localstorage feature is disabled. Change the save value to true in the globals file.');
    }
  }
  if (e.keyCode === 13 && e.ctrlKey && e.altKey) {
    $('.overlay_message').html('');
    $(app.objects.r).animate({scrollTop: 0}, app.animation.d.min).css('overflow', 'hidden');
    $(app.objects.o).attr(app.handlers.r, 'translate').css('display', 'block').find('#output_code').val('').attr('placeholder', 'Paste you code here');
    e.preventDefault();
  }
  if (e.keyCode === 45 && e.ctrlKey && e.altKey) {
    Storage.choseLocalSave();
  }
  if (e.keyCode === 69 && e.ctrlKey && e.altKey) {
    if (pfLang === app.language.e) {
      pfLang = app.language.f;
    } else if (pfLang === app.language.f) {
      pfLang = app.language.e;
    }
    $('.btnSwitch').removeClass('view-active');
    $(`.btnSwitch[data-language="${pfLang}"]`).addClass('view-active');
    if ($(app.objects.ro).children().not('.preview_warning').length > 0) {
      Preview.previewFeature(pfHero, pfMode, pfLang);
    }
    Errors.panelAlert('Preview language changed', 'good');
    e.preventDefault();
  }
  if (e.keyCode === 191 && e.ctrlKey) {
    window.open("../release.html", "_blank", "scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no");
    e.preventDefault();
  }
}).on('scroll', () => {
  Utilities.scrollState('b');
  sPos = $(window).scrollTop();
});
})