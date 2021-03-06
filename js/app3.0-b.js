/**
 * @copyright webapp created by David Maser for use on The Last Hunt site. Use outside of the Altitude-Sports domains is not allowed.
 * @type {{locale: string, user: string, callback: boolean, export: string, dialog: boolean, save: boolean, listener: string, methods: {g: string, p: string}, objects: {o: string, e: string, h: string, i: string, b: string, c: string, ca: string, he: string, hi: string, cl: string, r: string, bo: string, g: string, l: string}, handlers: {d: string, t: string, i: string, r: string, s: string}}}
 * @param mess
 * @param state
 * @require globals.js
 */
//"use strict";
var pfLang = app.lang,
    pfHero = 0,
    pfMode = app.params.s,
    pfExport = 'hero';
function panelAlert(mess,state){
    /**
     * Creates a bottom panel alert view
     * that slides into view with a
     * defined message.
     */
        if(app.dialog == true) {
            var mPane = '.panel-body.bottom_level_bt';
            if (state == app.params.e) {
                $(mPane).find(app.objects.g).removeClass('allGood').removeClass('glyphicon-ok').addClass('allBad').addClass('glyphicon-remove');
            } else if (state == app.params.g) {
                $(mPane).find(app.objects.g).removeClass('allBad').removeClass('glyphicon-remove').addClass('allGood').addClass('glyphicon-ok');
            }
            $(mPane).slideDown();
            $(mPane).find('.inner_message').html(mess);
            setTimeout("$('.panel-body.bottom_level_bt').slideUp()", app.animation.d.max);
        }
}
function getVersion(init){
    /**
     * Recovers and displays the app version from
     * the release.json file. init=false checks the
     * current version against the server json and
     * initializes and update prompt if the local
     * version is outdated.
     */
    try {
        $.ajax({
            type: app.methods.g,
            url: app.version,
            success: function (data) {
                var ver = data.project.version,
                    sup = data.project.history.length-1,
                    lup = data.project.history[sup].date;
                if(init == true) {
                    document.title = "Page Builder " + ver;
                    $('.version_number').attr('title', 'You are using version ' + ver + ', last updated ' + lup).html(ver);
                    $('html').attr('data-version',ver);
                    tagNew(ver);
                }else if(init == false) {
                    var cur = $('html').attr('data-version');
                    if(cur < ver || cur > ver){
                        initVersionUpdate();
                    }
                }
            }
        })
    }catch(e){
        console.log(e);
    }
}
function initVersionUpdate(){
    /**
     * Prompts the user to reload the page if a
     * newer version of the app has been detected
     * remotely.
     */
    $('.init-update').remove();
    var pageData = '<div class="init-update"><div class="blackify_overlay"><div class="prompt-update"><div class="prompt-icon"><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span></div><div class="prompt-message">A newer version of the PageBuilder app has been detected. Do you want to load the newer version now? <br><br>Make sure you save all your work before answering YES.</div><div class="prompt-choice"><button type="button" class="btn btn-update true" data-toggle="dropdown" aria-expanded="false">YES</button><button type="button" class="btn btn-update false" data-toggle="dropdown" aria-expanded="false">NO</button></div></div></div></div>';
    $(app.dom.b).append(pageData).on('click','.btn-update.true',function(){
        location.reload();
    }).on('click','.btn-update.false',function(){
        $(this).parent().parent().parent().parent().remove();
        panelAlert('Version update stopped. The update prompt will reappear at the next update interval.','good');
    })
}
function tagNew(ver){
    /**
     * Tags new items by comparing the current app
     * version to the data-version attribute on
     * main menu links
     */
    var cssBlock = '<style>.main_nav a[data-version="'+ver+'"]:after {content: "new";float: right;background-color: #f0ad4e;padding: 2px 5px;font-size: 10px;color: #fff;font-weight: bold;}</style>';
    $(app.dom.b).append(cssBlock).find('a[data-version="'+ver+'"]').attr('title','This feature is new to the current version');
}
function initializeForm(){
    /**
     * creates the initial form instance by
     * populating the parent container with
     * elements defined in a layout.json
     * file
     */
    $.ajax({
        type:app.methods.g,
        url:app.objects.form.l,
        success:function(data) {
            var dataBlock = data.layout,
                htmlBlock = '<div id="entry1" class="clonedInput" '+app.handlers.s+'="1"><form action="'+dataBlock.form_action+'" method="'+dataBlock.method+'" id="'+dataBlock.form_id+'" role="form">';
            htmlBlock += dataBlock.header;
            htmlBlock += '<fieldset>';
            var blockContent = dataBlock.block,
                blockLen = blockContent.length;
            for(var i = 0;i<blockLen;i++){
                if(blockContent[i].display !== 'custom') {
                    if (i % 2 === 0 || i === 0) {
                        if (blockContent[i].wrap_group == true) {
                            htmlBlock += '<div class="' + blockContent[i].wrap_group_class + '">';
                        }
                        htmlBlock += '<div class="form-group">';
                        var blocker = ' lItem';
                    } else {
                        blocker = '';
                    }
                    if (blockContent[i].display !== 'empty') {
                        switch (blockContent[i].display) {
                            case "full":
                                var line = '';
                                    blocker = '';
                                break;
                            case "half":
                                line = 'half_span';
                                break;
                        }
                        htmlBlock += '<div class="' + line + ' ' + blocker + '">';
                        htmlBlock += '<label class="label_fn control-label" for="' + blockContent[i].obj_id + '">' + blockContent[i].label + '</label>';
                        if (blockContent[i].wrap == true) {
                            htmlBlock += '<div class="' + blockContent[i].wrap_class + '">';
                        }
                        if (blockContent[i].inject_code !== '') {
                            htmlBlock += blockContent[i].inject_code;
                        }
                        if (blockContent[i].input_obj == 'text') {
                            htmlBlock += '<input';
                            if (blockContent[i].obj_id !== '') {
                                htmlBlock += ' id="' + blockContent[i].obj_id + '" name="' + blockContent[i].obj_id + '"';
                            }
                            htmlBlock += ' type="text" placeholder="' + blockContent[i].placeholder + '" class="input_fn form-control';
                            if (blockContent[i].class !== '') {
                                htmlBlock += ' ' + blockContent[i].class;
                            }
                            if (blockContent[i].obj_label !== '') {
                                htmlBlock += ' ' + blockContent[i].obj_label;
                            }
                            htmlBlock += '"';
                            if (blockContent[i].options !== null) {
                                var opLen = blockContent[i].options.length;
                                for (var j = 0; j < opLen; j++) {
                                    htmlBlock += ' ' + blockContent[i].options[j].item + '="' + blockContent[i].options[j].value + '"';
                                }
                            }
                            if (blockContent[i].data !== null) {
                                var dtLen = blockContent[i].data.length;
                                for (var k = 0; k < dtLen; k++) {
                                    htmlBlock += ' data-' + blockContent[i].data[k].item + '="' + blockContent[i].data[k].value + '"';
                                }
                            }
                            htmlBlock += '>';
                        } else if (blockContent[i].input_obj == 'radio') {
                            htmlBlock += '<input';
                            htmlBlock += ' type="radio"';
                            if (blockContent[i].class !== '') {
                                htmlBlock += ' class="' + blockContent[i].class + '"';
                            }
                            if (blockContent[i].obj_id !== '') {
                                htmlBlock += ' id="' + blockContent[i].obj_id + '" name="' + blockContent[i].obj_id + '"';
                            }
                            if (blockContent[i].options !== null) {
                                opLen = blockContent[i].options.length;
                                for (j = 0; j < opLen; j++) {
                                    htmlBlock += ' ' + blockContent[i].options[j].item + '="' + blockContent[i].options[j].value + '"';
                                    if (blockContent[i].options[j].default !== undefined) {
                                        htmlBlock += ' ' + blockContent[i].options[j].default;
                                    }
                                }
                            }
                            if (blockContent[i].data !== null) {
                                dtLen = blockContent[i].data.length;
                                for (k = 0; k < dtLen; k++) {
                                    htmlBlock += ' data-' + blockContent[i].data[k].item + '="' + blockContent[i].data[k].value + '"';
                                }
                            }
                            htmlBlock += '>';
                        } else if (blockContent[i].input_obj == 'select') {
                            htmlBlock += '<select';
                            if (blockContent[i].class !== '') {
                                htmlBlock += ' class="form-control ' + blockContent[i].class + '"';
                            }
                            if (blockContent[i].obj_id !== '') {
                                htmlBlock += ' id="' + blockContent[i].obj_id + '" name="' + blockContent[i].obj_id + '"';
                                if (blockContent[i].data !== null) {
                                    dtLen = blockContent[i].data.length;
                                    for (k = 0; k < dtLen; k++) {
                                        htmlBlock += ' data-' + blockContent[i].data[k].item + '="' + blockContent[i].data[k].value + '"';
                                    }
                                }
                            }
                            htmlBlock += '>';
                            if (blockContent[i].options !== null) {
                                opLen = blockContent[i].options.length;
                                for (j = 0; j < opLen; j++) {
                                    htmlBlock += '<option';
                                    htmlBlock += ' ' + blockContent[i].options[j].item + '="' + blockContent[i].options[j].value + '"';
                                    if (blockContent[i].options[j].default !== undefined) {
                                        htmlBlock += ' ' + blockContent[i].options[j].default;
                                    }
                                    htmlBlock += '>' + blockContent[i].options[j].label;
                                    htmlBlock += '</option>';
                                }
                            }
                            htmlBlock += '</select>';
                        }
                        if (blockContent[i].append !== '') {
                            htmlBlock += blockContent[i].append;
                        }
                        if (blockContent[i].wrap == true) {
                            htmlBlock += '</div>';
                        }
                        htmlBlock += '</div>';
                    }
                    if (i % 2 === 1) {
                        htmlBlock += '</div>';
                        if (blockContent[i].wrap_group == true) {
                            htmlBlock += '</div>';
                        }
                    }
                }else{
                    htmlBlock += blockContent[i].inject_code;
                }
            }
            htmlBlock += '</fieldset>';
            htmlBlock += '</form></div>';
        }
    })
}
function switchModes(va){
    /**
     * switches the page builder mode from
     * Hero builder mode to Hello Bar
     * builder mode
     */
    if(va == 'hello') {
        $('*[data-role="hero"]').css('display', 'none');
        $('*[data-role="hello"]').css('display', 'block');
        $('*[data-role="altiSpecial"]').css('display', 'none');
        pfExport = 'hello';
        $('.submit_json').attr('data-nmode','hello');
        panelAlert('Switched to Hello Banner Creation mode','good');
    }else if(va == 'hero'){
        $('*[data-role="hello"]').css('display', 'none');
        $('*[data-role="altiSpecial"]').css('display', 'none');
        $('*[data-role="hero"]').attr('style', '');
        pfExport = 'hero';
        $('.submit_json').attr('data-nmode','hero');
        panelAlert('Switched to Hero Banner Creation mode','good');
    }else if(va == 'altiSpecial'){
        $('*[data-role="hello"]').css('display', 'none');
        $('*[data-role="hero"]').css('display', 'none');
        $('*[data-role="altiSpecial"]').css('display', 'block');
        pfExport = 'altiSpecial';
        $('.submit_json').attr('data-nmode','altiSpecial');
        panelAlert('Switched to Alti Special Banner Creation mode','good');
    }
}
function initializeTheme(){
    /**
     * reads and/or sets the html theme data attribute
     * from the local storage item
     */
    if(window.localStorage) {
        var tm = localStorage.getItem(app.storage.t);
        if (tm == null || tm == undefined) {
            $('html').attr(app.handlers.t, 'light');
        }else{
            $('html').attr(app.handlers.t, tm);
        }
    }else{
        $('html').attr(app.handlers.t, 'light');
    }
}
function initHelp(){
    /**
     * Initialize the help view by loading items
     * from the help.json file
     */
    $.ajax({
        type:app.methods.g,
        url:'data/help.json',
        success:function(data){
            for(var h=0;h<data.items.length;h++){
                if(h > 0){
                    var push = 'push_block';
                }else{
                    push = '';
                }
                $('.help-items').append('<li><a class="helpItem" data-target="'+h+'">'+data.items[h].title+'</a></li>');
                $('.help_panel_holder').append('<div class="help_item" id="hlp'+h+'" data-helper="'+h+'"><h4 class="'+push+'">'+data.items[h].title+'</h4>'+data.items[h].block+'</div>');
            }
        },
        error:function(){
            panelAlert('Unable to load Help Contents from JSON source', 'error');
        }
    });

}
function setHeadSec(){
    /**
     * sets head section items that display in a button model
     * the locally saved hero items for rapid translation of
     * the JSON data
     */
    try {
        var isReady = localStorage.getItem(app.storage.n);
        if (isReady !== null) {
            $(app.objects.l).css('display', 'inline-block');
            $('#import_json').css('display', 'block');
            $('.lsLoad').find('li').remove();
            var a = localStorage.getItem(app.storage.n).split(','),
                long = a.length;
            if (long > 1) {
                for (var i = 0; i < long; i++) {
                    if (a[i] !== '') {
                        $('.lsLoad').append('<li><a href="#" class="loadItem" '+app.handlers.i+'="' + a[i] + '">' + a[i] + '</a></li>');
                    }
                }
            } else {
                $(app.objects.l).hide();
            }
        } else {
            $(app.objects.l).css('display', 'none');
            $('#import_json').css('display', 'none');
        }
    }catch(e){
        console.log(e);
    }
}
function launchBats(){
    /**
     * A useless script that runs at halloween
     * and shows flying bats on the page.
     */
    var r = Math.random,
        n = 0,
        d = document,
        w = window,
        i = d.createElement('img'),
        z = d.createElement('div'),
        zs = z.style,
        a = w.innerWidth * r(),
        b = w.innerHeight * r();
    z.className = 'oooobats';
    zs.position = "fixed";
    zs.left = 0;
    zs.top = 0;
    zs.opacity = 0;
    z.appendChild(i);
    i.src = 'data:image/gif;base64,R0lGODlhMAAwAJECAAAAAEJCQv///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAQACACwAAAAAMAAwAAACdpSPqcvtD6NcYNpbr4Z5ewV0UvhRohOe5UE+6cq0carCgpzQuM3ut16zvRBAH+/XKQ6PvaQyCFs+mbnWlEq0FrGi15XZJSmxP8OTRj4DyWY1lKdmV8fyLL3eXOPn6D3f6BcoOEhYaHiImKi4yNjo+AgZKTl5WAAAIfkECQEAAgAsAAAAADAAMAAAAnyUj6nL7Q+jdCDWicF9G1vdeWICao05ciUVpkrZIqjLwCdI16s+5wfck+F8JOBiR/zZZAJk0mAsDp/KIHRKvVqb2KxTu/Vdvt/nGFs2V5Bpta3tBcKp8m5WWL/z5PpbtH/0B/iyNGh4iJiouMjY6PgIGSk5SVlpeYmZqVkAACH5BAkBAAIALAAAAAAwADAAAAJhlI+py+0Po5y02ouz3rz7D4biSJbmiabq6gCs4B5AvM7GTKv4buby7vsAbT9gZ4h0JYmZpXO4YEKeVCk0QkVUlw+uYovE8ibgaVBSLm1Pa3W194rL5/S6/Y7P6/f8vp9SAAAh+QQJAQACACwAAAAAMAAwAAACZZSPqcvtD6OctNqLs968+w+G4kiW5omm6ooALeCusAHHclyzQs3rOz9jAXuqIRFlPJ6SQWRSaIQOpUBqtfjEZpfMJqmrHIFtpbGze2ZywWu0aUwWEbfiZvQdD4sXuWUj7gPos1EAACH5BAkBAAIALAAAAAAwADAAAAJrlI+py+0Po5y02ouz3rz7D4ZiCIxUaU4Amjrr+rDg+7ojXTdyh+e7kPP0egjabGg0EIVImHLJa6KaUam1aqVynNNsUvPTQjO/J84cFA3RzlaJO2495TF63Y7P6/f8vv8PGCg4SFhoeIg4UQAAIfkEBQEAAgAsAAAAADAAMAAAAnaUj6nL7Q+jXGDaW6+GeXsFdFL4UaITnuVBPunKtHGqwoKc0LjN7rdes70QQB/v1ykOj72kMghbPpm51pRKtBaxoteV2SUpsT/Dk0Y+A8lmNZSnZlfH8iy93lzj5+g93+gXKDhIWGh4iJiouMjY6PgIGSk5eVgAADs=';
    d.body.appendChild(z);

    function R(o, m) {
        return Math.max(Math.min(o + (r() - .5) * 400, m - 50), 50)
    }
    function A() {
        var x = R(a, w.innerWidth),
            y = R(b, w.innerHeight),
            d = 5 * Math.sqrt((a - x) * (a - x) + (b - y) * (b - y));
        zs.opacity = n;
        n = 1;
        zs.transition = zs.webkitTransition = d / 1e3 + 's linear';
        zs.transform = zs.webkitTransform = 'translate(' + x + 'px,' + y + 'px)';
        i.style.transform = i.style.webkitTransform = (a > x) ? '' : 'scaleX(-1)';
        a = x;
        b = y;
        setTimeout(A, d);
    }
    setTimeout(A, r() * 3e3);
}
function killBats(){
    /**
     * Removes the flying bats from the dom
     */
    $('.oooobats').remove();
    $('.batsToggle').attr('data-status','allGone').html('Let In The Bats');
}
function resetItems(){
    /**
     * Checks if page items have been moved
     * and resets them to their original position
     * based on the numeric value of their ID
     */
    if($(app.objects.re).length > 0) {
        $(app.objects.w).find(app.objects.cl).sort(function (a, b) {
            return $(a).attr('id').replace('entry', '') - $(b).attr('id').replace('entry', '');
        }).appendTo(app.objects.w);
        $(app.objects.re).remove();
        panelAlert('Items reset to their original position','good');
    }else{
        panelAlert('All items are in their original position','error');
    }
}
$(function () {
    /**
     * Main document ready initialized function
     */
    var sPos = 0;
    setHeadSec();
    initializeTheme();
    initHelp();
    getVersion(true);
    setInterval("getVersion(false)",600000);
    $('.date_obj').datetimepicker({format: 'MM/DD/YYYY HH:mm'});
    function choseLocalSave(){
        /**
         * Populates the load saved data from
         * localstorage item and presents it
         * in a dropdown modal
         */
        try {
            $('#loadandsave-zone').attr(app.handlers.r, 'load').css('display', 'block');
            var a = localStorage.getItem(app.storage.n),
                target = $('.lsOptions');
            if (a !== null || a !== undefined) {
                var b = a.split(','),
                    bLen = b.length;
                $('.lsOptions').find('option').remove();
                $(target).append('<option value="null">SELECT</option>');
                for (var i = 0; i < bLen; i++) {
                    $(target).append('<option value="' + b[i] + '">' + b[i] + '</option>');
                }
            } else {
                $(target).append('<option value="null">No Local Storage Found</option>');
            }
        }catch(e){
        }
    }
    function doLocalSave(method){
        /**
         * Save heros to localstorage or flush
         */
        if(method == 'do' || method == null) {
            $('#loadandsave-zone').attr(app.handlers.r, 'save').css('display', 'block');
        }else if(method == 'reset'){
            localStorage.setItem(app.storage.n,"");
            for(var i=0, len=localStorage.length; i<len; i++) {
                var key = localStorage.key(i);
                if(key.indexOf('pgb_SavedNode_')>-1 && key.indexOf(app.storage.n)<0){
                    localStorage.removeItem(key);
                }
            }
        }
    }
    function scrollState(meth){
        /**
         * Checks the users scroll position on the
         * window and displays a progress bar
         * below the main menu navs
         */
        var winHeight = $(window).height(),
            docHeight = $(document).height(),
            progressBar = $('progress'),
            max, value;
        max = docHeight - winHeight;
        progressBar.attr('max', max);
        if(meth == 'a') {
            winHeight = $(window).height(),
                docHeight = $(document).height();

            max = docHeight - winHeight;
            progressBar.attr('max', max);

            value = $(window).scrollTop();
            progressBar.attr('value', value);
        }else if(meth == 'b'){
            value = $(window).scrollTop();
            progressBar.attr('value', value);
        }
    }
    function OpenInNewTab(url) {
        /**
         * Simple open url in new tab function
         */
        var win = window.open(url, '_blank');
        win.focus();
    }
    function addMulti(num){
        /**
         * Adds multiple hero items to the current
         * instance
         */
        for(var i=0;i<num;i++) {
            addItems();
        }
        panelAlert('Items Added','good');
    }
    function jumpToHelper(a){
        /**
         * Animates the help item click to bring
         * into view the correct help item
         */
        $('.help_panel_holder').animate({
            scrollTop: $(app.objects.hi+'[data-helper="'+a+'"]').offset().top,
            duration:app.animation.d.min
        });
        $(app.objects.hi).animate({
            opacity:0.4,
            duration:app.animation.d.min
        });
        $(app.objects.hi+'[data-helper="'+a+'"]').animate({
            opacity:1,
            duration:app.animation.d.min
        });
    }
    function saveNodeToLS(val,name){
        /**
         * Saves the form data in the pagebuilder form
         * to a localstorage object. Creates a key-value
         * relation and creates a second localstorage
         * object with an array of savec heros
         */
        if(window.localStorage) {
            if(localStorage.getItem(app.storage.n) == null || localStorage.getItem(app.storage.n) == undefined){
                localStorage.setItem(app.storage.n,"");
            }
            var getList = localStorage.getItem(app.storage.n),
                getListLen = getList.split(',').length;
            if(getListLen > 0){
                var newList = getList+','+name;
            }else{
                newList = name;
            }
            localStorage.setItem(app.storage.n,newList);
                    localStorage.setItem('pgb_SavedNode_'+name,val);
            panelAlert('Data Saved To Local Storage','good');
            }
    }
    function addItems(){
        /**
         * Add new items to the form. Duplicates a
         * form block
         */
        if($(app.objects.o).css('display') == 'block'){
            $(app.objects.o).css('display','none');
        }
        var num     = $(app.objects.cl).length, // Checks to see how many "duplicatable" input fields we currently have
            newNum  = new Number(num + 1),      // The numeric ID of the new input field being added, increasing by 1 each time
            newElem = $(app.objects.e + num).clone().attr('id', 'entry' + newNum); // create the new element via clone(), and manipulate it's ID using newNum value

        newElem.find('.heading-reference').attr('id', 'ID' + newNum + '_reference').attr('name', 'ID' + newNum + '_reference').html('<div class="btn-group bigboy"><button type="button" class="btn btn-info">ITEM <span class="label label-default">' + newNum+'</span></button><button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu"><li><a class="previewItem large" href="javascript:;" data-hero="'+newNum+'" data-role="hero">Preview Large</a></li><li><a class="previewItem small" href="javascript:;" data-hero="'+newNum+'" data-role="hero">Preview Small</a></li></ul></div>');
        newElem.attr(app.handlers.s,newNum);

        newElem.find('.label_ttl').attr('for', 'ID' + newNum + '_title');
        newElem.find('.select_ttl').attr('id', 'ID' + newNum + '_title').attr('name', 'ID' + newNum + '_title').val('');

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
        newElem.find('.input-group-addon.image_count').attr('style','').html('Shopify CDN');
        newElem.find('.mod-radio').attr('style','');

        $('.clonedInput:last').after(newElem);
        $('#ID' + newNum + '_title').focus();

        $('#btnDel').attr('disabled', false);

        if (newNum == 10)
            $('.btnAdd').attr('disabled', true).prop('value', "You've reached the limit"); // value here updates the text in the 'add' button when the limit is reached
        var dateNow = new Date();
        $('.date_obj').datetimepicker({format: 'MM/DD/YYYY HH:mm'});
        $('.snapTo').append('<li><a href="#" class="gotoItem" '+app.handlers.i+'="'+newNum+'">Item '+newNum+'</a></li>');
        $(app.objects.r).animate({
            scrollTop: $(app.objects.e + newNum).offset().top-60
        }, app.animation.d.min);
        $('.btn-group.bigboy:not(.helpMePlease)').last().find('ul').append('<li class="divider" data-role="hero"></li><li><a class="removeThisItem" '+app.handlers.i+'="'+newNum+'" href="javascript:;">Remove</a></li><li class="divider"></li><li><a class="moveUpThisItem" '+app.handlers.i+'="'+newNum+'" href="javascript:;">Move Up<span class="glyphicon glyphicon-arrow-up"></span></a></li><li><a class="moveDownThisItem" '+app.handlers.i+'="'+newNum+'" href="javascript:;">Move Down<span class="glyphicon glyphicon-arrow-down"></span></a></li>');
        $(app.objects.e + newNum).find('.mod-radio').find('input').first().prop('checked',true);
        scrollState('a');
        panelAlert('Item Added','good');
    }
    function deleteItems(elem) {
        /**
         * Delete items from the form instance and
         * removes them from the dom reference
         */
        if ($(app.objects.cl).length > 1) {
            if ($(app.objects.o).css('display') == 'block') {
                $(app.objects.o).css('display', 'none');
            }
                //var num = $(app.objects.cl).length;
                if (elem == 'last') {
                    var a = $('.clonedInput:last').attr('id'),
                        b = a.replace('entry','');
                    $('#' + a).slideUp('slow', function () {
                        $(this).remove();
                        // if only one element remains, disable the "remove" button
                        if (elem - 1 === 1)
                            $('.btnDel').attr('disabled', true);
                        // enable the "add" button
                        $('.btnAdd').attr('disabled', false).prop('value', "add section");
                    });
                    $('.snapTo').find('.gotoItem['+app.handlers.i+'="'+b+'"]').parent().remove();
                    scrollState('a');
                } else {
                    $(app.objects.e + elem).slideUp('slow', function () {
                        $(this).remove();
                        // if only one element remains, disable the "remove" button
                        if (elem - 1 === 1)
                            $('.btnDel').attr('disabled', true);
                        // enable the "add" button
                        $('.btnAdd').attr('disabled', false).prop('value', "add section");
                    });
                    $('.snapTo').find('.gotoItem['+app.handlers.i+'="'+elem+'"]').parent().remove();
                    scrollState('a');
                }
                return false; // Removes the last section you added
        }
    }
    function validateJSON(){
        /**
         * Validate the JSON that has been exported
         * when the user clicks the button
         */
        $("#output_code").validateJSON({
            compress: false,
            reformat: true,
            onSuccess: function (json) {
                panelAlert('JSON Code is valid','good');
            },
            onError: function (error) {
                panelAlert('A JSON error has been encountered. The line on which the error has occured is highlighted.','error');
            }
        })
    }
    function errorHandler(){
        /**
         * Generic error handler that checks if certain
         * form objects are filled and outputs a dropdown
         * list with anchor links
         */
        var errorLog = [],
            a = JSON.parse($(app.objects.o+'['+app.handlers.r+'="output"]').find('textarea').val()).hero,
            b = a.length,
            c = 0;
        for(var i =0;i<b;i++){
            if(a[i].date.start == ''){
                errorLog.push({form:(i+1),obj:"Start Date",prob:"No Value. FATAL",elem:"objStart",die:true});
                c++;
            }
            if(a[i].date.end == ''){
                errorLog.push({form:(i+1),obj:"End Date",prob:"No Value. FATAL",elem:"objEnd",die:true});
                c++;
            }
            if(a[i].title.en == ''){
                errorLog.push({form:(i+1),obj:"English Title",prob:"No Value",elem:"objTitleEN",die:false});
                c++;
            }
            if(a[i].title.fr == ''){
                errorLog.push({form:(i+1),obj:"French Title",prob:"No Value",elem:"objTitleFR",die:false});
                c++;
            }
            if(a[i].text.en == ''){
                errorLog.push({form:(i+1),obj:"English Text",prob:"No Value",elem:"objTextEN",die:false});
                c++;
            }
            if(a[i].text.fr == ''){
                errorLog.push({form:(i+1),obj:"French Text",prob:"No Value",elem:"objTextFR",die:false});
                c++;
            }
            if(a[i].button.label.en == ''){
                errorLog.push({form:(i+1),obj:"English Button Label",prob:"No Value",elem:"objButtonEN",die:false});
                c++;
            }
            if(a[i].button.label.fr == ''){
                errorLog.push({form:(i+1),obj:"French Button Label",prob:"No Value",elem:"objButtonFR",die:false});
                c++;
            }
            if(a[i].button.url == ''){
                errorLog.push({form:(i+1),obj:"Button URL",prob:"No Value",elem:"objButtonLink",die:false});
                c++;
            }
            if(a[i].image.url == ''){
                errorLog.push({form:(i+1),obj:"Image URL",prob:"No Value",elem:"objImageMain",die:false});
                c++;
            }
        }
        errorLog.reverse();//present the errors in the right direction
        if(c > 0) {
            $(app.objects.el).css('display','inline-block');
            $('.errorListing').empty();
            for (var j = 0; j < errorLog.length; j++) {
                $('.errorListing').prepend('<li><a href="javascript:;" class="errorItem '+errorLog[j].die+'" '+app.handlers.i+'="'+j+'">Item ' + errorLog[j].form + ' : ' + errorLog[j].obj + ' : ' + errorLog[j].prob + '</a></li>');
                registerErrorButtons(errorLog[j].form,errorLog[j].elem,j,errorLog[j].prob,errorLog[j].die);
            }
            $(app.objects.el).find('button').html('Warnings<span class="label label-default numerrors">'+errorLog.length+'</span><span class="caret"></span>');
        }else{
            $(app.objects.el).css('display','none');
        }
    }
    function registerErrorButtons(num,elem,item,prob,die){
        /**
         * Binds each error item created by the
         * errorHandler function to a click handler
         * that animates scroll to the specific
         * error item
         */
        $(app.objects.bo).on('click','.errorItem['+app.handlers.i+'="'+item+'"]',function(){
            if(die == true){
                $(app.objects.e+num).find('.'+elem).css('background-color','rgba(238, 54, 54, 0.3)').css('border-color','red').attr('placeholder','Leaving this field empty will cause the hero banner function to fail');
            }else {
                $(app.objects.e + num).find('.' + elem).css('background-color', 'rgba(238, 162, 54, 0.3)');
            }
            $(app.objects.o).hide();
            $(app.objects.r).css('overflow','auto');
            $(app.objects.r).animate({
                scrollTop: $(app.objects.e + num+' .'+elem).offset().top-100
            }, app.animation.d.min);
            if($('.'+elem).parent().attr('class') !== 'input_holders'){
                $('.'+elem).wrap('<div class="input_holders"></div>').parent().append('<div class="input_alerts" title="'+prob+'"><span class="glyphicon glyphicon-exclamation-sign"></span></div>')
            }
        });
    }
    function traverseJSON(storage,nodeName){
        /**
         * Reads JSON that is pasted in the form in
         * translate JSON mode and prepares and formats
         * it to be output to the corresponding
         * form objects
         */
        if($(app.objects.b+' textarea').val() !== '' || localStorage.getItem('pgb_SavedNode') !== '') {
            if(storage == false) {
                var ctc = $(app.objects.b+' textarea').val();
                if(ctc == ''){
                    panelAlert('Form Does Not Contain JSON Data','error');
                }
            }else if(storage == true && nodeName !== '') {
                if(localStorage.getItem('pgb_SavedNode_'+nodeName) !== undefined && localStorage.getItem('pgb_SavedNode_'+nodeName) !== null && localStorage.getItem('pgb_SavedNode_'+nodeName) !== '') {
                    ctc = localStorage.getItem('pgb_SavedNode_'+nodeName).replace(',null', '');
                }else{
                    panelAlert('No Data Found In Local Storage','error');
                }
            }
                var prs = JSON.parse(ctc),
                obj = prs.hero,
                len = obj.length,
                formItems = $(app.objects.cl).length,
                formArray = [];
            if(formItems < len){
                var build = true,
                    bItems = len-formItems;
            }
            for(var h = 0;h<bItems;h++){
                addItems();
            }
            for (var i = 0; i < len; i++) {
                formArray.push(obj[i]);
            }
            jsonToForm(formArray);
            panelAlert('Data Translated To Form','good');
        }else{
            panelAlert('Please generate or paste JSON before using this function','error');
        }
    }
    function jsonToForm(aCode){
        /**
         * Takes formatted JSON sent from the TraverseJSON
         * function and outputs it to the mapped form
         * element
         */
            console.log(aCode);
        var jsLen = aCode.length;
        for(var i = 0;i<jsLen;i++){
            var jsForm = 'entry'+(i+1),
            $this = '#'+jsForm;
            $($this).find('.objStart').val(aCode[i].date.start);
            $($this).find('.objEnd').val(aCode[i].date.end);
            $($this).find('.objTitleEN').val(aCode[i].title.en);
            $($this).find('.objTitleFR').val(aCode[i].title.fr);
            $($this).find('.objTitleCol').val(aCode[i].title.color);
            $($this).find('.objTextEN').val(aCode[i].text.en);
            $($this).find('.objTextFR').val(aCode[i].text.fr);
            $($this).find('.objImageMain').val(aCode[i].image.url);
            $($this).find('.objImageAlt').val(aCode[i].image.altUrl);
            $($this).find('.objButtonEN').val(aCode[i].button.label.en);
            $($this).find('.objButtonFR').val(aCode[i].button.label.fr);
            $($this).find('.objButtonLink').val(aCode[i].button.url);
            $($this).find('.objDelay').val(aCode[i].date.delay);
            $($this).find('.objButtonPopup option[value="'+aCode[i].popUpLink+'"]').attr('selected',true);
            $($this).find('.objButtonPopupLink option[value="'+aCode[i].button.popUpLinkID+'"]').attr('selected',true);
            $($this).find('.objCountdownShow option[value="'+aCode[i].showCountdown+'"]').attr('selected',true);
            $($this).find('.objHeroSticky option[value="'+aCode[i].sticky+'"]').attr('selected',true);
            //$($this).find('.objHeroTitleShow').val(aCode[i].showTitle);
            //$($this).find('.objHeroSubtitleShow').val(aCode[i].showSubTitle);
            $($this).find('.objHeroPromote option[value="'+aCode[i].promote+'"]').attr('selected',true);
            console.log(aCode[i].active);
            if(aCode[i].active == true){
                $($this).find('.mod-radio').find('input[type="radio"]').first().prop('checked',true);
                $($this).find('.mod-radio').find('input[type="radio"]').last().prop('checked',false);
            }else if(aCode[i].active == false){
                $($this).find('.mod-radio').css('border-left-width','6px').css('border-left-style','solid').css('border-left-color','rgb(253, 0, 0)');
                $($this).find('.mod-radio').find('input[type="radio"]').first().prop('checked',false);
                $($this).find('.mod-radio').find('input[type="radio"]').last().prop('checked',true);
            }
            if($(app.objects.o).css('display') == 'block'){
                $(app.objects.o).hide();
                $(app.objects.r).css('overflow','auto');
            }
            $(app.objects.r).css('overflow','auto');
        }
    }
    function prepareJSON(meth,name,mode){
        /**
         * Serializes the form data in a JSON format
         * and passes the data to the outputJson
         * function
         */
        var c = [];
        if(mode == 'hero') {
            $('.clonedInput form fieldset[data-role="hero"]').each(function(){
                var a = $(this).serializeArray();
                c.push(a);
            });
            if (meth == 'full') {
                outputJson(c, meth, null, mode);
            } else if (meth == 'save') {
                outputJson(c, meth, name, mode);
            }
        }else if(mode == 'hello') {
            $('.clonedInput form fieldset[data-role="hello"]').each(function(){
                var a = $(this).serializeArray();
                c.push(a);
            });
                outputJson(c, 'full', null, 'hello');
        }
    }
    function outputJson(aCode,meth,name,mode){
        /**
         * Receives the serialized data parsed in the
         * prepareJSON function and outputs JSON
         * formatted code to the output view
         */
        var nodes = aCode.length;
        var lastItem = nodes-1;
        if(mode == 'hello'){
            var page_model = '{\n    "hello": [\n';
            for (var i = 0; i < nodes; i++) {
                page_model += '       {\n        "helloItem": "hello' + i + '",';
                page_model += '\n        "date": {';
                page_model += '\n          "start": "' + aCode[i][0].value + '",';
                page_model += '\n          "end": "' + aCode[i][1].value + '"';
                page_model += '\n        },';
                page_model += '\n        "text": {';
                page_model += '\n          "en": "' + aCode[i][2].value.trim().replace(/"/g,'') + '",';
                page_model += '\n          "fr": "' + aCode[i][3].value.trim().replace(/"/g,'') + '"';
                page_model += '\n        }';
                if (i < lastItem) {
                    page_model += '\n},\n';
                }
            }
            page_model += '\n      }\n   ]\n}';
        }else if(mode == 'hero') {
            page_model = '{\n    "hero": [\n';
            for (i = 0; i < nodes; i++) {
                //mapping
                if (aCode[i][14].value == '' || aCode[i][14].value == null || aCode[i][14].value == undefined) {
                    var elemA = true;
                } else {
                    elemA = aCode[i][14].value;
                }
                if (aCode[i][15].value == '' || aCode[i][15].value == null || aCode[i][15].value == undefined) {
                    var elemAA = true;
                } else {
                    elemAA = aCode[i][15].value;
                }
                if (aCode[i][16].value == '' || aCode[i][16].value == null || aCode[i][16].value == undefined) {
                    var elemAAA = true;
                } else {
                    elemAAA = aCode[i][16].value;
                }
                if (aCode[i][12].value == '' || aCode[i][12].value == null || aCode[i][12].value == undefined) {
                    var elemB = false;
                } else {
                    elemB = aCode[i][12].value;
                }
                if (aCode[i][17].value == '' || aCode[i][17].value == null || aCode[i][17].value == undefined) {
                    var elemC = false;
                } else {
                    elemC = aCode[i][17].value;
                }
                if (aCode[i][20] !== undefined) {
                    if (aCode[i][20].value == '' || aCode[i][20].value == null || aCode[i][20].value == undefined) {
                        var elemD = true;
                    } else {
                        elemD = aCode[i][20].value;
                    }
                } else {
                    elemD = true;
                }
                if (aCode[i][18] !== undefined) {
                    if (aCode[i][18].value == '' || aCode[i][18].value == null || aCode[i][18].value == undefined) {
                        var elemDD = false;
                    } else {
                        elemDD = aCode[i][18].value;
                    }
                } else {
                    elemDD = false;
                }
                if (aCode[i][19] !== undefined) {
                    if (aCode[i][19].value == '' || aCode[i][19].value == null || aCode[i][19].value == undefined) {
                        var elemE = 0;
                    } else {
                        elemE = aCode[i][19].value;
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
                page_model += '\n        "promote": ' + elemC + ',';
                page_model += '\n        "button": {';
                page_model += '\n          "label": {';
                page_model += '\n            "en": "' + aCode[i][9].value.trim() + '",';
                page_model += '\n            "fr": "' + aCode[i][10].value.trim() + '"';
                page_model += '\n          },';
                page_model += '\n        "url": "' + aCode[i][11].value + '",';
                page_model += '\n        "popUpLinkID": "' + aCode[i][13].value + '"';
                page_model += '\n        },';
                page_model += '\n        "image": {';
                page_model += '\n          "url": "' + aCode[i][7].value + '",';
                page_model += '\n          "altUrl": "' + aCode[i][8].value + '"';
                page_model += '\n        }';
                if (i < lastItem) {
                    page_model += '\n},\n';
                }
            }
            page_model += '\n      }\n   ]\n}';
        }
            if (meth == 'full') {
                if ($(app.objects.he).css('display') == 'block') {
                    $(app.objects.he).css('display', 'none');
                }
                if ($(app.objects.h).css('display') == 'block') {
                    $(app.objects.h).css('display', 'none');
                }
                if ($(app.objects.ls).css('display') == 'block') {
                    $(app.objects.ls).css('display', 'none');
                }
                $(app.objects.o).attr(app.handlers.r, 'output');
                $(app.objects.o).css('display', 'block');
                $(app.objects.o + ' textarea').val(page_model);
                $(app.objects.r).animate({scrollTop: 0}, app.animation.d.min).css('overflow', 'hidden');
                if(mode == 'hero'){
                    errorHandler();
                }
                panelAlert('JSON Exported Successfuly', 'good');
            } else {
                saveNodeToLS(page_model, name);
            }
    }
    function urlExists(testUrl) {
        /**
         * Check if an url exists
         */
        var http = jQuery.ajax({
            type:"HEAD",
            url: 'https:' + testUrl,
            async: false
        });
        return http.status;
        // this will return 200 on success, and 0 or negative value on error
    }
    function validateImage(type,handler){
        /**
         * Gets the image url input by the user and runs it
         * through the urlExists function. Depending on the
         * value returned, the form elements will be
         * formatted accordingly
         */
        if(type == 'main'){
            var a = $(app.objects.c+'['+app.handlers.d+'="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image').val(),
                aa = $(app.objects.c+'['+app.handlers.d+'="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image'),
                aaa = $(app.objects.c+'['+app.handlers.d+'="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image').parent().attr('class');
            if(a !== '') {
                var b = urlExists(a);
                if (b !== 200) {
                    if(aaa == 'input_holders'){
                        $(aa).next().next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    }else {
                        $(aa).next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    }
                } else if (b == 200) {
                    if(aaa == 'input_holders'){
                        $(aa).next().next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    }else {
                        $(aa).next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    }
                } else {
                    if(aaa == 'input_holders'){
                        $(aa).next().next().attr('style', '').html('Shopify CDN');
                    }else {
                        $(aa).next().attr('style', '').html('Shopify CDN');
                    }
                }
            }else{
                if(aaa == 'input_holders') {
                    $(aa).next().next().css('background-color', '#eee').html('Nothing to validate');
                }else {
                    $(aa).next().css('background-color', '#eee').html('Nothing to validate');
                }
            }
        }else if(type == 'alt'){
            var a = $(app.objects.ca+'['+app.handlers.d+'="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image').val(),
                aa = $(app.objects.ca+'['+app.handlers.d+'="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image'),
                aaa = $(app.objects.ca+'['+app.handlers.d+'="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image').parent().attr('class');
            if(a !== '') {
                var b = urlExists(a);
                if (b !== 200) {
                    if(aaa == 'input_holders') {
                        $(aa).next().next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    }else{
                        $(aa).next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    }
                } else if (b == 200) {
                    if(aaa == 'input_holders') {
                        $(aa).next().next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    }else {
                        $(aa).next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    }
                } else {
                    if(aaa == 'input_holders') {
                        $(aa).next().next().attr('style', '').html('Shopify CDN');
                    }else {
                        $(aa).next().attr('style', '').html('Shopify CDN');
                    }
                }
            }else{
                if(aaa == 'input_holders') {
                    $(aa).next().next().css('background-color', '#eee').html('Nothing to validate');
                }else {
                    $(aa).next().css('background-color', '#eee').html('Nothing to validate');
                }
            }
        }
    }
    function previewFeature(heroItem, mode, lang) {
        /**
         * Generates a preview of the hero banner in large
         * and small format by collection the forms
         * serialized data.
         */
        var dt = $(app.objects.e + heroItem).find('form').find('fieldset[data-role="hero"]').serializeArray(),
            start = dt[0].value,
            img = dt[7].value,
            titleColor = dt[4].value;
            if(lang == app.language.e){
            var titleText = dt[2].value,
                subTitleText = dt[5].value,
                buttonLabel = dt[9].value,
                endsLabel = 'Ends In';
            }else if(lang == app.language.f){
                    titleText = dt[3].value,
                    subTitleText = dt[6].value,
                    buttonLabel = dt[10].value,
                    endsLabel = 'Termine dans';
            }
            var buttonLink = dt[11].value,
            container = app.objects.h,
            target = '.render_output',
            sub = dt[16].value,
            warningString = '<div class="preview_warning" title="The position and size of the background may display differently than on the live site.">Preview may differ from actual site render</div>';
        if (mode == 'small') {
            var outputString = '<div class="five columns jose pedro homepage_content event mini-spacers animated fadeIn delay-05s"><div id="event-active-today">';
        } else {
            outputString = '';
        }
        outputString += '<div data-instance="slide-0" data-str="' + img + '"';
        outputString += ' data-promote="true" id="slide-0" class="hero fwidth root-0"><div data-object-pos="false-false" class="bcg skrollable skrollable-between" data-center="background-position: 50% 0px;" data-top-bottom="background-position: 50% -200px;" data-anchor-target="#slide-0"';
        outputString += ' style="background-image: url(' + img + '); background-position: 50% -55.2631578947369px;"><div class="hsContainer"><div class="hsContent center skrollable skrollable-before" data-100-top="opacity: 1" data-25-top="opacity: 0" data-anchor-target="#slide-0 .animated" style="opacity: 1;">';
        outputString += '<div itemscope="" itemtype="http://schema.org/Event" class="animated fadeIn delay-025s hero_head"><p itemprop="startDate" content="' + start + '" class="subtitle timedown is-countdown" id="countdown0" style="opacity:0.9"><span>'+endsLabel+'  <b>11:29:39</b> </span></p>';
        outputString += '<h1 class="headline herobanner" style="color:' + titleColor + '">' + titleText + '</h1>';
        if(sub == 'true') {
            outputString += '<p class="subtitle herobanner">' + subTitleText + '</p>';
        }
        outputString += '<a data-bleed="" href="' + buttonLink + '" class="action_button hero"><span class="trn" data-trn-key="">' + buttonLabel + '</span></a>';
        outputString += '</div></div></div></div></div>';
        if (mode == 'small') {
            outputString += '</div></div><div style="clear:both"></div>';
        } else if (mode == 'large') {
            outputString += warningString;
        }
        $(container).show().css('top',sPos+50);
        $(target).empty().append(outputString);
        if (mode == 'small') {
            pfHero = heroItem;
            pfMode = mode;
            $(target).addClass('renderSmall').attr('data-hero',heroItem).attr('data-language',lang).attr('data-mode',mode);
        } else if (mode == 'large') {
            pfHero = heroItem;
            pfMode = mode;
            $(target).removeClass('renderSmall').attr('data-hero',heroItem).attr('data-language',lang).attr('data-mode',mode);
        }
    }
    $('.btnAdd').attr('disabled', false);
    // Disable the "remove" button
    $('.btnDel').attr('disabled', true);
    /**
     * event handlers bound to the .on expression
     * so that dynamically generated divs are
     * taken into consideration
     */
    $(app.objects.bo).on('click','.btnAdd',function () {
        addItems();
    }).on('click','.overlay_close',function(){
        $(this).parent().parent().hide();
        $(app.objects.r).css('overflow','auto');
        $('.overlay_message').css('display','none')
    }).on('click','.select_content',function() {
        var $this = $(app.objects.b+' textarea');
        $this.select();
        // Work around Chrome's little problem
        $this.mouseup(function() {
            // Prevent further mouseup intervention
            $this.unbind("mouseup");
            return false;
        });
    }).on('click','.gotoItem',function (){
        var a = $(this).data('item');
        $(app.objects.r).animate({
            scrollTop: $(app.objects.e + a).offset().top-60
        }, app.animation.d.min);
        if($(app.objects.o).css('display')=='block'){
            $(app.objects.r).css('overflow','auto');
            $('#oapp.objects.output').css('display','none')
        }
        if($(app.objects.he).css('display') == 'block'){
            $(app.objects.he).css('display','none');
        }
    }).on('click','.about_app,.version_number',function (e){
        window.open("../release.html", "_blank","scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no");
    }).on('click','.btnAddMulti',function (){
        $('#query-zone').toggle();
        $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min);
        if($(app.objects.o).css('display') == 'block'){
            $(app.objects.o).css('display','none');
        }
        if($(app.objects.h).css('display') == 'block'){
            $(app.objects.h).css('display','none');
        }
        $('.num_select').focus();
    }).on('click',app.objects.c,function(e){
        var a = $(this).data('handler');
        validateImage('main',a);
        e.preventDefault();
    }).on('click','.multiquery_close',function(){
        $(this).parent().parent().hide();
    }).on('click','.check_alt_image',function(e){
        var a = $(this).data('handler');
        validateImage('alt',a);
        e.preventDefault();
    }).on('click','.overlay_validate',function(){
        validateJSON();
    }).on('click','.previewItem.large',function(e){
        $(app.objects.r).animate({ scrollTop: sPos }, app.animation.d.min).css('overflow','hidden');
        var a = $(this).data('hero');
        previewFeature(a,'large',pfLang);
        e.preventDefault();
    }).on('click','.previewItem.small',function(e){
        $(app.objects.r).animate({ scrollTop: sPos }, app.animation.d.min).css('overflow','hidden');
        var a = $(this).data('hero');
        previewFeature(a,'small',pfLang);
        e.preventDefault();
    }).on('click','.removeThisItem',function(){
        var a = $(this).data('item');
        deleteItems(a);
    }).on('click','.loadItem',function(){
        var a = $(this).attr(app.handlers.i);
        traverseJSON(true,a);
    }).on('click','.copy-zone',function(){
        OpenInNewTab('https://github.com/davidemaser/davidemaser.github.io');
    }).on('click','.showHelp',function(){
        $(app.objects.he).toggle();
        if($(app.objects.he).css('display') == 'block'){
            $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow','hidden');
        }else{
            $(app.objects.r).css('overflow','auto');
        }
        if($(app.objects.o).css('display') == 'block'){
            $(app.objects.o).css('display','none');
        }
        if($(app.objects.h).css('display') == 'block'){
            $(app.objects.h).css('display','none');
        }
    }).on('click','.help_close',function(){
        if($(app.objects.he).css('display') == 'block'){
            $(this).parent().parent().hide();
            $(app.objects.r).css('overflow','auto');
        }
    }).on('click','.renderer_close',function(){
        if($(app.objects.h).css('display') == 'block'){
            $(this).parent().parent().hide();
            $(app.objects.r).css('overflow','auto');
            $(app.objects.h).find('.render_output').empty();
        }
    }).on('click','.btnNmode',function () {
        var a = $(app.dom.b).attr('data-nmode');
        if(a == 'hero'){
            $(app.dom.b).attr('data-nmode','hello');
            $(this).attr('data-nmode','hello');
            $(this).html('Switch to Hero Banner Mode');
            switchModes('hello')
        }else if(a == 'hello'){
            $(app.dom.b).attr('data-nmode','hero');
            $(this).attr('data-nmode','hero');
            $(this).html('Switch to Hello Bar Mode');
            switchModes('hero')
        }else if(a == 'altiSpecial'){
            $(app.dom.b).attr('data-nmode','altiSpecial');
            $(this).attr('data-nmode','altiSpecial');
            $(this).html('Switch to Hello Bar Mode');
            switchModes('altiSpecial');
        }
    }).on('click','.btnDel',function () {
        deleteItems('last');
    }).on('click','.submit_json',function (){
        var a = $(this).attr('data-nmode');
        prepareJSON('full',null,a);
    }).on('click','.translate_json',function (){
        $('.overlay_message').html('');
        $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow','hidden');
        $(app.objects.o).attr(app.handlers.r,'translate').css('display','block').find('#output_code').val('').attr('placeholder','Paste you code here');
    }).on('click','.save_json',function (e){
        if(app.save == true) {
            doLocalSave();
        }else{
            confirm('The save to localstorage feature is disabled. Change the save value to true in the globals file.');
        }
    }).on('click','.import_json',function (e){
        choseLocalSave();
    }).on('click','.overlay_translate',function (){
        traverseJSON(false);
    }).on('click','.errors_reset',function (){
        $('input,select').attr('style','').attr('placeholder','');
        $('.errorList').css('display','none');
        $(app.objects.r).css('overflow','auto');
        $(app.objects.i).find('.input_alerts').remove();
        $(app.objects.i).contents().unwrap();
        panelAlert('Errors Reset','good');
    }).on('click','.form_reset',function (e){
        $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow','hidden');
        $('.clonedInput:gt(0)').remove();
        $('.snapTo').find('li:gt(0)').remove();
        $('input').val('');
        $('input,select').attr('style','').attr('placeholder','');
        $('.errorList').css('display','none');
        $(app.objects.r).css('overflow','auto');
        $(app.objects.i).find('.input_alerts').remove();
        $(app.objects.i).contents().unwrap();
        $('.reordered').remove();
        panelAlert('Form Reset To Default','good');
        e.preventDefault();
    }).on('click','.itemize_reset',function (e){
        resetItems();
        e.preventDefault();
    }).on('click','.form_local_reset',function (e){
        doLocalSave('reset');
        $(app.objects.l).hide();
        e.preventDefault();
    }).on('click','input,select',function(){
        $(this).attr('style','').attr('placeholder','');
        if($(this).parent().hasClass('input_holders')) {
            $(this).parent().find('.input_alerts').remove();
            $(this).unwrap();
        }
    }).on('click','.helpItem',function(){
        var a = $(this).data('target');
        jumpToHelper(a);
    }).on('click','.image_count',function(){
        $(this).attr('style','');
        $(this).text('Shopify CDN');
    }).on('click','.btnSwitch',function(e){
        pfLang = $(this).data('language');
        $('.btnSwitch').removeClass('view-active');
        $('.btnSwitch[data-language="'+pfLang+'"]').addClass('view-active');
        if($(app.objects.ro).children().not('.preview_warning').length > 0){
            var rH = pfHero,
                rL = pfLang,
                rM = pfMode;
            previewFeature(rH, rM, rL)
        }
        panelAlert('Preview language changed','good');
        e.preventDefault();
    }).on('click','.panel-body.bottom_level_bt',function(){
        $(this).slideUp();
    }).on('click','.show_me_how',function(){
        var a = $(this).data('target')-1;
        $(app.objects.r).animate({ scrollTop: 0 },{duration:app.animation.d.min,
                complete:function(){
                    $(app.objects.he).show();
                    jumpToHelper(a);
                }
        }).css('overflow','hidden');
    }).on('click','.helpItemReset',function(){
        $(app.objects.hi).animate({
            opacity: 1
        }, app.animation.d.min);
    }).on('click','.settings_toggle',function(e){
        var a = $(this).data('theme');
        $('html').attr(app.handlers.t,a);
        if(window.localStorage) {
            localStorage.setItem('pgb_Theme', a);
        }
        e.preventDefault();
    }).on('click','.moveUpThisItem',function(fn){
        var a = $(this).data('item'),
            b = a-1,
            c = $(this).parent().parent().parent().parent().parent().parent(),
            d = $(c).closest(app.objects.cl).prev(),
            e = $(c).data('split');
            $(c).attr(app.handlers.s,(e-1));
            $(c).insertBefore(d);
            $(app.objects.r).animate({
                scrollTop: $(app.objects.e + a).offset().top-60
            }, app.animation.d.min);
            //$(d).closest(app.objects.cl).prev();
        $(this).parent().parent().parent().find('.reordered').remove();
        $(this).parent().parent().parent().find('.btn.btn-info:not(.dropdown-toggle)').prepend('<span title="This entry has been moved from it\'s original position" class="glyphicon glyphicon-fullscreen reordered" aria-hidden="true"></span>');
        fn.preventDefault();
    }).on('click','.moveDownThisItem',function(fn){
        var a = $(this).data('item'),
            b = a-1,
            c = $(this).parent().parent().parent().parent().parent().parent(),
            d = $(c).closest(app.objects.cl).next(),
            e = $(c).data('split'),
            f = $(d).attr('id');
            if(f.indexOf('entry') > -1) {
                $(c).attr(app.handlers.s, (e + 1));
                $(c).insertAfter(d);
                $(app.objects.r).animate({
                    scrollTop: $(app.objects.e + a).offset().top - 60
                }, app.animation.d.min);
                $(this).parent().parent().parent().find('.reordered').remove();
                $(this).parent().parent().parent().find('.btn.btn-info:not(.dropdown-toggle)').prepend('<span title="This entry has been moved from it\'s original position" class="glyphicon glyphicon-fullscreen reordered" aria-hidden="true"></span>');
            }else{
                panelAlert('If I move down any further, I\'ll be off the page.','error');
            }
        fn.preventDefault();
    }).on('click','.batsToggle',function(){
        if($(this).attr('data-status') == 'active') {
            killBats();
        }else if($(this).attr('data-status') == 'allGone') {
            launchBats();
            launchBats();
            launchBats();
            launchBats();
            launchBats();
            $('.batsToggle').attr('data-status','active').html('Kill The Bats');
        }
    }).on('keyup','input',function(){
        var a = $(this).val().length;
        if($(this).hasClass('objTitleEN') || $(this).hasClass('objTitleFR') || $(this).hasClass('objTextEN') || $(this).hasClass('objTextFR')){
            var compLen = 35;
        }else if($(this).hasClass('objButtonEN') || $(this).hasClass('objButtonFR')){
            compLen = 15;
        }
        if(a > compLen){
            if($(this).parent().attr('class')!=='input_holders') {
                $(this).wrap('<div class="input_holders"></div>').parent().append('<div class="input_alerts" title="The length of your text may be too long for the hero banner container. Make sure to check that it displays correctly."><span class="glyphicon glyphicon-exclamation-sign"></span></div>');
                $(this).focus();
            }
        }else{
            if(a <= compLen){
                if($(this).parent().attr('class')=='input_holders') {
                    $(this).parent().find('.input_alerts').remove();
                    $(this).unwrap();
                    $(this).focus();
                }
            }
        }
    }).on('keyup','.num_select',function(e){
        if(e.keyCode == 13){
            $(this).trigger("enterKey");
            addMulti($(this).val());
            $(this).parent().parent().parent().parent().hide();
        }
    }).on('keyup','.lsl_select',function(e){
        if(e.keyCode == 13){
            $(this).trigger("enterKey");
            prepareJSON('save',$(this).val());
            $(this).parent().parent().parent().parent().hide();
            setHeadSec();
        }
    }).on('keyup',app.objects.o+'['+app.handlers.r+'="translate"] #output_code',function(e){
        if(e.keyCode == 45){
            $(this).trigger("enterKey");
            traverseJSON(false);
            e.preventDefault();
        }
    }).on('change','.objHeroSticky',function(){
        var a = $(this).val();
        if(a == 'true'){
            $(this).parent().parent().find('.objHeroPromote option[value="true"]').attr('selected',false);
        }else if(a == 'false'){
            //$(this).parent().parent().find('.objHeroPromote option[value="false"]').attr('selected',true);
        }
    }).on('change','.objButtonPopup',function(){
        var a = $(this).val();
        if(a == 'true'){
            $(this).parent().parent().find('.objButtonPopupLink').attr('style','');
        }else if(a == 'false'){
            $(this).parent().parent().find('.objButtonPopupLink').css('opacity',0.3);
        }
    }).on('change','.input_radio',function(){
        var a = $(this).parent().parent().parent().parent().parent().attr('id').replace('entry','');
        if($(this).val()=='true'){
            $(this).parent().parent().css('border-left','6px solid #68B81F');
            $(this).parent().parent().parent().parent().find('h2').find('span').removeClass('label-danger').addClass('label-default');
            $('.gotoItem['+app.handlers.i+'="'+a+'"]').removeClass('redout').attr('title','');
        }else{
            $(this).parent().parent().css('border-left','6px solid #FD0000');
            $(this).parent().parent().parent().parent().find('h2').find('span').removeClass('label-default').addClass('label-danger');
            $('.gotoItem['+app.handlers.i+'="'+a+'"]').addClass('redout').attr('title','This Hero entry is not activated');
        }
    }).on('change','.lsOptions',function(){
        try {
            if ($(this).val() !== "" || $(this).val() !== "undefined" || $(this).val() !== undefined || $(this).val() !== "null" || $(this).val() !== null) {
                var a = $(this).val();
                traverseJSON(true, a);
            } else {
                panelAlert('Please select a valid data item from the dropdown', 'error');
            }
        }catch(e){

        }
    });
    $(window).on('scroll', function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $('.copy-zone').fadeIn(app.animation.d.min);
        }else{
            $('.copy-zone').fadeOut(app.animation.d.min);
        }
    }).on('resize', function() {
        scrollState('a');
    });
    $(document).on('keydown', function(e) {
        if (e.keyCode == 71 && e.ctrlKey) {
            prepareJSON('full');
            e.preventDefault();
        }
        if (e.keyCode == 82 && e.ctrlKey) {
            deleteItems();
            e.preventDefault();
        }
        if (e.keyCode == 73 && e.ctrlKey && !e.altKey) {
            addItems();
            e.preventDefault();
        }
        if (e.keyCode == 73 && e.ctrlKey && e.altKey) {
            $('#query-zone').toggle();
            $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min);
            if($(app.objects.o).css('display') == 'block'){
                $(app.objects.o).css('display','none');
            }
            if($(app.objects.h).css('display') == 'block'){
                $(app.objects.h).css('display','none');
            }
            $('.num_select').focus();
            e.preventDefault();
        }
        if (e.keyCode == 83 && e.ctrlKey && e.shiftKey) {
            prepareJSON('save');
        }
        if (e.keyCode == 13 && e.ctrlKey && e.altKey) {
            $('.overlay_message').html('');
            $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow','hidden');
            $(app.objects.o).attr(app.handlers.r,'translate').css('display','block').find('#output_code').val('').attr('placeholder','Paste you code here');
            e.preventDefault();
        }
        if (e.keyCode == 45 && e.ctrlKey && e.altKey) {
            traverseJSON(true);
        }
        if (e.keyCode == 69 && e.ctrlKey && e.altKey) {
            if(pfLang == app.language.e){
                pfLang = app.language.f;
            }else if(pfLang == app.language.f){
                pfLang = app.language.e;
            }
            $('.btnSwitch').removeClass('view-active');
            $('.btnSwitch[data-language="'+pfLang+'"]').addClass('view-active');
            if($(app.objects.ro).children().not('.preview_warning').length > 0){
                    var rH = pfHero,
                    rL = pfLang,
                    rM = pfMode;
                previewFeature(rH, rM, rL);
            }
            panelAlert('Preview language changed','good');
            e.preventDefault();
        }
        if (e.keyCode == 191 && e.ctrlKey) {
            window.open("../release.html", "_blank","scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no");
            e.preventDefault();
        }
    }).on('scroll', function(){
        scrollState('b');
        sPos = $(window).scrollTop();
    });
    var d = new Date();
    var dt = d.getDate(),
        dm = d.getMonth()+1;
    if(dm == 10 && dt > 21) {
        $('.main_nav').append('<li class="divider"></li><li><a href="#" class="batsToggle" data-status="active">Kill The Bats</a></li>');
        launchBats();
        launchBats();
        launchBats();
        launchBats();
        launchBats();
    }
});