/**
 * Created by David Maser on 09/06/2017.
 */
import {app} from './Config';
export const Errors ={
  /**
   * Generic error handler that checks if certain
   * form objects are filled and outputs a dropdown
   * list with anchor links
   * @constructor
   */
  errorHandler() {
    let errorLog = [];
    let a = JSON.parse($(`${app.objects.o}[${app.handlers.r}="output"]`).find('textarea').val()).hero;
    let b = a.length;
    let c = 0;
    for (let i = 0; i < b; i++) {
      if (a[i].date.start === '') {
        errorLog.push({form: (i + 1), obj: "Start Date", prob: "No Value. FATAL", elem: "objStart", die: true});
        c++;
      }
      if (a[i].date.end === '') {
        errorLog.push({form: (i + 1), obj: "End Date", prob: "No Value. FATAL", elem: "objEnd", die: true});
        c++;
      }
      if (a[i].title.en === '') {
        errorLog.push({form: (i + 1), obj: "English Title", prob: "No Value", elem: "objTitleEN", die: false});
        c++;
      }
      if (a[i].title.fr === '') {
        errorLog.push({form: (i + 1), obj: "French Title", prob: "No Value", elem: "objTitleFR", die: false});
        c++;
      }
      if (a[i].text.en === '') {
        errorLog.push({form: (i + 1), obj: "English Text", prob: "No Value", elem: "objTextEN", die: false});
        c++;
      }
      if (a[i].text.fr === '') {
        errorLog.push({form: (i + 1), obj: "French Text", prob: "No Value", elem: "objTextFR", die: false});
        c++;
      }
      if (a[i].button.label.en === '') {
        errorLog.push({
          form: (i + 1),
          obj: "English Button Label",
          prob: "No Value",
          elem: "objButtonEN",
          die: false
        });
        c++;
      }
      if (a[i].button.label.fr === '') {
        errorLog.push({
          form: (i + 1),
          obj: "French Button Label",
          prob: "No Value",
          elem: "objButtonFR",
          die: false
        });
        c++;
      }
      if (a[i].button.url === '') {
        errorLog.push({form: (i + 1), obj: "Button URL", prob: "No Value", elem: "objButtonLink", die: false});
        c++;
      }
      if (a[i].image.url === '') {
        errorLog.push({form: (i + 1), obj: "Image URL", prob: "No Value", elem: "objImageMain", die: false});
        c++;
      }
    }
    errorLog.reverse();//present the errors in the right direction
    if (c > 0) {
      $(app.objects.el).css('display', 'inline-block');
      $('.errorListing').empty();
      for (let j = 0; j < errorLog.length; j++) {
        $('.errorListing').prepend(`<li><a href="javascript:;" class="errorItem ${errorLog[j].die}" ${app.handlers.i}="${j}">Item ${errorLog[j].form} : ${errorLog[j].obj} : ${errorLog[j].prob}</a></li>`);
        core.registerErrorButtons(errorLog[j].form, errorLog[j].elem, j, errorLog[j].prob, errorLog[j].die);
      }
      $(app.objects.el).find('button').html(`Warnings<span class="label label-default numerrors">${errorLog.length}</span><span class="caret"></span>`);
    } else {
      $(app.objects.el).css('display', 'none');
    }
  },
  /**
   * Binds each error item created by the
   * errorHandler function to a click handler
   * that animates scroll to the specific
   * error item
   * @param {Number} num Defines which form node is being targetted by the function
   * @param {String} elem Defines the dom element that will be highlighted when function fires
   * @param {String} item Defines the form element that triggered the error
   * @param {String} prob Receives a summary description of the problem that was encountered
   * @param {Boolean} die Defines whether the button is registered to an event/error that will cause the script to fail
   * @constructor
   */
  registerErrorButtons(num, elem, item, prob, die) {
    $(app.objects.bo).on('click', `.errorItem[${app.handlers.i}="${item}"]`, () => {
      if (die === true) {
        $(app.objects.e + num).find(`.${elem}`).css('background-color', 'rgba(238, 54, 54, 0.3)').css('border-color', 'red').attr('placeholder', 'Leaving this field empty will cause the hero banner function to fail');
      } else {
        $(app.objects.e + num).find(`.${elem}`).css('background-color', 'rgba(238, 162, 54, 0.3)');
      }
      $(app.objects.o).hide();
      $(app.objects.r).css('overflow', 'auto');
      $(app.objects.r).animate({
        scrollTop: $(`${app.objects.e + num} .${elem}`).offset().top - 100
      }, app.animation.d.min);
      if ($(`.${elem}`).parent().attr('class') !== 'input_holders') {
        $(`.${elem}`).wrap('<div class="input_holders"></div>').parent().append(`<div class="input_alerts" title="${prob}"><span class="glyphicon glyphicon-exclamation-sign"></span></div>`)
      }
    });
  },
  /**
   * Panel alert function - Creates a bottom panel alert view
   * that slides into view with a
   * defined message.
   * @param {String} mess Defines the message that will be displayed in the alert panel
   * @param {String} state State defines the reason for the alert. Can be 'error' or 'good'
   * @constructor
   */
  panelAlert: (mess, state) => {
    let dispLeng = 10000;
    if (app.dialog === true) {
      const mPane = '.panel-body.bottom_level_bt';
      if (state === app.params.e) {
        $(mPane).find(app.objects.g).removeClass('allGood').removeClass('glyphicon-ok').addClass('allBad').addClass('glyphicon-remove');
        dispLeng = app.animation.d.max;
      } else if (state === app.params.g) {
        $(mPane).find(app.objects.g).removeClass('allBad').removeClass('glyphicon-remove').addClass('allGood').addClass('glyphicon-ok');
        dispLeng = 10000;
      }
      $(mPane).slideDown();
      $(mPane).find('.inner_message').html(mess);
      window.setTimeout(() => {
        $('.panel-body.bottom_level_bt').slideUp();
      }, dispLeng);
    }
  }
};