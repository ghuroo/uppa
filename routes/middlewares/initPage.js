var _ = require('underscore'),
    keystone = require('keystone'),
    Promise = require("bluebird"),
    i18n = require('i18n'),
    Page = keystone.list('Page'),
    Language = keystone.list('Language');

// initialises the standard view locals & include anything that should be initialised before route controllers are executed.
exports = module.exports = function(req, res, next) {

    function redirectPage(path) {
        // console.log('Redirecting to:', path);
        return res.status(301).redirect(path);
    }

    function switchPage(path) {
        // console.log('Switching page to', path);
        return new Promise(function(resolve, reject) {
            Page.model.find() //find all pages with this url (we can't filter language because this function sets the language based on the route (independently of current locale))
            .where('URL', path)
            .populate('language')
            .exec(function(err, page) {
                if (err) reject(err); // if no page was found, return

                var currentPage;
                if (page.length > 1) { // if more than one page is returned, then page URL is shared and we need to retrieve the right one
                    for (i = 0; i < page.length; i++) {
                        if (page[i].language.iso == i18n.getLocale()) currentPage = page[i];
                    }
                } else { // if only one page is returned, this is our current page
                    currentPage = page[0];
                }

                resolve(currentPage);
            });
        });
    }

    function getNavigation(language) {
        // console.log('Building navigation menu');
        return new Promise(function(resolve, reject) {
            Page.model.find() //find all pages with the same language
            .where('language', language)
            .sort('sortOrder')
            .exec(function(err, pages) {
                if (err) reject(err); // if pages not found, return

                newPages = []; // create friendly object for the FE (so we can get pages with pages['page-name'].URL)
                for (var i = 0; i < pages.length; i++) {
                    var name = pages[i].type;
                    if (pages[i].subType) name += '-' + pages[i].subType;
                    newPages[name] = pages[i];
                }

                resolve(newPages);
            });
        });
    }

    function getLocaleVersions(currentPage) {
        // console.log('Building locale versions navigation menu');
        return new Promise(function(resolve, reject) {
            Page.model.find() // get current page locale versions (get every page of same type & subtype)
            .where('type', currentPage.type)
            .where('subType', currentPage.subType)
            .populate('language')
            .exec(function(err, localePages) {
                if (err) reject(err); // if pages not found, return

                // if current page locale versions share same URL, add ?locale query parameter to each item, except for current page
                if (localePages.length > 1) {
                    for (var i = 0; i < localePages.length; i++) {
                        if (localePages[i].key !== currentPage.key) {
                            if (localePages[i].URL == currentPage.URL) localePages[i].URL += '?locale='+ localePages[i].language.iso;
                        }
                    }
                }

                resolve(localePages);
            });
        });
    }

    function switchLocale(locale) {
        return new Promise(function(resolve, reject) {
            Language.model.findOne({ iso: locale })
            .exec(function(err, language) {
                if (err) reject(err);

                setLocale(language).then(function(language) {
                    resolve(language);
                });

            });
        });
    }

    function setLocale(language) {
        return new Promise(function(resolve, reject) {
            // console.log('Switching language to:', language.iso);
            i18n.setLocale(language.iso);
            res.setLocale(language.iso);
            req.setLocale(language.iso);
            res.locale = language.iso;

            resolve(language);
        });
    }

    // sent locals:
    // currentPage
    // currentPage.localeVersions
    // currentLanguage
    // navigationMenu

    var locals = res.locals;

    if (!_.isEmpty(req.query.locale)) { // if user is switching to new language (needed for routes that share the same URL)
        switchLocale(req.query.locale).then(function(language) { // switch locale
            return redirectPage(req._parsedUrl.pathname); // & redirect to desired page
        });
    } else { // if not switching language, proceed to requested page

        switchPage(req._parsedUrl.pathname) // switch page
        .then(function(currentPage) {
            locals.currentPage = currentPage; // set currentPage
            return setLocale(currentPage.language); // set language based on currentPage
        })
        .then(function(language) {
            locals.currentLanguage = language;
            return getNavigation(locals.currentPage.language); // retrieve navigation menu based on current language
        })
        .then(function(navigationMenu) {
            locals.navigationMenu = navigationMenu;
            return getLocaleVersions(locals.currentPage); // get locale versions of current language
        })
        .then(function(localeVersions) {
            locals.currentPage.localeVersions = localeVersions;
            next();
        })
        .catch(function (error) {
            next();
        });
    }

};
