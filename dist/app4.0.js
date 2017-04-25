'use strict';

/*
 * Wwebapp created by David Maser for use on The Last Hunt site. Use outside of the Altitude-Sports domains is not allowed.
 */
var pfLang = app.lang;

var pfHero = 0;
var pfMode = app.params.s;
var pfExport = 'hero';
var sPos = 0;
/**
 *
 * @type {{panelAlert: core.panelAlert, getVersion: core.getVersion, languageManager: core.languageManager, initVersionUpdate: core.initVersionUpdate, tagNew: core.tagNew, initializeForm: core.initializeForm, switchModes: core.switchModes, initializeTheme: core.initializeTheme, initHelp: core.initHelp, setHeadSec: core.setHeadSec, launchBats: core.launchBats, killBats: core.killBats, resetItems: core.resetItems, choseLocalSave: core.choseLocalSave, doLocalSave: core.doLocalSave, scrollState: core.scrollState, openInNewTab: core.OpenInNewTab, addMulti: core.addMulti, jumpToHelper: core.jumpToHelper, saveNodeToLS: core.saveNodeToLS, addItems: core.addItems, deleteItems: core.deleteItems, validateJSON: core.validateJSON, errorHandler: core.errorHandler, registerErrorButtons: core.registerErrorButtons, traverseJSON: core.traverseJSON, jsonToForm: core.jsonToForm, prepareJSON: core.prepareJSON, outputJson: core.outputJson, urlExists: core.urlExists, validateImage: core.validateImage, previewFeature: core.previewFeature, loadAPIparams: core.loadAPIparams, planBify: core.planBify, cleanWhitespace: core.cleanWhitespace, cacheClickedItem: core.cacheClickedItem}}
 * @constructor
 */
var core = {
    /**
     * Panel alert function - Creates a bottom panel alert view
     * that slides into view with a
     * defined message.
     * @param {String} mess Defines the message that will be displayed in the alert panel
     * @param {String} state State defines the reason for the alert. Can be 'error' or 'good'
     * @constructor
     */
    panelAlert: function panelAlert(mess, state) {
        var dispLeng = 10000;
        if (app.dialog === true) {
            var mPane = '.panel-body.bottom_level_bt';
            if (state === app.params.e) {
                $(mPane).find(app.objects.g).removeClass('allGood').removeClass('glyphicon-ok').addClass('allBad').addClass('glyphicon-remove');
                dispLeng = app.animation.d.max;
            } else if (state === app.params.g) {
                $(mPane).find(app.objects.g).removeClass('allBad').removeClass('glyphicon-remove').addClass('allGood').addClass('glyphicon-ok');
                dispLeng = 10000;
            }
            $(mPane).slideDown();
            $(mPane).find('.inner_message').html(mess);
            window.setTimeout(function () {
                $('.panel-body.bottom_level_bt').slideUp();
            }, dispLeng);
        }
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
    getVersion: function getVersion(init) {
        try {
            $.ajax({
                type: app.methods.g,
                url: app.version,
                success: function success(data) {
                    var ver = data.project.version;
                    var sup = data.project.history.length - 1;
                    var lup = data.project.history[sup].date;
                    if (init === true) {
                        document.title = 'Page Builder ' + ver;
                        $('.version_number').attr('title', 'You are using version ' + ver + ', last updated ' + lup).html(ver);
                        $('html').attr('data-version', ver);
                        core.tagNew(ver);
                    } else if (init === false) {
                        var cur = $('html').attr('data-version');
                        if (cur < ver || cur > ver) {
                            core.initVersionUpdate();
                        }
                    }
                }
            });
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * Language manager that handles the switching between
     * english and french
     * @param {String} lng Define the language to be queried. Can be en_EN or fr_FR
     * @param {Boolean} init Define wether the language manager should be initialized or if this is a summary language translation process
     * @constructor
     */
    languageManager: function languageManager(lng, init) {
        var newLang = void 0;
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
        function translatePageItems(obj) {
            for (var o in obj) {
                $('[data-lang-id="' + obj[o].objID + '"]').html(obj[o].objTran);
            }
        }
        try {
            if (init === true) {
                newLang = lng;
            }
            $.ajax({
                type: app.methods.g,
                url: 'data/language/' + newLang + '.json',
                success: function success(data) {
                    var actionLen = data.node.section[0].actions.length;
                    var loadLen = data.node.section[1].load.length;
                    var errorLen = data.node.section[2].errors.length;
                    var helpLen = data.node.section[3].help.length;
                    var lngContainer = [];
                    for (var _i = 0; _i < actionLen; _i++) {
                        lngContainer.push({
                            objID: data.node.section[0].actions[_i].id,
                            objTran: data.node.section[0].actions[_i].translate
                        });
                    }
                    for (var j = 0; j < loadLen; j++) {
                        lngContainer.push({
                            objID: data.node.section[1].load[j].id,
                            objTran: data.node.section[1].load[j].translate
                        });
                    }
                    for (var k = 0; k < errorLen; k++) {
                        lngContainer.push({
                            objID: data.node.section[2].errors[k].id,
                            objTran: data.node.section[2].errors[k].translate
                        });
                    }
                    for (var l = 0; l < helpLen; l++) {
                        lngContainer.push({
                            objID: data.node.section[3].help[l].id,
                            objTran: data.node.section[3].help[l].translate
                        });
                    }
                    new translatePageItems(lngContainer);
                }
            });
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * Prompts the user to reload the page if a
     * newer version of the app has been detected
     * remotely.
     * @constructor
     */
    initVersionUpdate: function initVersionUpdate() {
        $('.init-update').remove();
        var pageData = '<div class="init-update"><div class="blackify_overlay"><div class="prompt-update"><div class="prompt-icon"><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span></div><div class="prompt-message">A newer version of the PageBuilder app has been detected. Do you want to load the newer version now? <br><br>Make sure you save all your work before answering YES.</div><div class="prompt-choice"><button type="button" class="btn btn-update true" data-toggle="dropdown" aria-expanded="false">YES</button><button type="button" class="btn btn-update false" data-toggle="dropdown" aria-expanded="false">NO</button></div></div></div></div>';
        $(app.dom.b).append(pageData).on('click', '.btn-update.true', function () {
            location.reload();
        }).on('click', '.btn-update.false', function () {
            $('.btn-update.false').parent().parent().parent().parent().remove();
            core.panelAlert('Version update stopped. The update prompt will reappear at the next update interval.', 'good');
        });
    },

    /**
     * Tags new items by comparing the current app
     * version to the data-version attribute on
     * main menu links
     * @param {Number} ver
     * @constructor
     */
    tagNew: function tagNew(ver) {
        var cssBlock = '<style>.main_nav a[data-version="' + ver + '"]:after,.bigboy a[data-version="' + ver + '"]:after {content: "new";float: right;background-color: #f0ad4e;padding: 2px 5px;font-size: 10px;color: #fff;font-weight: bold;}</style>';
        $(app.dom.b).append(cssBlock).find('a[data-version="' + ver + '"]').attr('title', 'This feature is new to the current version');
    },

    /**
     * creates the initial form instance by
     * populating the parent container with
     * elements defined in a layout.json
     * file
     * @constructor
     */
    initializeForm: function initializeForm() {
        $.ajax({
            type: app.methods.g,
            url: app.objects.form.l,
            success: function success(data) {
                var dataBlock = data.layout;
                var htmlBlock = '<div id="entry1" class="clonedInput" ' + app.handlers.s + '="1"><form action="' + dataBlock.form_action + '" method="' + dataBlock.method + '" id="' + dataBlock.form_id + '" role="form">';
                htmlBlock += dataBlock.header;
                htmlBlock += '<fieldset>';
                var blockContent = dataBlock.block;
                var blockLen = blockContent.length;
                for (var _i2 = 0; _i2 < blockLen; _i2++) {
                    if (blockContent[_i2].display !== 'custom') {
                        if (_i2 % 2 === 0 || _i2 === 0) {
                            if (blockContent[_i2].wrap_group === true) {
                                htmlBlock += '<div class="' + blockContent[_i2].wrap_group_class + '">';
                            }
                            htmlBlock += '<div class="form-group">';
                            var blocker = ' lItem';
                        } else {
                            blocker = '';
                        }
                        if (blockContent[_i2].display !== 'empty') {
                            switch (blockContent[_i2].display) {
                                case "full":
                                    var _line = '';
                                    blocker = '';
                                    break;
                                case "half":
                                    _line = 'half_span';
                                    break;
                            }
                            htmlBlock += '<div class="' + line + ' ' + blocker + '">';
                            htmlBlock += '<label class="label_fn control-label" for="' + blockContent[_i2].obj_id + '">' + blockContent[_i2].label + '</label>';
                            if (blockContent[_i2].wrap === true) {
                                htmlBlock += '<div class="' + blockContent[_i2].wrap_class + '">';
                            }
                            if (blockContent[_i2].inject_code !== '') {
                                htmlBlock += blockContent[_i2].inject_code;
                            }
                            if (blockContent[_i2].input_obj === 'text') {
                                htmlBlock += '<input';
                                if (blockContent[_i2].obj_id !== '') {
                                    htmlBlock += ' id="' + blockContent[_i2].obj_id + '" name="' + blockContent[_i2].obj_id + '"';
                                }
                                htmlBlock += ' type="text" placeholder="' + blockContent[_i2].placeholder + '" class="input_fn form-control';
                                if (blockContent[_i2].class !== '') {
                                    htmlBlock += ' ' + blockContent[_i2].class;
                                }
                                if (blockContent[_i2].obj_label !== '') {
                                    htmlBlock += ' ' + blockContent[_i2].obj_label;
                                }
                                htmlBlock += '"';
                                if (blockContent[_i2].options !== null) {
                                    var opLen = blockContent[_i2].options.length;
                                    for (var j = 0; j < opLen; j++) {
                                        htmlBlock += ' ' + blockContent[_i2].options[j].item + '="' + blockContent[_i2].options[j].value + '"';
                                    }
                                }
                                if (blockContent[_i2].data !== null) {
                                    var dtLen = blockContent[_i2].data.length;
                                    for (var k = 0; k < dtLen; k++) {
                                        htmlBlock += ' data-' + blockContent[_i2].data[k].item + '="' + blockContent[_i2].data[k].value + '"';
                                    }
                                }
                                htmlBlock += '>';
                            } else if (blockContent[_i2].input_obj === 'radio') {
                                htmlBlock += '<input';
                                htmlBlock += ' type="radio"';
                                if (blockContent[_i2].class !== '') {
                                    htmlBlock += ' class="' + blockContent[_i2].class + '"';
                                }
                                if (blockContent[_i2].obj_label !== '') {
                                    htmlBlock += ' ' + blockContent[_i2].obj_label;
                                }
                                if (blockContent[_i2].obj_id !== '') {
                                    htmlBlock += ' id="' + blockContent[_i2].obj_id + '" name="' + blockContent[_i2].obj_id + '"';
                                }
                                if (blockContent[_i2].options !== null) {
                                    opLen = blockContent[_i2].options.length;
                                    for (j = 0; j < opLen; j++) {
                                        htmlBlock += ' ' + blockContent[_i2].options[j].item + '="' + blockContent[_i2].options[j].value + '"';
                                        if (blockContent[_i2].options[j].default !== undefined) {
                                            htmlBlock += ' ' + blockContent[_i2].options[j].default;
                                        }
                                    }
                                }
                                if (blockContent[_i2].data !== null) {
                                    dtLen = blockContent[_i2].data.length;
                                    for (k = 0; k < dtLen; k++) {
                                        htmlBlock += ' data-' + blockContent[_i2].data[k].item + '="' + blockContent[_i2].data[k].value + '"';
                                    }
                                }
                                htmlBlock += '>';
                            } else if (blockContent[_i2].input_obj === 'select') {
                                htmlBlock += '<select';
                                if (blockContent[_i2].class !== '') {
                                    htmlBlock += ' class="form-control ' + blockContent[_i2].class + '"';
                                }
                                if (blockContent[_i2].obj_label !== '') {
                                    htmlBlock += ' ' + blockContent[_i2].obj_label;
                                }
                                if (blockContent[_i2].obj_id !== '') {
                                    htmlBlock += ' id="' + blockContent[_i2].obj_id + '" name="' + blockContent[_i2].obj_id + '"';
                                    if (blockContent[_i2].data !== null) {
                                        dtLen = blockContent[_i2].data.length;
                                        for (k = 0; k < dtLen; k++) {
                                            htmlBlock += ' data-' + blockContent[_i2].data[k].item + '="' + blockContent[_i2].data[k].value + '"';
                                        }
                                    }
                                }
                                htmlBlock += '>';
                                if (blockContent[_i2].options !== null) {
                                    opLen = blockContent[_i2].options.length;
                                    for (j = 0; j < opLen; j++) {
                                        htmlBlock += '<option';
                                        htmlBlock += ' ' + blockContent[_i2].options[j].item + '="' + blockContent[_i2].options[j].value + '"';
                                        if (blockContent[_i2].options[j].default !== undefined) {
                                            htmlBlock += ' ' + blockContent[_i2].options[j].default;
                                        }
                                        htmlBlock += '>' + blockContent[_i2].options[j].label;
                                        htmlBlock += '</option>';
                                    }
                                }
                                htmlBlock += '</select>';
                            }
                            if (blockContent[_i2].append !== '') {
                                htmlBlock += blockContent[_i2].append;
                            }
                            if (blockContent[_i2].wrap === true) {
                                htmlBlock += '</div>';
                            }
                            htmlBlock += '</div>';
                        }
                        if (_i2 % 2 === 1) {
                            htmlBlock += '</div>';
                            if (blockContent[_i2].wrap_group === true) {
                                htmlBlock += '</div>';
                            }
                        }
                    } else {
                        htmlBlock += blockContent[_i2].inject_code;
                    }
                }
                htmlBlock += '</fieldset>';
                htmlBlock += '</form></div>';
            }
        });
    },

    /**
     * switches the page builder mode from
     * Hero builder mode to Hello Bar
     * builder mode
     * @param {String} va Can be 'hello' or 'hero'. If null or undefined, defaults to 'hero'
     * @constructor
     */
    switchModes: function switchModes(va) {
        if (va === 'hello') {
            $('*[data-role="hero"]').css('display', 'none');
            $('*[data-role="hello"]').css('display', 'block');
            pfExport = 'hello';
            $('.submit_json').attr('data-nmode', 'hello');
            core.panelAlert('Switched to Hello Banner Creation mode', 'good');
        } else {
            $('*[data-role="hello"]').css('display', 'none');
            $('*[data-role="hero"]').attr('style', '');
            pfExport = 'hero';
            $('.submit_json').attr('data-nmode', 'hero');
            core.panelAlert('Switched to Hero Banner Creation mode', 'good');
        }
    },

    /**
     * reads and/or sets the html theme data attribute
     * from the local storage item
     * @constructor
     */
    initializeTheme: function initializeTheme() {
        if (window.localStorage) {
            var tm = localStorage.getItem(app.storage.t);
            if (tm === null || tm === undefined) {
                $('html').attr(app.handlers.t, 'light');
            } else {
                $('html').attr(app.handlers.t, tm);
            }
        } else {
            $('html').attr(app.handlers.t, 'light');
        }
    },

    /**
     * Initialize the help view by loading items
     * from the help.json file
     * @constructor
     */
    initHelp: function initHelp() {
        $.ajax({
            type: app.methods.g,
            url: 'data/help.json',
            success: function success(data) {
                for (var _h = 0; _h < data.items.length; _h++) {
                    if (_h > 0) {
                        var push = 'push_block';
                    } else {
                        push = '';
                    }
                    $('.help-items').append('<li><a class="helpItem" data-target="' + _h + '">' + data.items[_h].title + '</a></li>');
                    $('.help_panel_holder').append('<div class="help_item" id="hlp' + _h + '" data-helper="' + _h + '"><h4 class="' + push + '">' + data.items[_h].title + '</h4>' + data.items[_h].block + '</div>');
                }
            },
            error: function error() {
                core.panelAlert('Unable to load Help Contents from JSON source', 'error');
            }
        });
    },

    /**
     * sets head section items that display in a button model
     * the locally saved hero items for rapid translation of
     * the JSON data
     * @constructor
     */
    setHeadSec: function setHeadSec() {
        try {
            var isReady = localStorage.getItem(app.storage.n);
            if (isReady !== null) {
                $(app.objects.l).css('display', 'inline-block');
                $('#import_json').css('display', 'block');
                $('.lsLoad').find('li').remove();
                var a = localStorage.getItem(app.storage.n).split(',');
                var long = a.length;
                if (long > 1) {
                    for (var _i3 = 0; _i3 < long; _i3++) {
                        if (a[_i3] !== '') {
                            $('.lsLoad').append('<li><a href="#" class="loadItem" ' + app.handlers.i + '="' + a[_i3] + '">' + a[_i3] + '</a></li>');
                        }
                    }
                } else {
                    $(app.objects.l).hide();
                }
            } else {
                $(app.objects.l).css('display', 'none');
                $('#import_json').css('display', 'none');
            }
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * A useless script that runs at halloween
     * and shows flying bats on the page.
     * @constructor
     */
    launchBats: function launchBats() {
        var r = Math.random;
        var n = 0;
        var d = document;
        var w = window;
        var i = d.createElement('img');
        var z = d.createElement('div');
        var zs = z.style;
        var a = w.innerWidth * r();
        var b = w.innerHeight * r();
        z.className = 'oooobats';
        zs.position = "fixed";
        zs.left = 0;
        zs.top = 0;
        zs.opacity = 0;
        z.appendChild(i);
        i.src = 'data:image/gif;base64,R0lGODlhMAAwAJECAAAAAEJCQv///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAQACACwAAAAAMAAwAAACdpSPqcvtD6NcYNpbr4Z5ewV0UvhRohOe5UE+6cq0carCgpzQuM3ut16zvRBAH+/XKQ6PvaQyCFs+mbnWlEq0FrGi15XZJSmxP8OTRj4DyWY1lKdmV8fyLL3eXOPn6D3f6BcoOEhYaHiImKi4yNjo+AgZKTl5WAAAIfkECQEAAgAsAAAAADAAMAAAAnyUj6nL7Q+jdCDWicF9G1vdeWICao05ciUVpkrZIqjLwCdI16s+5wfck+F8JOBiR/zZZAJk0mAsDp/KIHRKvVqb2KxTu/Vdvt/nGFs2V5Bpta3tBcKp8m5WWL/z5PpbtH/0B/iyNGh4iJiouMjY6PgIGSk5SVlpeYmZqVkAACH5BAkBAAIALAAAAAAwADAAAAJhlI+py+0Po5y02ouz3rz7D4biSJbmiabq6gCs4B5AvM7GTKv4buby7vsAbT9gZ4h0JYmZpXO4YEKeVCk0QkVUlw+uYovE8ibgaVBSLm1Pa3W194rL5/S6/Y7P6/f8vp9SAAAh+QQJAQACACwAAAAAMAAwAAACZZSPqcvtD6OctNqLs968+w+G4kiW5omm6ooALeCusAHHclyzQs3rOz9jAXuqIRFlPJ6SQWRSaIQOpUBqtfjEZpfMJqmrHIFtpbGze2ZywWu0aUwWEbfiZvQdD4sXuWUj7gPos1EAACH5BAkBAAIALAAAAAAwADAAAAJrlI+py+0Po5y02ouz3rz7D4ZiCIxUaU4Amjrr+rDg+7ojXTdyh+e7kPP0egjabGg0EIVImHLJa6KaUam1aqVynNNsUvPTQjO/J84cFA3RzlaJO2495TF63Y7P6/f8vv8PGCg4SFhoeIg4UQAAIfkEBQEAAgAsAAAAADAAMAAAAnaUj6nL7Q+jXGDaW6+GeXsFdFL4UaITnuVBPunKtHGqwoKc0LjN7rdes70QQB/v1ykOj72kMghbPpm51pRKtBaxoteV2SUpsT/Dk0Y+A8lmNZSnZlfH8iy93lzj5+g93+gXKDhIWGh4iJiouMjY6PgIGSk5eVgAADs=';
        d.body.appendChild(z);

        function R(o, m) {
            return Math.max(Math.min(o + (r() - .5) * 400, m - 50), 50);
        }

        function A() {
            var x = R(a, w.innerWidth);
            var y = R(b, w.innerHeight);
            var d = 5 * Math.sqrt((a - x) * (a - x) + (b - y) * (b - y));
            zs.opacity = n;
            n = 1;
            zs.transition = zs.webkitTransition = d / 1e3 + 's linear';
            zs.transform = zs.webkitTransform = 'translate(' + x + 'px,' + y + 'px)';
            i.style.transform = i.style.webkitTransform = a > x ? '' : 'scaleX(-1)';
            a = x;
            b = y;
            setTimeout(A, d);
        }

        setTimeout(A, r() * 3e3);
    },
    killBats: function killBats() {
        /**
         * Removes the flying bats from the dom
         */
        $('.oooobats').remove();
        $('.batsToggle').attr('data-status', 'allGone').html('Let In The Bats');
    },

    /**
     * Checks if page items have been moved
     * and resets them to their original position
     * based on the numeric value of their ID
     * @constructor
     */
    resetItems: function resetItems() {
        if ($(app.objects.re).length > 0) {
            $(app.objects.w).find(app.objects.cl).sort(function (a, b) {
                return $(a).attr('id').replace('entry', '') - $(b).attr('id').replace('entry', '');
            }).appendTo(app.objects.w);
            $(app.objects.re).remove();
            core.panelAlert('Items reset to their original position', 'good');
        } else {
            core.panelAlert('All items are in their original position', 'error');
        }
    },

    /**
     * Populates the load saved data from
     * localstorage item and presents it
     * in a dropdown modal
     * @constructor
     */
    choseLocalSave: function choseLocalSave() {
        try {
            $('#loadandsave-zone').attr(app.handlers.r, 'load').css('display', 'block');
            var a = localStorage.getItem(app.storage.n);
            var target = $('.lsOptions');
            if (a !== null || a !== undefined) {
                var _b = a.split(',');
                var bLen = _b.length;
                $('.lsOptions').find('option').remove();
                $(target).append('<option value="null">SELECT</option>');
                for (var _i4 = 0; _i4 < bLen; _i4++) {
                    $(target).append('<option value="' + _b[_i4] + '">' + _b[_i4] + '</option>');
                }
            } else {
                $(target).append('<option value="null">No Local Storage Found</option>');
            }
        } catch (e) {}
    },

    /**
     * Executes a save of the json data into a localstorage
     * object
     * @param {String} method If method is 'do' or empty, object will be marked to save. If method is 'reset', localstorage object will be flushed
     * @constructor
     */
    doLocalSave: function doLocalSave(method) {
        if (method === 'do' || method === null) {
            $('#loadandsave-zone').attr('data-reason', 'save').css('display', 'block');
        } else if (method === 'reset') {
            localStorage.setItem('pgb_SavedNode_LS', "");
            for (var _i5 = 0, len = localStorage.length; _i5 < len; _i5++) {
                var key = localStorage.key(_i5);
                if (key.includes('pgb_SavedNode_') && !key.includes('pgb_SavedNode_LS')) {
                    localStorage.removeItem(key);
                }
            }
        }
    },

    /**
     * Checks the users scroll position on the
     * window and displays a progress bar
     * below the main menu navs
     * @param {String} meth A declares the method as window height, B declares the method as window innerHeight
     * @constructor
     */
    scrollState: function scrollState(meth) {
        var winHeight = $(window).height();
        var docHeight = $(document).height();
        var progressBar = $('progress');
        var max = void 0;
        var value = void 0;
        max = docHeight - winHeight;
        progressBar.attr('max', max);
        if (meth === 'a') {
            winHeight = $(window).height(), docHeight = $(document).height();

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
    OpenInNewTab: function OpenInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    },

    /**
     * Adds multiple hero items to the current
     * instance
     * @param {Number} num How may new objects should the script create
     * @constructor
     */
    addMulti: function addMulti(num) {
        for (var _i6 = 0; _i6 < num; _i6++) {
            core.addItems();
        }
        core.panelAlert('Items Added', 'good');
    },

    /**
     * Animates the help item click to bring
     * into view the correct help item
     * @param {Number} a Defines which form item the function will jump to.
     * @constructor
     */
    jumpToHelper: function jumpToHelper(a) {
        $('.help_panel_holder').animate({
            scrollTop: $(app.objects.hi + '[data-helper="' + a + '"]').offset().top,
            duration: app.animation.d.min
        });
        $(app.objects.hi).animate({
            opacity: 0.4,
            duration: app.animation.d.min
        });
        $(app.objects.hi + '[data-helper="' + a + '"]').animate({
            opacity: 1,
            duration: app.animation.d.min
        });
    },

    /**
     * Saves a json node to localStorage
     * @param {String} val Defines the object position in the localStorage object
     * @param {String} name Defines the node name to be stored in the localStorag
     * @constructor
     */
    saveNodeToLS: function saveNodeToLS(val, name) {
        if (window.localStorage) {
            if (localStorage.getItem('pgb_SavedNode_LS') === null || localStorage.getItem('pgb_SavedNode_LS') === undefined) {
                localStorage.setItem('pgb_SavedNode_LS', "");
            }
            var getList = localStorage.getItem('pgb_SavedNode_LS');
            var getListLen = getList.split(',').length;
            if (getListLen > 0) {
                var _newList = getList + ',' + name;
            } else {
                newList = name;
            }
            localStorage.setItem('pgb_SavedNode_LS', newList);
            localStorage.setItem('pgb_SavedNode_' + name, val);
            core.panelAlert('Data Saved To Local Storage', 'good');
        }
    },

    /**
     * Add new items to the form. Duplicates a
     * form block
     * @constructor
     */
    addItems: function addItems() {
        if ($(app.objects.o).css('display') === 'block') {
            $(app.objects.o).css('display', 'none');
        }

        var // Checks to see how many "duplicatable" input fields we currently have
        num = $(app.objects.cl).length; // create the new element via clone(), and manipulate it's ID using newNum value

        var // The numeric ID of the new input field being added, increasing by 1 each time
        newNum = new Number(num + 1);

        var newElem = $(app.objects.e + num).clone().attr('id', 'entry' + newNum);

        newElem.find('.heading-reference').attr('id', 'ID' + newNum + '_reference').attr('name', 'ID' + newNum + '_reference').html('<div class="btn-group bigboy"><button type="button" class="btn btn-info">ITEM <span class="label label-default">' + newNum + '</span></button><button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu"><li><a class="previewItem large" href="javascript:;" data-hero="' + newNum + '" data-role="hero">Preview Large</a></li><li><a class="previewItem small" href="javascript:;" data-hero="' + newNum + '" data-role="hero">Preview Small</a></li></ul></div>');
        newElem.attr(app.handlers.s, newNum);

        newElem.find('.label_ttl').attr('for', 'ID' + newNum + '_title');
        newElem.find('.select_ttl:not(".objButtonPopupLink")').attr('id', 'ID' + newNum + '_title').attr('name', 'ID' + newNum + '_title').val('');

        newElem.find('.label_fn').attr('for', 'ID' + newNum + '_first_name');
        newElem.find('.input_fn').attr('id', 'ID' + newNum + '_first_name').attr('name', 'ID' + newNum + '_first_name').val('');

        newElem.find('.label_ln').attr('for', 'ID' + newNum + '_last_name');
        newElem.find('.input_ln').attr('id', 'ID' + newNum + '_last_name').attr('name', 'ID' + newNum + '_last_name').val('');

        newElem.find('.label_checkboxitem').attr('for', 'ID' + newNum + '_checkboxitem');
        newElem.find('.input_checkboxitem').attr('id', 'ID' + newNum + '_checkboxitem').attr('name', 'ID' + newNum + '_checkboxitem').val([]);

        newElem.find('.radio:nth-child(1)').attr('for', 'ID' + newNum + '_radioitemA').find('.input_radio').attr('id', 'ID' + newNum + '_radioitemA').attr('name', 'ID' + newNum + '_radioitem').val([]);
        newElem.find('.radio:nth-child(2)').attr('for', 'ID' + newNum + '_radioitemB').find('.input_radio').attr('id', 'ID' + newNum + '_radioitemB').attr('name', 'ID' + newNum + '_radioitem').val([]);

        newElem.find('.label_email').attr('for', 'ID' + newNum + '_email_address');
        newElem.find('.input_email').attr('id', 'ID' + newNum + '_email_address').attr('name', 'ID' + newNum + '_email_address').val('');

        newElem.find('.label_twt').attr('for', 'ID' + newNum + '_twitter_handle');
        newElem.find('.input_twt').attr('id', 'ID' + newNum + '_twitter_handle').attr('name', 'ID' + newNum + '_twitter_handle').val('');
        newElem.find(app.objects.c).attr(app.handlers.d, newNum);
        newElem.find('.check_alt_image').attr(app.handlers.d, newNum);
        newElem.find('.input-group-addon.image_count').attr('style', '').html('Shopify CDN');
        newElem.find('.mod-radio').attr('style', '');

        $('.clonedInput:last').after(newElem);
        $('#ID' + newNum + '_title').focus();

        $('#btnDel').attr('disabled', false);

        if (newNum === 10) $('.btnAdd').attr('disabled', true).prop('value', "You've reached the limit"); // value here updates the text in the 'add' button when the limit is reached
        var dateNow = new Date();
        $('.date_obj').datetimepicker({ format: 'MM/DD/YYYY HH:mm' });
        $('.snapTo').append('<li><a href="#" class="gotoItem" ' + app.handlers.i + '="' + newNum + '">Item ' + newNum + '</a></li>');
        $(app.objects.r).animate({
            scrollTop: $(app.objects.e + newNum).offset().top - 60
        }, app.animation.d.min);
        $('.btn-group.bigboy:not(.helpMePlease)').last().find('ul').append('<li class="divider" data-role="hero"></li><li><a class="removeThisItem" ' + app.handlers.i + '="' + newNum + '" href="javascript:;">Remove</a></li><li class="divider"></li><li><a class="moveUpThisItem" ' + app.handlers.i + '="' + newNum + '" href="javascript:;">Move Up<span class="glyphicon glyphicon-arrow-up"></span></a></li><li><a class="moveDownThisItem" ' + app.handlers.i + '="' + newNum + '" href="javascript:;">Move Down<span class="glyphicon glyphicon-arrow-down"></span></a></li><li class="divider" data-role="hero"></li><li data-role="hero"><a class="addConditions" data-hero="1" data-role="hero" data-lang-id="action17" data-version="3.2.1">Toggle Conditions</a></li><li data-role="hero"><a class="hideItem" data-hero="1" data-role="hero" data-lang-id="action18" data-version="3.2.1">Hide Item</a></li>');
        $(app.objects.e + newNum).find('.mod-radio').find('input').first().prop('checked', true);
        core.scrollState('a');
        core.panelAlert('Item Added', 'good');
    },

    /**
     * Delete items from the form instance and
     * removes them from the dom reference
     * @param {String} elem Defines the DOM element that is targeted for deletion
     * @returns {boolean}
     * @constructor
     */
    deleteItems: function deleteItems(elem) {
        if ($(app.objects.cl).length > 1) {
            if ($(app.objects.o).css('display') === 'block') {
                $(app.objects.o).css('display', 'none');
            }
            //var num = $(app.objects.cl).length;
            if (elem === 'last') {
                var a = $('.clonedInput:last').attr('id');
                var _b2 = a.replace('entry', '');
                $('#' + a).slideUp('slow', function () {
                    $(this).remove();
                    // if only one element remains, disable the "remove" button
                    if (elem - 1 === 1) $('.btnDel').attr('disabled', true);
                    // enable the "add" button
                    $('.btnAdd').attr('disabled', false).prop('value', "add section");
                });
                $('.snapTo').find('.gotoItem[' + app.handlers.i + '="' + _b2 + '"]').parent().remove();
                core.scrollState('a');
            } else {
                $(app.objects.e + elem).slideUp('slow', function () {
                    $(this).remove();
                    // if only one element remains, disable the "remove" button
                    if (elem - 1 === 1) $('.btnDel').attr('disabled', true);
                    // enable the "add" button
                    $('.btnAdd').attr('disabled', false).prop('value', "add section");
                });
                $('.snapTo').find('.gotoItem[' + app.handlers.i + '="' + elem + '"]').parent().remove();
                core.scrollState('a');
            }
            core.panelAlert('Last Item Removed', 'good');
            return false; // Removes the last section you added
        }
    },

    /**
     * Validate the JSON that has been exported
     * when the user clicks the button
     * @constructor
     */
    validateJSON: function validateJSON() {
        $("#output_code").validateJSON({
            compress: false,
            reformat: true,
            onSuccess: function onSuccess(json) {
                core.panelAlert('JSON Code is valid', 'good');
            },
            onError: function onError(error) {
                core.panelAlert('A JSON error has been encountered. The line on which the error has occured is highlighted.', 'error');
            }
        });
    },

    /**
     * Generic error handler that checks if certain
     * form objects are filled and outputs a dropdown
     * list with anchor links
     * @constructor
     */
    errorHandler: function errorHandler() {
        var errorLog = [];
        var a = JSON.parse($(app.objects.o + '[' + app.handlers.r + '="output"]').find('textarea').val()).hero;
        var b = a.length;
        var c = 0;
        for (var _i7 = 0; _i7 < b; _i7++) {
            if (a[_i7].date.start === '') {
                errorLog.push({ form: _i7 + 1, obj: "Start Date", prob: "No Value. FATAL", elem: "objStart", die: true });
                c++;
            }
            if (a[_i7].date.end === '') {
                errorLog.push({ form: _i7 + 1, obj: "End Date", prob: "No Value. FATAL", elem: "objEnd", die: true });
                c++;
            }
            if (a[_i7].title.en === '') {
                errorLog.push({ form: _i7 + 1, obj: "English Title", prob: "No Value", elem: "objTitleEN", die: false });
                c++;
            }
            if (a[_i7].title.fr === '') {
                errorLog.push({ form: _i7 + 1, obj: "French Title", prob: "No Value", elem: "objTitleFR", die: false });
                c++;
            }
            if (a[_i7].text.en === '') {
                errorLog.push({ form: _i7 + 1, obj: "English Text", prob: "No Value", elem: "objTextEN", die: false });
                c++;
            }
            if (a[_i7].text.fr === '') {
                errorLog.push({ form: _i7 + 1, obj: "French Text", prob: "No Value", elem: "objTextFR", die: false });
                c++;
            }
            if (a[_i7].button.label.en === '') {
                errorLog.push({
                    form: _i7 + 1,
                    obj: "English Button Label",
                    prob: "No Value",
                    elem: "objButtonEN",
                    die: false
                });
                c++;
            }
            if (a[_i7].button.label.fr === '') {
                errorLog.push({
                    form: _i7 + 1,
                    obj: "French Button Label",
                    prob: "No Value",
                    elem: "objButtonFR",
                    die: false
                });
                c++;
            }
            if (a[_i7].button.url === '') {
                errorLog.push({ form: _i7 + 1, obj: "Button URL", prob: "No Value", elem: "objButtonLink", die: false });
                c++;
            }
            if (a[_i7].image.url === '') {
                errorLog.push({ form: _i7 + 1, obj: "Image URL", prob: "No Value", elem: "objImageMain", die: false });
                c++;
            }
        }
        errorLog.reverse(); //present the errors in the right direction
        if (c > 0) {
            $(app.objects.el).css('display', 'inline-block');
            $('.errorListing').empty();
            for (var j = 0; j < errorLog.length; j++) {
                $('.errorListing').prepend('<li><a href="javascript:;" class="errorItem ' + errorLog[j].die + '" ' + app.handlers.i + '="' + j + '">Item ' + errorLog[j].form + ' : ' + errorLog[j].obj + ' : ' + errorLog[j].prob + '</a></li>');
                core.registerErrorButtons(errorLog[j].form, errorLog[j].elem, j, errorLog[j].prob, errorLog[j].die);
            }
            $(app.objects.el).find('button').html('Warnings<span class="label label-default numerrors">' + errorLog.length + '</span><span class="caret"></span>');
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
    registerErrorButtons: function registerErrorButtons(num, elem, item, prob, die) {
        $(app.objects.bo).on('click', '.errorItem[' + app.handlers.i + '="' + item + '"]', function () {
            if (die === true) {
                $(app.objects.e + num).find('.' + elem).css('background-color', 'rgba(238, 54, 54, 0.3)').css('border-color', 'red').attr('placeholder', 'Leaving this field empty will cause the hero banner function to fail');
            } else {
                $(app.objects.e + num).find('.' + elem).css('background-color', 'rgba(238, 162, 54, 0.3)');
            }
            $(app.objects.o).hide();
            $(app.objects.r).css('overflow', 'auto');
            $(app.objects.r).animate({
                scrollTop: $(app.objects.e + num + ' .' + elem).offset().top - 100
            }, app.animation.d.min);
            if ($('.' + elem).parent().attr('class') !== 'input_holders') {
                $('.' + elem).wrap('<div class="input_holders"></div>').parent().append('<div class="input_alerts" title="' + prob + '"><span class="glyphicon glyphicon-exclamation-sign"></span></div>');
            }
        });
    },

    /**
     * Reads JSON that is pasted in the form in
     * translate JSON mode and prepares and formats
     * it to be output to the corresponding
     * form objects
     * @param {Boolean} storage Defines whether to store the data in localStorage when the JSON is traversed
     * @param {String} nodeName Defines the name to be used. Will be appended to the localStorage object's save name
     * @constructor
     */
    loadFromServer: function loadFromServer(path) {
        var xPath = path === 'tlh' ? 'https://cdn.shopify.com/s/files/1/0050/3522/t/22/assets/banners.json' : 'https://cdn.shopify.com/s/files/1/1230/9376/t/2/assets/ALTI-banners.json';
        $.ajax({
            url: xPath,
            success: function success(data) {
                var badString = JSON.stringify(data);
                var goodString = badString.slice(0, -1);
                goodString = '{' + goodString.substr(1) + '}';
                core.traverseJSON(false, '', goodString);
            }
        });
    },
    traverseJSON: function traverseJSON(storage, nodeName, fromAJAX) {
        if ($(app.objects.b + ' textarea').val() !== '' || localStorage.getItem('pgb_SavedNode') !== '' && fromAJAX === undefined) {
            if (storage === false) {
                var _ctc = $(app.objects.b + ' textarea').val();
                if (_ctc === '') {
                    core.panelAlert('Form Does Not Contain JSON Data', 'error');
                }
            } else if (storage === true && nodeName !== '') {
                if (localStorage.getItem('pgb_SavedNode_' + nodeName) !== undefined && localStorage.getItem('pgb_SavedNode_' + nodeName) !== null && localStorage.getItem('pgb_SavedNode_' + nodeName) !== '') {
                    var _ctc2 = localStorage.getItem('pgb_SavedNode_' + nodeName).replace(',null', '');
                } else {
                    core.panelAlert('No Data Found In Local Storage', 'error');
                }
            }
            var prs = JSON.parse(ctc);
            var obj = prs.hero;
            var len = obj.length;
            var formItems = $(app.objects.cl).length;
            var formArray = [];
            if (formItems < len) {
                var _build = true;
                var _bItems = len - formItems;
            }
            for (var _h2 = 0; _h2 < bItems; _h2++) {
                core.addItems();
            }
            for (var _i8 = 0; _i8 < len; _i8++) {
                formArray.push(obj[_i8]);
            }
            core.jsonToForm(formArray);
            core.panelAlert('Data Translated To Form', 'good');
        } else if (fromAJAX !== '') {
            if (storage === false) {
                var _ctc3 = fromAJAX;
                if (_ctc3 === '') {
                    core.panelAlert('Form Does Not Contain JSON Data', 'error');
                }
            } else if (storage === true && nodeName !== '') {
                if (localStorage.getItem('pgb_SavedNode_' + nodeName) !== undefined && localStorage.getItem('pgb_SavedNode_' + nodeName) !== null && localStorage.getItem('pgb_SavedNode_' + nodeName) !== '') {
                    var _ctc4 = localStorage.getItem('pgb_SavedNode_' + nodeName).replace(',null', '');
                } else {
                    core.panelAlert('No Data Found In Local Storage', 'error');
                }
            }
            var _prs = JSON.parse(ctc);
            var _obj = _prs.hero;
            var _len = _obj.length;
            var _formItems = $(app.objects.cl).length;
            var _formArray = [];
            if (_formItems < _len) {
                build = true, bItems = _len - _formItems;
            }
            for (h = 0; h < bItems; h++) {
                core.addItems();
            }
            for (i = 0; i < _len; i++) {
                _formArray.push(_obj[i]);
            }
            core.jsonToForm(_formArray);
            core.panelAlert('Data Translated To Form', 'good');
        } else {
            core.panelAlert('Please generate or paste JSON before using this function', 'error');
        }
    },

    /**
     * Takes formatted JSON sent from the TraverseJSON
     * function and outputs it to the mapped form
     * element
     * @param {Object} aCode Param is a JSON formatted object. Object can not be a string. Pass the string through JSON.parse first
     * @constructor
     */
    jsonToForm: function jsonToForm(aCode) {
        var jsLen = aCode.length;
        for (var _i9 = 0; _i9 < jsLen; _i9++) {
            var jsForm = 'entry' + (_i9 + 1);
            var formEl = '#' + jsForm;
            $(formEl).find('.objStart').val(aCode[_i9].date.start);
            $(formEl).find('.objEnd').val(aCode[_i9].date.end);
            $(formEl).find('.objTitleEN').val(aCode[_i9].title.en);
            $(formEl).find('.objTitleFR').val(aCode[_i9].title.fr);
            $(formEl).find('.objTitleCol').val(aCode[_i9].title.color);
            $(formEl).find('.objTextEN').val(aCode[_i9].text.en);
            $(formEl).find('.objTextFR').val(aCode[_i9].text.fr);
            try {
                if (aCode[_i9].conditions.en !== null && aCode[_i9].conditions.en !== undefined && aCode[_i9].conditions.en !== '') {
                    $(formEl).find('.objConditionsEN').val(aCode[_i9].conditions.en);
                } else {
                    $(formEl).find('.objConditionsEN').val('');
                }
                if (aCode[_i9].conditions.fr !== null && aCode[_i9].conditions.fr !== undefined && aCode[_i9].conditions.fr !== '') {
                    $(formEl).find('.objConditionsFR').val(aCode[_i9].conditions.fr);
                } else {
                    $(formEl).find('.objConditionsFR').val('');
                }
            } catch (e) {
                console.log(e);
            }
            $(formEl).find('.objImageMain').val(aCode[_i9].image.url);
            $(formEl).find('.objImageAlt').val(aCode[_i9].image.altUrl);
            $(formEl).find('.objButtonEN').val(aCode[_i9].button.label.en);
            $(formEl).find('.objButtonFR').val(aCode[_i9].button.label.fr);
            $(formEl).find('.objButtonLink').val(aCode[_i9].button.url);
            if (aCode[_i9].date.delay === true || aCode[_i9].date.delay === false) {
                window.setTimeout(function () {
                    core.panelAlert('Some delay entries are not numerical. Make sure to set all delay entries to a numerical value manually.', 'error');
                }, 2000);
            } else if (aCode[_i9].date.delay === '' || aCode[_i9].date.delay === null || aCode[_i9].date.delay === undefined || aCode[_i9].date.delay === 'undefined') {
                $(formEl).find('.objDelay').val(0);
            } else {
                $(formEl).find('.objDelay').val(aCode[_i9].date.delay);
            }
            $(formEl).find('.objCountdownShow').val(aCode[_i9].showCountdown);
            $(formEl).find('.objButtonPopup option[value="' + aCode[_i9].popUpLink + '"]').attr('selected', true).prop('selected', true);
            $(formEl).find('.objButtonPopupLink option[value="' + aCode[_i9].button.popUpLinkID + '"]').attr('selected', true).prop('selected', true);
            $(formEl).find('.objCountdownShow option[value="' + aCode[_i9].showCountdown + '"]').attr('selected', true).prop('selected', true);
            $(formEl).find('.objHeroSticky option[value="' + aCode[_i9].sticky + '"]').attr('selected', true).prop('selected', true);
            $(formEl).find('.objHeroTitleShow option[value="' + aCode[_i9].title.showTitle + '"]').attr('selected', true).prop('selected', true);
            $(formEl).find('.objHeroSubtitleShow option[value="' + aCode[_i9].text.showSubTitle + '"]').attr('selected', true).prop('selected', true);
            $(formEl).find('.objHeroPromote option[value="' + aCode[_i9].promote + '"]').attr('selected', true).prop('selected', true);
            if (aCode[_i9].active == true) {
                $(formEl).find('.mod-radio').find('input[type="radio"]').first().prop('checked', true);
                $(formEl).find('.mod-radio').find('input[type="radio"]').last().prop('checked', false);
            } else if (aCode[_i9].active == false) {
                $(formEl).find('.mod-radio').css('border-left-width', '6px').css('border-left-style', 'solid').css('border-left-color', 'rgb(253, 0, 0)');
                $(formEl).find('.mod-radio').find('input[type="radio"]').first().prop('checked', false);
                $(formEl).find('.mod-radio').find('input[type="radio"]').last().prop('checked', true);
            }
            if ($(app.objects.o).css('display') == 'block') {
                $(app.objects.o).hide();
                $(app.objects.r).css('overflow', 'auto');
            }
            $(app.objects.r).css('overflow', 'auto');
        }
    },

    /**
     * Serializes the form data in a JSON format
     * and passes the data to the outputJson
     * function
     * @param {String} meth
     * @param {String} name
     * @param {String} mode
     * @constructor
     */
    prepareJSON: function prepareJSON(meth, name, mode) {
        var c = [];
        if (mode === 'hero' || mode === '' || mode === null || mode === undefined) {
            $('.clonedInput form fieldset[data-role="hero"]').each(function () {
                var a = $(this).serializeArray();
                c.push(a);
            });
            if (meth === 'full') {
                core.outputJson(c, meth, null, mode);
            } else if (meth === 'save') {
                core.outputJson(c, meth, name, 'hero');
            }
        } else if (mode === 'hello') {
            $('.clonedInput form fieldset[data-role="hello"]').each(function () {
                var a = $(this).serializeArray();
                c.push(a);
            });
            core.outputJson(c, 'full', null, 'hello');
        }
    },

    /**
     * Receives the serialized data parsed in the
     * prepareJSON function and outputs JSON
     * formatted code to the output view
     * @param {Object} aCode
     * @param {String} meth
     * @param {String} name
     * @param {String} mode
     * @constructor
     */
    outputJson: function outputJson(aCode, meth, name, mode) {
        try {
            var nodes = aCode.length;
            var lastItem = nodes - 1;
            if (mode === 'hello') {
                var page_model = '{\n    "hello": [\n';
                for (var i = 0; i < nodes; i++) {
                    page_model += '       {\n        "helloItem": "hello' + i + '",';
                    page_model += '\n        "date": {';
                    page_model += '\n          "start": "' + aCode[i][0].value + '",';
                    page_model += '\n          "end": "' + aCode[i][1].value + '"';
                    page_model += '\n        },';
                    page_model += '\n        "text": {';
                    page_model += '\n          "en": "' + aCode[i][2].value.trim().replace(/"/g, '') + '",';
                    page_model += '\n          "fr": "' + aCode[i][3].value.trim().replace(/"/g, '') + '"';
                    page_model += '\n        }';
                    if (i < lastItem) {
                        page_model += '\n},\n';
                    }
                }
                page_model += '\n      }\n   ]\n}';
            } else if (mode === 'hero') {
                page_model = '{\n    "hero": [\n';
                for (i = 0; i < nodes; i++) {
                    //mapping
                    if (aCode[i][15].value === '' || aCode[i][15].value === null || aCode[i][15].value === undefined) {
                        var elemAAAA = 'null';
                    } else {
                        elemAAAA = aCode[i][15].value;
                    }
                    if (aCode[i][16].value === '' || aCode[i][16].value === null || aCode[i][16].value === undefined) {
                        var elemA = true;
                    } else {
                        elemA = aCode[i][16].value;
                    }
                    if (aCode[i][17].value === '' || aCode[i][17].value === null || aCode[i][17].value === undefined) {
                        var elemAA = true;
                    } else {
                        elemAA = aCode[i][17].value;
                    }
                    if (aCode[i][18].value === '' || aCode[i][18].value === null || aCode[i][18].value === undefined) {
                        var elemAAA = true;
                    } else {
                        elemAAA = aCode[i][18].value;
                    }
                    if (aCode[i][14].value === '' || aCode[i][14].value === null || aCode[i][14].value === undefined) {
                        var elemB = false;
                    } else {
                        elemB = aCode[i][14].value;
                    }
                    if (aCode[i][19].value === '' || aCode[i][19].value === null || aCode[i][19].value === undefined) {
                        var elemC = false;
                    } else {
                        elemC = aCode[i][19].value;
                    }
                    if (aCode[i][22] !== undefined) {
                        if (aCode[i][22].value === '' || aCode[i][22].value === null || aCode[i][22].value === undefined) {
                            var elemD = true;
                        } else {
                            elemD = aCode[i][22].value;
                        }
                    } else {
                        elemD = true;
                    }
                    if (aCode[i][20] !== undefined) {
                        if (aCode[i][20].value === '' || aCode[i][20].value === null || aCode[i][20].value === undefined) {
                            var elemDD = false;
                        } else {
                            elemDD = aCode[i][20].value;
                        }
                    } else {
                        elemDD = false;
                    }
                    if (aCode[i][21] !== undefined) {
                        if (aCode[i][21].value === '' || aCode[i][21].value === null || aCode[i][21].value === undefined) {
                            var elemE = 0;
                        } else {
                            elemE = aCode[i][21].value;
                        }
                    } else {
                        elemE = 0;
                    }
                    page_model += '{\n        "heroId": "hero-elem' + i + '",';
                    page_model += '\n        "active": ' + elemD + ',';
                    page_model += '\n        "sticky": ' + elemDD + ',';
                    page_model += '\n        "showCountdown": ' + elemA + ',';
                    page_model += '\n        "popUpLink": ' + elemB + ',';
                    page_model += '\n        "date": {';
                    page_model += '\n          "start": "' + aCode[i][0].value + '",';
                    page_model += '\n          "end": "' + aCode[i][1].value + '",';
                    page_model += '\n          "delay": ' + elemE;
                    page_model += '\n        },';
                    page_model += '\n        "title": {';
                    page_model += '\n          "en": "' + aCode[i][2].value.trim() + '",';
                    page_model += '\n          "fr": "' + aCode[i][3].value.trim() + '",';
                    page_model += '\n          "color": "' + aCode[i][4].value + '",';
                    page_model += '\n          "showTitle": ' + elemAA;
                    page_model += '\n        },';
                    page_model += '\n        "text": {';
                    page_model += '\n          "en": "' + aCode[i][5].value.trim() + '",';
                    page_model += '\n          "fr": "' + aCode[i][6].value.trim() + '",';
                    page_model += '\n          "showSubTitle": ' + elemAAA;
                    page_model += '\n        },';
                    page_model += '\n        "conditions": {';
                    page_model += '\n          "en": "' + aCode[i][7].value.trim() + '",';
                    page_model += '\n          "fr": "' + aCode[i][8].value.trim() + '"';
                    page_model += '\n        },';
                    page_model += '\n        "promote": ' + elemC + ',';
                    page_model += '\n        "button": {';
                    page_model += '\n          "label": {';
                    page_model += '\n            "en": "' + aCode[i][11].value.trim() + '",';
                    page_model += '\n            "fr": "' + aCode[i][12].value.trim() + '"';
                    page_model += '\n          },';
                    page_model += '\n        "url": "' + aCode[i][13].value + '",';
                    page_model += '\n        "popUpLinkID": "' + elemAAAA + '"';
                    page_model += '\n        },';
                    page_model += '\n        "image": {';
                    page_model += '\n          "url": "' + aCode[i][9].value + '",';
                    page_model += '\n          "altUrl": "' + aCode[i][10].value + '"';
                    page_model += '\n        }';
                    if (i < lastItem) {
                        page_model += '\n},\n';
                    }
                }
                page_model += '\n      }\n   ]\n}';
            }
            if (meth === 'full') {
                if ($(app.objects.he).css('display') === 'block') {
                    $(app.objects.he).css('display', 'none');
                }
                if ($(app.objects.h).css('display') === 'block') {
                    $(app.objects.h).css('display', 'none');
                }
                if ($(app.objects.ls).css('display') === 'block') {
                    $(app.objects.ls).css('display', 'none');
                }
                $(app.objects.o).attr(app.handlers.r, 'output');
                $(app.objects.o).css('display', 'block');
                $(app.objects.o + ' textarea').val(page_model);
                $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow', 'hidden');
                if (mode === 'hero') {
                    core.errorHandler();
                }
                core.panelAlert('JSON Exported Successfuly', 'good');
            } else {
                core.saveNodeToLS(page_model, name);
            }
        } catch (e) {
            core.panelAlert('An unknown error has occured. Please make sure all required fields are filled.', 'error');
        }
    },

    /**
     *
     * @param {String} testUrl
     * @constructor
     */
    urlExists: function urlExists(testUrl) {
        var http = jQuery.ajax({
            type: "HEAD",
            url: 'https:' + testUrl,
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
    validateImage: function validateImage(type, handler) {
        if (type === 'main') {
            var a = $(app.objects.c + '[' + app.handlers.d + '="' + handler + '"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image').val();
            var aa = $(app.objects.c + '[' + app.handlers.d + '="' + handler + '"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image');
            var aaa = $(app.objects.c + '[' + app.handlers.d + '="' + handler + '"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image').parent().attr('class');
            if (a !== '') {
                var _b3 = core.urlExists(a);
                if (_b3 !== 200) {
                    if (aaa === 'input_holders') {
                        $(aa).next().next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    } else {
                        $(aa).next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    }
                } else if (_b3 === 200) {
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
            var _a = $(app.objects.ca + '[' + app.handlers.d + '="' + handler + '"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image').val();
            var _aa = $(app.objects.ca + '[' + app.handlers.d + '="' + handler + '"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image');
            var _aaa = $(app.objects.ca + '[' + app.handlers.d + '="' + handler + '"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image').parent().attr('class');
            if (_a !== '') {
                b = core.urlExists(_a);
                if (b !== 200) {
                    if (_aaa === 'input_holders') {
                        $(_aa).next().next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    } else {
                        $(_aa).next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    }
                } else if (b === 200) {
                    if (_aaa === 'input_holders') {
                        $(_aa).next().next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    } else {
                        $(_aa).next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    }
                } else {
                    if (_aaa === 'input_holders') {
                        $(_aa).next().next().attr('style', '').html('Shopify CDN');
                    } else {
                        $(_aa).next().attr('style', '').html('Shopify CDN');
                    }
                }
            } else {
                if (_aaa === 'input_holders') {
                    $(_aa).next().next().css('background-color', '#eee').html('Nothing to validate');
                } else {
                    $(_aa).next().css('background-color', '#eee').html('Nothing to validate');
                }
            }
        }
    },

    /**
     *
     * @param {String} heroItem
     * @param {String} mode
     * @param {String} lang
     * @constructor
     */
    previewFeature: function previewFeature(heroItem, mode, lang) {
        var dt = $(app.objects.e + heroItem).find('form').find('fieldset[data-role="hero"]').serializeArray();
        var start = dt[0].value;
        var img = dt[9].value;
        var titleColor = dt[4].value;
        var outputString = void 0;
        console.log(dt);
        if (lang === app.language.e) {
            var _titleText = dt[2].value;
            var _subTitleText = dt[5].value;
            var _buttonLabel = dt[11].value;
            var _endsLabel = 'Ends In';
        } else if (lang === app.language.f) {
            var _titleText2 = dt[3].value;
            var _subTitleText2 = dt[6].value;
            var _buttonLabel2 = dt[12].value;
            var _endsLabel2 = 'Termine dans';
        }
        var buttonLink = dt[11].value;
        var container = app.objects.h;
        var target = '.render_output';
        var sub = dt[16].value;
        var warningString = '<div class="preview_warning" title="The position and size of the background may display differently than on the live site.">Preview may differ from actual site render</div>';
        if (mode === 'small') {
            outputString = '<div class="five columns jose pedro homepage_content event mini-spacers animated fadeIn delay-05s"><div id="event-active-today">';
        } else {
            outputString = '';
        }
        outputString += '<div data-instance="slide-0" data-str="' + img + '"';
        outputString += ' data-promote="true" id="slide-0" class="hero fwidth root-0"><div data-object-pos="false-false" class="bcg skrollable skrollable-between" data-center="background-position: 50% 0px;" data-top-bottom="background-position: 50% -200px;" data-anchor-target="#slide-0"';
        outputString += ' style="background-image: url(' + img + '); background-position: 50% -55.2631578947369px;"><div class="hsContainer"><div class="hsContent center skrollable skrollable-before" data-100-top="opacity: 1" data-25-top="opacity: 0" data-anchor-target="#slide-0 .animated" style="opacity: 1;">';
        outputString += '<div itemscope="" itemtype="http://schema.org/Event" class="animated fadeIn delay-025s hero_head"><p itemprop="startDate" content="' + start + '" class="subtitle timedown is-countdown" id="countdown0" style="opacity:0.9"><span>' + endsLabel + '  <b>11:29:39</b> </span></p>';
        outputString += '<h1 class="headline herobanner" style="color:' + titleColor + '">' + titleText + '</h1>';
        if (sub === 'true') {
            outputString += '<p class="subtitle herobanner">' + subTitleText + '</p>';
        }
        outputString += '<a data-bleed="" href="' + buttonLink + '" class="action_button hero"><span class="trn" data-trn-key="">' + buttonLabel + '</span></a>';
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
    },
    loadAPIparams: function loadAPIparams() {
        var parent = $('.com_API_local');
        var elem = $('.com_API_prog');
        var subElem = $('.com_API_state');
        var width = 10;
        var id = setInterval(frame, 20);
        var loadText = 'Loading Shopify API components';
        var doneText = 'Shopify API successfully loaded';
        $(parent).css('display', 'block');
        $(elem).attr('style', '');
        $(subElem).html(loadText);
        function frame() {
            if (width >= 100) {
                $(elem).css('background-color', '#5cb85c');
                $(subElem).html(doneText);
                clearInterval(id);
                setTimeout("$('.com_API_local').remove()", 1000);
            } else {
                width++;
                $(elem).css('width', width + '%');
            }
        }
    },
    planBify: function planBify() {
        $('.objHeroPromote').find('option[value="true"]').prop('selected', true);
        $('.objHeroSticky').find('option[value="false"]').prop('selected', true);
        core.panelAlert('Form items have been modified to be Plan B compliant', 'good');
    },
    cleanWhitespace: function cleanWhitespace() {
        var a = $('#output_code').val();

        var b = a.replace(/[\t ]+\"/g, '"').replace(/\][\t ]+\[/g, "][").replace(/\}[\t ]+\}/g, '}}').replace(/\}[\t ]+\]/g, "}]").replace(/\"[\t ]+\}/g, '"}').replace(/\"[\t ]+\]/g, '"]').replace(/[\t ]+\}/g, '}').replace(/[\t ]+\{/g, "{").replace(/\:[\t ]+\[/g, ":[").replace(/[\t ]+\:/g, ":").replace(/\:[\t ]+$/g, ":").replace(/\}[\t ]+$/g, "}").replace(/\}[\t ]+$/g, "}").replace(/[\t ]+\]/g, "]").replace(/\n/g, "");

        $('#output_code').val(b);
    },
    cacheClickedItem: function cacheClickedItem(item) {
        if (item.hasClass('childHidden')) {
            item.html('Hide Item').removeClass('childHidden');
            item.parent().parent().parent().parent().parent().find('fieldset[data-role="hero"]').slideToggle(300);
        } else if (!item.hasClass('childHidden')) {
            item.html('Show Item').addClass('childHidden');
            item.parent().parent().parent().parent().parent().find('fieldset[data-role="hero"]').slideToggle(300);
        }
    }
};

$(function () {
    /**
     * Main document ready initialized function
     */
    core.setHeadSec();
    core.initializeTheme();
    core.initHelp();
    core.getVersion(true);
    core.loadAPIparams();
    core.languageManager(app.lang, true);
    window.setInterval(function () {
        core.getVersion(false);
    }, 600000);
    $('.date_obj').datetimepicker({ format: 'MM/DD/YYYY HH:mm' });

    $('.btnAdd').attr('disabled', false);
    // Disable the "remove" button
    $('.btnDel').attr('disabled', true);
    /**
     * event handlers bound to the .on expression
     * so that dynamically generated divs are
     * taken into consideration
     */
    $(app.objects.bo).on('click', '.btnAdd', function () {
        core.addItems();
    }).on('click', '.app_lang_toggle', function () {
        var lng = $('.app_lang_toggle').attr('data-set-lang');
        core.languageManager(lng);
    }).on('click', '.overlay_close', function () {
        $('.overlay_close').parent().parent().hide();
        $(app.objects.r).css('overflow', 'auto');
        $('.overlay_message').css('display', 'none');
    }).on('click', '.select_content', function () {
        var $this = $(app.objects.b + ' textarea');
        $this.select();
        // Work around Chrome's little problem
        $this.mouseup(function () {
            // Prevent further mouseup intervention
            $this.unbind("mouseup");
            return false;
        });
    }).on('click', '.gotoItem', function () {
        var a = $('.gotoItem').data('item');
        $(app.objects.r).animate({
            scrollTop: $(app.objects.e + a).offset().top - 60
        }, app.animation.d.min);
        if ($(app.objects.o).css('display') == 'block') {
            $(app.objects.r).css('overflow', 'auto');
            $('#oapp.objects.output').css('display', 'none');
        }
        if ($(app.objects.he).css('display') == 'block') {
            $(app.objects.he).css('display', 'none');
        }
    }).on('click', '.about_app,.version_number', function (e) {
        window.open("release.html", "_blank", "scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no");
    }).on('click', '.btnAddMulti', function () {
        $('#query-zone').toggle();
        $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min);
        if ($(app.objects.o).css('display') == 'block') {
            $(app.objects.o).css('display', 'none');
        }
        if ($(app.objects.h).css('display') == 'block') {
            $(app.objects.h).css('display', 'none');
        }
        $('.num_select').focus();
    }).on('click', app.objects.c, function (e) {
        var a = $(app.objects.c).data('handler');
        core.validateImage('main', a);
        e.preventDefault();
    }).on('click', '.multiquery_close', function () {
        $('.multiquery_close').parent().parent().hide();
    }).on('click', '.check_alt_image', function (e) {
        var a = $('.check_alt_image').data('handler');
        core.validateImage('alt', a);
        e.preventDefault();
    }).on('click', '.overlay_validate', function () {
        core.validateJSON();
    }).on('click', '.overlay_trim', function () {
        core.cleanWhitespace();
        core.panelAlert('Whitespace and line breaks have been removed.', 'good');
    }).on('click', '.previewItem.large', function (e) {
        $(app.objects.r).animate({ scrollTop: sPos }, app.animation.d.min).css('overflow', 'hidden');
        var a = $('.previewItem.large').data('hero');
        core.previewFeature(a, 'large', pfLang);
        e.preventDefault();
    }).on('click', '.previewItem.small', function (e) {
        $(app.objects.r).animate({ scrollTop: sPos }, app.animation.d.min).css('overflow', 'hidden');
        var a = $('.previewItem.small').data('hero');
        core.previewFeature(a, 'small', pfLang);
        e.preventDefault();
    }).on('click', '.removeThisItem', function () {
        var a = $('.removeThisItem').data('item');
        core.deleteItems(a);
    }).on('click', '.loadItem', function () {
        var a = $('.loadItem').attr(app.handlers.i);
        core.traverseJSON(true, a);
    }).on('click', '.copy-zone', function () {
        core.OpenInNewTab('https://github.com/davidemaser/heroIO');
    }).on('click', '.showHelp', function () {
        $(app.objects.he).toggle();
        if ($(app.objects.he).css('display') === 'block') {
            $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow', 'hidden');
        } else {
            $(app.objects.r).css('overflow', 'auto');
        }
        if ($(app.objects.o).css('display') === 'block') {
            $(app.objects.o).css('display', 'none');
        }
        if ($(app.objects.h).css('display') === 'block') {
            $(app.objects.h).css('display', 'none');
        }
    }).on('click', '.help_close', function () {
        if ($(app.objects.he).css('display') === 'block') {
            $('.help_close').parent().parent().hide();
            $(app.objects.r).css('overflow', 'auto');
        }
    }).on('click', '.renderer_close', function () {
        if ($(app.objects.h).css('display') === 'block') {
            $('.renderer_close').parent().parent().hide();
            $(app.objects.r).css('overflow', 'auto');
            $(app.objects.h).find('.render_output').empty();
        }
    }).on('click', '.btnNmode', function () {
        var a = $(app.dom.b).attr('data-nmode');
        if (a === 'hero') {
            $(app.dom.b).attr('data-nmode', 'hello');
            $('.btnNmode').attr('data-nmode', 'hello');
            $('.btnNmode').html('Switch to Hero Banner Mode');
            core.switchModes('hello');
        } else if (a === 'hello') {
            $(app.dom.b).attr('data-nmode', 'hero');
            $('.btnNmode').attr('data-nmode', 'hero');
            $('.btnNmode').html('Switch to Hello Bar Mode');
            core.switchModes('hero');
        }
    }).on('click', '.btnDel', function () {
        core.deleteItems('last');
    }).on('click', '.hideItem', function (e) {
        core.cacheClickedItem($('.hideItem'));
        e.preventDefault();
    }).on('click', '.submit_json', function () {
        var a = $('.submit_json').attr('data-nmode');
        core.prepareJSON('full', null, a);
    }).on('click', '.translate_json', function () {
        $('.overlay_message').html('');
        $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow', 'hidden');
        $(app.objects.o).attr(app.handlers.r, 'translate').css('display', 'block').find('#output_code').val('').attr('placeholder', 'Paste you code here');
    }).on('click', '.translate_from_server', function () {
        var xPath = $('.translate_from_server').attr('tlh');
        core.loadFromServer(xPath);
    }).on('click', '.save_json', function () {
        if (app.save === true) {
            core.doLocalSave();
        } else {
            confirm('The save to localstorage feature is disabled. Change the save value to true in the globals file.');
        }
    }).on('click', '.import_json', function (e) {
        core.choseLocalSave();
    }).on('click', '.planb_friendly', function (e) {
        core.planBify();
        e.preventDefault();
    }).on('click', '.overlay_translate', function () {
        core.traverseJSON(false);
    }).on('click', '.errors_reset', function () {
        $('input,select').attr('style', '').attr('placeholder', '');
        $('.errorList').css('display', 'none');
        $(app.objects.r).css('overflow', 'auto');
        $(app.objects.i).find('.input_alerts').remove();
        $(app.objects.i).contents().unwrap();
        core.panelAlert('Errors Reset', 'good');
    }).on('click', '.form_reset', function (e) {
        $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow', 'hidden');
        $('.clonedInput:gt(0)').remove();
        $('.snapTo').find('li:gt(0)').remove();
        $('input').val('');
        $('input,select').attr('style', '').attr('placeholder', '');
        $('.errorList').css('display', 'none');
        $(app.objects.r).css('overflow', 'auto');
        $(app.objects.i).find('.input_alerts').remove();
        $(app.objects.i).contents().unwrap();
        $('.reordered').remove();
        core.panelAlert('Form Reset To Default', 'good');
        e.preventDefault();
    }).on('click', '.itemize_reset', function (e) {
        core.resetItems();
        e.preventDefault();
    }).on('click', '.form_local_reset', function (e) {
        core.doLocalSave('reset');
        $(app.objects.l).hide();
        e.preventDefault();
    }).on('click', 'input,select', function () {
        $(this).attr('style', '').attr('placeholder', '');
        if ($(this).parent().hasClass('input_holders')) {
            $(this).parent().find('.input_alerts').remove();
            $(this).unwrap();
        }
    }).on('click', '.helpItem', function () {
        var a = $('.helpItem').data('target');
        core.jumpToHelper(a);
    }).on('click', '.image_count', function () {
        $('.image_count').attr('style', '');
        $('.image_count').text('Shopify CDN');
    }).on('click', '.btnSwitch', function (e) {
        pfLang = $('.btnSwitch').data('language');
        $('.btnSwitch').removeClass('view-active');
        $('.btnSwitch[data-language="' + pfLang + '"]').addClass('view-active');
        if ($(app.objects.ro).children().not('.preview_warning').length > 0) {
            core.previewFeature(pfHero, pfMode, pfLang);
        }
        core.panelAlert('Preview language changed', 'good');
        e.preventDefault();
    }).on('click', '.panel-body.bottom_level_bt', function () {
        $('.panel-body.bottom_level_bt').slideUp();
    }).on('click', '.show_me_how', function () {
        var a = $('.show_me_how').data('target') - 1;
        $(app.objects.r).animate({ scrollTop: 0 }, { duration: app.animation.d.min,
            complete: function complete() {
                $(app.objects.he).show();
                core.jumpToHelper(a);
            }
        }).css('overflow', 'hidden');
    }).on('click', '.helpItemReset', function () {
        $(app.objects.hi).animate({
            opacity: 1
        }, app.animation.d.min);
    }).on('click', '.settings_toggle', function (e) {
        var a = $('.settings_toggle').data('theme');
        $('html').attr(app.handlers.t, a);
        if (window.localStorage) {
            localStorage.setItem('pgb_Theme', a);
        }
        core.panelAlert('Theme Settings Updated', 'good');
        e.preventDefault();
    }).on('click', '.moveUpThisItem', function (fn) {
        var a = $('.moveUpThisItem').data('item');
        var b = a - 1;
        var c = $('.moveUpThisItem').parent().parent().parent().parent().parent().parent();
        var d = $(c).closest(app.objects.cl).prev();
        var e = $(c).data('split');
        $(c).attr(app.handlers.s, e - 1);
        $(c).insertBefore(d);
        $(app.objects.r).animate({
            scrollTop: $(app.objects.e + a).offset().top - 60
        }, app.animation.d.min);
        //$(d).closest(app.objects.cl).prev();
        $('.moveUpThisItem').parent().parent().parent().find('.reordered').remove();
        $('.moveUpThisItem').parent().parent().parent().find('.btn.btn-info:not(.dropdown-toggle)').prepend('<span title="This entry has been moved from it\'s original position" class="glyphicon glyphicon-fullscreen reordered" aria-hidden="true"></span>');
        core.panelAlert('Item Order Changed', 'good');
        fn.preventDefault();
    }).on('click', '.moveDownThisItem', function (fn) {
        var a = $('.moveDownThisItem').data('item');
        var b = a - 1;
        var c = $('.moveDownThisItem').parent().parent().parent().parent().parent().parent();
        var d = $(c).closest(app.objects.cl).next();
        var e = $(c).data('split');
        var f = $(d).attr('id');
        if (f.includes('entry')) {
            $(c).attr(app.handlers.s, e + 1);
            $(c).insertAfter(d);
            $(app.objects.r).animate({
                scrollTop: $(app.objects.e + a).offset().top - 60
            }, app.animation.d.min);
            $('.moveDownThisItem').parent().parent().parent().find('.reordered').remove();
            $('.moveDownThisItem').parent().parent().parent().find('.btn.btn-info:not(.dropdown-toggle)').prepend('<span title="This entry has been moved from it\'s original position" class="glyphicon glyphicon-fullscreen reordered" aria-hidden="true"></span>');
            core.panelAlert('Item Order Changed', 'good');
        } else {
            core.panelAlert('If I move down any further, I\'ll be off the page.', 'error');
        }
        fn.preventDefault();
    }).on('click', '.batsToggle', function () {
        if ($('.batsToggle').attr('data-status') === 'active') {
            core.killBats();
        } else if ($('.batsToggle').attr('data-status') === 'allGone') {
            for (i = 0; i < 4; i++) {
                core.launchBats();
            }
            $('.batsToggle').attr('data-status', 'active').html('Kill The Bats');
        }
    }).on('keyup', 'input', function () {
        var a = $(this).val().length;
        if ($(this).hasClass('objTitleEN') || $(this).hasClass('objTitleFR') || $(this).hasClass('objTextEN') || $(this).hasClass('objTextFR')) {
            var _compLen = 35;
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
    }).on('keyup', '.num_select', function (e) {
        if (e.keyCode === 13) {
            $('.num_select').trigger("enterKey");
            core.addMulti($('.num_select').val());
            $('.num_select').parent().parent().parent().parent().hide();
        }
    }).on('keyup', '.lsl_select', function (e) {
        if (e.keyCode === 13) {
            $('.lsl_select').trigger("enterKey");
            core.prepareJSON('save', $('.lsl_select').val());
            $('.lsl_select').parent().parent().parent().parent().hide();
            core.setHeadSec();
        }
    }).on('keyup', app.objects.o + '[' + app.handlers.r + '="translate"] #output_code', function (e) {
        if (e.keyCode === 45) {
            $(this).trigger("enterKey");
            core.traverseJSON(false);
            e.preventDefault();
        }
    }).on('change', '.objHeroSticky', function () {
        var a = $('.objHeroSticky').val();
        if (a === 'true') {
            $('.objHeroSticky').parent().parent().find('.objHeroPromote option[value="true"]').attr('selected', false);
        } else if (a === 'false') {
            //$('.objHeroSticky').parent().parent().find('.objHeroPromote option[value="false"]').attr('selected',true);
        }
    }).on('change', '.objButtonPopup', function () {
        var a = $('.objButtonPopup').val();
        if (a === 'true') {
            $('.objButtonPopup').parent().parent().find('.objButtonPopupLink').attr('style', '');
        } else if (a === 'false') {
            $('.objButtonPopup').parent().parent().find('.objButtonPopupLink').css('opacity', 0.3);
        }
    }).on('change', '.input_radio', function () {
        var a = $(this).parent().parent().parent().parent().parent().attr('id').replace('entry', '');
        if ($(this).val() === 'true') {
            $(this).parent().parent().css('border-left', '6px solid #68B81F');
            $(this).parent().parent().parent().parent().find('h2').find('span').removeClass('label-danger').addClass('label-default');
            $('.gotoItem[' + app.handlers.i + '="' + a + '"]').removeClass('redout').attr('title', '');
        } else {
            $(this).parent().parent().css('border-left', '6px solid #FD0000');
            $(this).parent().parent().parent().parent().find('h2').find('span').removeClass('label-default').addClass('label-danger');
            $('.gotoItem[' + app.handlers.i + '="' + a + '"]').addClass('redout').attr('title', 'This Hero entry is not activated');
        }
    }).on('change', '.lsOptions', function () {
        try {
            if ($('.lsOptions').val() !== "" || $('.lsOptions').val() !== "undefined" || $('.lsOptions').val() !== undefined || $('.lsOptions').val() !== "null" || $('.lsOptions').val() !== null) {
                var a = $('.lsOptions').val();
                core.traverseJSON(true, a);
                $('#loadandsave-zone').css('display', 'none');
            } else {
                panelAlert('Please select a valid data item from the dropdown', 'error');
            }
        } catch (e) {}
    }).on('click', '.addConditions', function () {
        var $targetObject = $('.addConditions').parent().parent().parent().parent().parent().parent().find('.form-group.option-selection');
        var $targetStatus = $targetObject.css('display');
        if ($targetStatus === 'none') {
            $targetObject.css('display', 'table');
        } else if ($targetStatus === 'table') {
            $targetObject.css('display', 'none');
        }
    });
    $(window).on('scroll', function () {
        if ($(window).scrollTop() + $(window).height() === $(document).height()) {
            $('.copy-zone').fadeIn(app.animation.d.min);
        } else {
            $('.copy-zone').fadeOut(app.animation.d.min);
        }
    }).on('resize', function () {
        core.scrollState('a');
    });
    $(document).on('keydown', function (e) {
        if (e.keyCode === 71 && e.ctrlKey) {
            var a = $('.submit_json').attr('data-nmode');
            core.prepareJSON('full', null, a);
            e.preventDefault();
        }
        if (e.keyCode === 82 && e.ctrlKey) {
            core.deleteItems();
            e.preventDefault();
        }
        if (e.keyCode === 73 && e.ctrlKey && !e.altKey) {
            core.addItems();
            e.preventDefault();
        }
        if (e.keyCode === 73 && e.ctrlKey && e.altKey) {
            $('#query-zone').toggle();
            $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min);
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
                core.doLocalSave();
            } else {
                confirm('The save to localstorage feature is disabled. Change the save value to true in the globals file.');
            }
        }
        if (e.keyCode === 13 && e.ctrlKey && e.altKey) {
            $('.overlay_message').html('');
            $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow', 'hidden');
            $(app.objects.o).attr(app.handlers.r, 'translate').css('display', 'block').find('#output_code').val('').attr('placeholder', 'Paste you code here');
            e.preventDefault();
        }
        if (e.keyCode === 45 && e.ctrlKey && e.altKey) {
            core.choseLocalSave();
        }
        if (e.keyCode === 69 && e.ctrlKey && e.altKey) {
            if (pfLang === app.language.e) {
                pfLang = app.language.f;
            } else if (pfLang === app.language.f) {
                pfLang = app.language.e;
            }
            $('.btnSwitch').removeClass('view-active');
            $('.btnSwitch[data-language="' + pfLang + '"]').addClass('view-active');
            if ($(app.objects.ro).children().not('.preview_warning').length > 0) {
                core.previewFeature(pfHero, pfMode, pfLang);
            }
            core.panelAlert('Preview language changed', 'good');
            e.preventDefault();
        }
        if (e.keyCode === 191 && e.ctrlKey) {
            window.open("release.html", "_blank", "scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no");
            e.preventDefault();
        }
    }).on('scroll', function () {
        core.scrollState('b');
        sPos = $(window).scrollTop();
    });
    var d = new Date();
    var dt = d.getDate();
    var dm = d.getMonth() + 1;
    if (dm === 10 && dt > 21) {
        $('.main_nav').append('<li class="divider"></li><li><a href="#" class="batsToggle" data-status="active">Kill The Bats</a></li>');
        for (var i = 0; i < 4; i++) {
            core.launchBats();
        }
    }
});