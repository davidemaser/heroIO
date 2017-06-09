/**
 * Created by David Maser on 09/06/2017.
 */
import {app} from './Config';
export const Validator = {
  urlExists(testUrl) {
    const http = jQuery.ajax({
      type: "HEAD",
      url: `https:${testUrl}`,
      async: false
    });
    return http.status;
    // this will return 200 on success, and 0 or negative value on error
  },
  /**
   * Gets the image url input by the user and runs it
   * through the urlExists function. Depending on the
   * value returned, the form elements will be
   * formatted accordingly
   * @param {string} type
   * @param {String} handler
   * @constructor
   */
  validateImage(type, handler) {
    if (type === 'main') {
      let a = $(`${app.objects.c}[${app.handlers.d}="${handler}"]`).parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image').val();
      let aa = $(`${app.objects.c}[${app.handlers.d}="${handler}"]`).parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image');
      let aaa = $(`${app.objects.c}[${app.handlers.d}="${handler}"]`).parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image').parent().attr('class');
      if (a !== '') {
        let b = core.urlExists(a);
        if (b !== 200) {
          if (aaa === 'input_holders') {
            $(aa).next().next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
          } else {
            $(aa).next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
          }
        } else if (b === 200) {
          if (aaa === 'input_holders') {
            $(aa).next().next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
          } else {
            $(aa).next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
          }
        } else {
          if (aaa === 'input_holders') {
            $(aa).next().next().attr('style', '').html('Shopify CDN');
          } else {
            $(aa).next().attr('style', '').html('Shopify CDN');
          }
        }
      } else {
        if (aaa === 'input_holders') {
          $(aa).next().next().css('background-color', '#eee').html('Nothing to validate');
        } else {
          $(aa).next().css('background-color', '#eee').html('Nothing to validate');
        }
      }
    } else if (type === 'alt') {
      let a = $(`${app.objects.ca}[${app.handlers.d}="${handler}"]`).parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image').val();
      let aa = $(`${app.objects.ca}[${app.handlers.d}="${handler}"]`).parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image');
      let aaa = $(`${app.objects.ca}[${app.handlers.d}="${handler}"]`).parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image').parent().attr('class');
      if (a !== '') {
        b = core.urlExists(a);
        if (b !== 200) {
          if (aaa === 'input_holders') {
            $(aa).next().next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
          } else {
            $(aa).next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
          }
        } else if (b === 200) {
          if (aaa === 'input_holders') {
            $(aa).next().next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
          } else {
            $(aa).next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
          }
        } else {
          if (aaa === 'input_holders') {
            $(aa).next().next().attr('style', '').html('Shopify CDN');
          } else {
            $(aa).next().attr('style', '').html('Shopify CDN');
          }
        }
      } else {
        if (aaa === 'input_holders') {
          $(aa).next().next().css('background-color', '#eee').html('Nothing to validate');
        } else {
          $(aa).next().css('background-color', '#eee').html('Nothing to validate');
        }
      }
    }
  }
}