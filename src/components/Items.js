/**
 * Created by David Maser on 09/06/2017.
 */
import {app} from './Config';
import {Utilities} from './Utilities';
import {Errors} from './Errors';
export const Items = {
  /**
   * Add new items to the form. Duplicates a
   * form block
   * @constructor
   */
  addItems() {
    if ($(app.objects.o).css('display') === 'block') {
      $(app.objects.o).css('display', 'none');
    }

    let // Checks to see how many "duplicatable" input fields we currently have
      num = $(app.objects.cl).length; // create the new element via clone(), and manipulate it's ID using newNum value

    let // The numeric ID of the new input field being added, increasing by 1 each time
      newNum = new Number(num + 1);

    let newElem = $(app.objects.e + num).clone().attr('id', `entry${newNum}`);

    newElem.find('.heading-reference').attr('id', `ID${newNum}_reference`).attr('name', `ID${newNum}_reference`).html(`<div class="btn-group bigboy"><button type="button" class="btn btn-info">ITEM <span class="label label-default">${newNum}</span></button><button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu"><li><a class="previewItem large" href="javascript:;" data-hero="${newNum}" data-role="hero">Preview Large</a></li><li><a class="previewItem small" href="javascript:;" data-hero="${newNum}" data-role="hero">Preview Small</a></li></ul></div>`);
    newElem.attr(app.handlers.s, newNum);

    newElem.find('.label_ttl').attr('for', `ID${newNum}_title`);
    newElem.find('.select_ttl:not(".objButtonPopupLink")').attr('id', `ID${newNum}_title`).attr('name', `ID${newNum}_title`).val('');

    newElem.find('.label_fn').attr('for', `ID${newNum}_first_name`);
    newElem.find('.input_fn').attr('id', `ID${newNum}_first_name`).attr('name', `ID${newNum}_first_name`).val('');

    newElem.find('.label_ln').attr('for', `ID${newNum}_last_name`);
    newElem.find('.input_ln').attr('id', `ID${newNum}_last_name`).attr('name', `ID${newNum}_last_name`).val('');

    newElem.find('.label_checkboxitem').attr('for', `ID${newNum}_checkboxitem`);
    newElem.find('.input_checkboxitem').attr('id', `ID${newNum}_checkboxitem`).attr('name', `ID${newNum}_checkboxitem`).val([]);

    newElem.find('.radio:nth-child(1)').attr('for', `ID${newNum}_radioitemA`).find('.input_radio').attr('id', `ID${newNum}_radioitemA`).attr('name', `ID${newNum}_radioitem`).val([]);
    newElem.find('.radio:nth-child(2)').attr('for', `ID${newNum}_radioitemB`).find('.input_radio').attr('id', `ID${newNum}_radioitemB`).attr('name', `ID${newNum}_radioitem`).val([]);

    newElem.find('.label_email').attr('for', `ID${newNum}_email_address`);
    newElem.find('.input_email').attr('id', `ID${newNum}_email_address`).attr('name', `ID${newNum}_email_address`).val('');

    newElem.find('.label_twt').attr('for', `ID${newNum}_twitter_handle`);
    newElem.find('.input_twt').attr('id', `ID${newNum}_twitter_handle`).attr('name', `ID${newNum}_twitter_handle`).val('');
    newElem.find(app.objects.c).attr(app.handlers.d, newNum);
    newElem.find('.check_alt_image').attr(app.handlers.d, newNum);
    newElem.find('.input-group-addon.image_count').attr('style', '').html('Shopify CDN');
    newElem.find('.mod-radio').attr('style', '');

    $('.clonedInput:last').after(newElem);
    $(`#ID${newNum}_title`).focus();

    $('#btnDel').attr('disabled', false);

    if (newNum === 10)
      $('.btnAdd').attr('disabled', true).prop('value', "You've reached the limit"); // value here updates the text in the 'add' button when the limit is reached
    const dateNow = new Date();
    $('.date_obj').datetimepicker({format: 'MM/DD/YYYY HH:mm'});
    $('.snapTo').append(`<li><a href="#" class="gotoItem" ${app.handlers.i}="${newNum}">Item ${newNum}</a></li>`);
    $(app.objects.r).animate({
      scrollTop: $(app.objects.e + newNum).offset().top - 60
    }, app.animation.d.min);
    $('.btn-group.bigboy:not(.helpMePlease)').last().find('ul').append(`<li class="divider" data-role="hero"></li><li><a class="removeThisItem" ${app.handlers.i}="${newNum}" href="javascript:;">Remove</a></li><li class="divider"></li><li><a class="moveUpThisItem" ${app.handlers.i}="${newNum}" href="javascript:;">Move Up<span class="glyphicon glyphicon-arrow-up"></span></a></li><li><a class="moveDownThisItem" ${app.handlers.i}="${newNum}" href="javascript:;">Move Down<span class="glyphicon glyphicon-arrow-down"></span></a></li><li class="divider" data-role="hero"></li><li data-role="hero"><a class="addConditions" data-hero="1" data-role="hero" data-lang-id="action17" data-version="3.2.1">Toggle Conditions</a></li><li data-role="hero"><a class="hideItem" data-hero="1" data-role="hero" data-lang-id="action18" data-version="3.2.1">Hide Item</a></li>`);
    $(app.objects.e + newNum).find('.mod-radio').find('input').first().prop('checked', true);
    Utilities.scrollState('a');
    Errors.panelAlert('Item Added', 'good');
  },
  /**
   * Adds multiple hero items to the current
   * instance
   * @param {Number} num How may new objects should the script create
   * @constructor
   */
  addMulti : (num) => {
    for (let i = 0; i < num; i++) {
      Items.addItems();
    }
    Errors.panelAlert('Items Added', 'good');
  },
  /**
   * Delete items from the form instance and
   * removes them from the dom reference
   * @param {String} elem Defines the DOM element that is targeted for deletion
   * @returns {boolean}
   * @constructor
   */
  deleteItems : (elem) => {
    if ($(app.objects.cl).length > 1) {
      if ($(app.objects.o).css('display') === 'block') {
        $(app.objects.o).css('display', 'none');
      }
      //var num = $(app.objects.cl).length;
      if (elem === 'last') {
        let a = $('.clonedInput:last').attr('id');
        let b = a.replace('entry', '');
        $(`#${a}`).slideUp('slow', function () {
          $(this).remove();
          // if only one element remains, disable the "remove" button
          if (elem - 1 === 1)
            $('.btnDel').attr('disabled', true);
          // enable the "add" button
          $('.btnAdd').attr('disabled', false).prop('value', "add section");
        });
        $('.snapTo').find(`.gotoItem[${app.handlers.i}="${b}"]`).parent().remove();
        Utilities.scrollState('a');
      } else {
        $(app.objects.e + elem).slideUp('slow', function () {
          $(this).remove();
          // if only one element remains, disable the "remove" button
          if (elem - 1 === 1)
            $('.btnDel').attr('disabled', true);
          // enable the "add" button
          $('.btnAdd').attr('disabled', false).prop('value', "add section");
        });
        $('.snapTo').find(`.gotoItem[${app.handlers.i}="${elem}"]`).parent().remove();
        Utilities.scrollState('a');
      }
      Errors.panelAlert('Last Item Removed', 'good');
      return false; // Removes the last section you added
    }
  },
  /**
   * Checks if page items have been moved
   * and resets them to their original position
   * based on the numeric value of their ID
   * @constructor
   */
  resetItems: () => {
    if ($(app.objects.re).length > 0) {
      $(app.objects.w).find(app.objects.cl).sort((a, b) => $(a).attr('id').replace('entry', '') - $(b).attr('id').replace('entry', '')).appendTo(app.objects.w);
      $(app.objects.re).remove();
      Errors.panelAlert('Items reset to their original position', 'good');
    } else {
      Errors.panelAlert('All items are in their original position', 'error');
    }
  }
};