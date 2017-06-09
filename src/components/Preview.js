/**
 * Created by David Maser on 09/06/2017.
 */
import {app} from './Config';
export const Preview = {

  /**
   *
   * @param {String} heroItem
   * @param {String} mode
   * @param {String} lang
   * @constructor
   */
  previewFeature(heroItem, mode, lang) {
    const dt = $(app.objects.e + heroItem).find('form').find('fieldset[data-role="hero"]').serializeArray();
    const start = dt[0].value;
    const img = dt[9].value;
    const titleColor = dt[4].value;
    let outputString,titleText,subTitleText,buttonLabel,endsLabel;
    if (lang === app.language.e) {
      let titleText = dt[2].value;
      let subTitleText = dt[5].value;
      let buttonLabel = dt[11].value;
      let endsLabel = 'Ends In';
    } else if (lang === app.language.f) {
      let titleText = dt[3].value;
      let subTitleText = dt[6].value;
      let buttonLabel = dt[12].value;
      let endsLabel = 'Termine dans';
    }
    const buttonLink = dt[11].value;
    const container = app.objects.h;
    const target = '.render_output';
    const sub = dt[16].value;
    const warningString = '<div class="preview_warning" title="The position and size of the background may display differently than on the live site.">Preview may differ from actual site render</div>';
    if (mode === 'small') {
      outputString = '<div class="five columns jose pedro homepage_content event mini-spacers animated fadeIn delay-05s"><div id="event-active-today">';
    } else {
      outputString = '';
    }
    outputString += `<div data-instance="slide-0" data-str="${img}"`;
    outputString += ' data-promote="true" id="slide-0" class="hero fwidth root-0"><div data-object-pos="false-false" class="bcg skrollable skrollable-between" data-center="background-position: 50% 0px;" data-top-bottom="background-position: 50% -200px;" data-anchor-target="#slide-0"';
    outputString += ` style="background-image: url(${img}); background-position: 50% -55.2631578947369px;"><div class="hsContainer"><div class="hsContent center skrollable skrollable-before" data-100-top="opacity: 1" data-25-top="opacity: 0" data-anchor-target="#slide-0 .animated" style="opacity: 1;">`;
    outputString += `<div itemscope="" itemtype="http://schema.org/Event" class="animated fadeIn delay-025s hero_head"><p itemprop="startDate" content="${start}" class="subtitle timedown is-countdown" id="countdown0" style="opacity:0.9"><span>${endsLabel}  <b>11:29:39</b> </span></p>`;
    outputString += `<h1 class="headline herobanner" style="color:${titleColor}">${titleText}</h1>`;
    if (sub === 'true') {
      outputString += `<p class="subtitle herobanner">${subTitleText}</p>`;
    }
    outputString += `<a data-bleed="" href="${buttonLink}" class="action_button hero"><span class="trn" data-trn-key="">${buttonLabel}</span></a>`;
    outputString += '</div></div></div></div></div>';
    if (mode === 'small') {
      outputString += '</div></div><div style="clear:both"></div>';
    } else if (mode === 'large') {
      outputString += warningString;
    }
    $(container).show().css('top', sPos + 50);
    $(target).empty().append(outputString);
    if (mode === 'small') {
      pfHero = heroItem;
      pfMode = mode;
      $(target).addClass('renderSmall').attr('data-hero', heroItem).attr('data-language', lang).attr('data-mode', mode);
    } else if (mode === 'large') {
      pfHero = heroItem;
      pfMode = mode;
      $(target).removeClass('renderSmall').attr('data-hero', heroItem).attr('data-language', lang).attr('data-mode', mode);
    }
  }
};