/**
 * Created by David Maser on 09/06/2017.
 */
import {app} from './Config';
export const Version = {
  /**
   * Prompts the user to reload the page if a
   * newer version of the app has been detected
   * remotely.
   * @constructor
   */
  initVersionUpdate: () => {
    $('.init-update').remove();
    let pageData = '<div class="init-update"><div class="blackify_overlay"><div class="prompt-update"><div class="prompt-icon"><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span></div><div class="prompt-message">A newer version of the PageBuilder app has been detected. Do you want to load the newer version now? <br><br>Make sure you save all your work before answering YES.</div><div class="prompt-choice"><button type="button" class="btn btn-update true" data-toggle="dropdown" aria-expanded="false">YES</button><button type="button" class="btn btn-update false" data-toggle="dropdown" aria-expanded="false">NO</button></div></div></div></div>';
    $(app.dom.b).append(pageData).on('click', '.btn-update.true', () => {
      location.reload();
    }).on('click', '.btn-update.false', () => {
      $('.btn-update.false').parent().parent().parent().parent().remove();
      this.panelAlert('Version update stopped. The update prompt will reappear at the next update interval.', 'good');
    })
  },
  /**
   * Tags new items by comparing the current app
   * version to the data-version attribute on
   * main menu links
   * @param {Number} ver
   * @constructor
   */
  tagNew: (ver) => {
    let cssBlock = `<style>.main_nav a[data-version="${ver}"]:after,.bigboy a[data-version="${ver}"]:after {content: "new";float: right;background-color: #f0ad4e;padding: 2px 5px;font-size: 10px;color: #fff;font-weight: bold;}</style>`;
    $(app.dom.b).append(cssBlock).find(`a[data-version="${ver}"]`).attr('title', 'This feature is new to the current version');
  },
  /**
   * Recovers and displays the app version from
   * the release.json file. init=false checks the
   * current version against the server json and
   * initializes and update prompt if the local
   * version is outdated.
   * @param {Boolean} init Define wether the function is initializing or if this is a summary execution
   * @constructor
   */
  getVersion: (init) => {
    try {
      $.ajax({
        type: app.methods.g,
        url: app.version,
        success: (data) => {
          let ver = data.project.version;
          let sup = data.project.history.length - 1;
          let lup = data.project.history[sup].date;
          if (init === true) {
            document.title = `Page Builder ${ver}`;
            $('.version_number').attr('title', `You are using version ${ver}, last updated ${lup}`).html(ver);
            $('html').attr('data-version', ver);
            Version.tagNew(ver);

          } else if (init === false) {
            let cur = $('html').attr('data-version');
            if (cur < ver || cur > ver) {
              this.initVersionUpdate();
            }
          }
        }
      })
    } catch (e) {
      console.log(e);
    }
  }
}