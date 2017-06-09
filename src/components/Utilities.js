/**
 * Created by David Maser on 09/06/2017.
 */
import {app} from './Config';
import {Errors} from './Errors';
export const Utilities = {
  /**
   * Checks the users scroll position on the
   * window and displays a progress bar
   * below the main menu navs
   * @param {String} meth A declares the method as window height, B declares the method as window innerHeight
   * @constructor
   */
  scrollState(meth) {
    let winHeight = $(window).height();
    let docHeight = $(document).height();
    let progressBar = $('progress');
    let max;
    let value;
    max = docHeight - winHeight;
    progressBar.attr('max', max);
    if (meth === 'a') {
      winHeight = $(window).height(),
        docHeight = $(document).height();

      max = docHeight - winHeight;
      progressBar.attr('max', max);

      value = $(window).scrollTop();
      progressBar.attr('value', value);
    } else if (meth === 'b') {
      value = $(window).scrollTop();
      progressBar.attr('value', value);
    }
  },
  /**
   * Simple open url in new tab function
   * @param {String} url The URL to open in the new tab
   * @constructor
   */
  OpenInNewTab(url) {
    let win = window.open(url, '_blank');
    win.focus();
  },
  /**
   * Animates the help item click to bring
   * into view the correct help item
   * @param {Number} a Defines which form item the function will jump to.
   * @constructor
   */
  jumpToHelper(a) {
    $('.help_panel_holder').animate({
      scrollTop: $(`${app.objects.hi}[data-helper="${a}"]`).offset().top,
      duration: app.animation.d.min
    });
    $(app.objects.hi).animate({
      opacity: 0.4,
      duration: app.animation.d.min
    });
    $(`${app.objects.hi}[data-helper="${a}"]`).animate({
      opacity: 1,
      duration: app.animation.d.min
    });
  },
  planBify() {
    $('.objHeroPromote').find('option[value="true"]').prop('selected', true);
    $('.objHeroSticky').find('option[value="false"]').prop('selected', true);
    Errors.panelAlert('Form items have been modified to be Plan B compliant', 'good');
  },
  cleanWhitespace() {
    const a = $('#output_code').val();

    const b = a.replace(/[\t ]+\"/g, '"')
      .replace(/\][\t ]+\[/g, "][")
      .replace(/\}[\t ]+\}/g, '}}')
      .replace(/\}[\t ]+\]/g, "}]")
      .replace(/\"[\t ]+\}/g, '"}')
      .replace(/\"[\t ]+\]/g, '"]')
      .replace(/[\t ]+\}/g, '}')
      .replace(/[\t ]+\{/g, "{")
      .replace(/\:[\t ]+\[/g, ":[")
      .replace(/[\t ]+\:/g, ":")
      .replace(/\:[\t ]+$/g, ":")
      .replace(/\}[\t ]+$/g, "}")
      .replace(/\}[\t ]+$/g, "}")
      .replace(/[\t ]+\]/g, "]")
      .replace(/\n/g, "");

    $('#output_code').val(b);
  }
}