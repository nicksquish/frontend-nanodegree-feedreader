/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are defined and not empty', function() {
            allFeeds.forEach(function(i) {
            expect(i.url).toBeDefined();
            expect(i.url.length).not.toBe(0);
            });
        });
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined and not empty', function() {
            allFeeds.forEach(function(i) {
            expect(i.name).toBeDefined();
            expect(i.name.length).not.toBe(0);
            });
        });
    });

    describe('The Menu', function(){

        /* This test ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('toggles visibility when clicked', function() {
            //simulate clicking the menu icon to open it
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //simulate clicking the menu icon to hide it
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function(done) {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('are visible in the feed container on load', function() {
            expect($('.feed').find('.entry').length).not.toBe(0);
        });
    });

    describe('New Feed Selection', function(done) {
        
        let previousFeed;
        let nextFeed;

        beforeEach(function(done) {
            //load initial feed and log it's content to variable previousFeed
            loadFeed(0, function() {
                previousFeed = $('.feed').html();
                //load a new feed and log it's content to variable nextFeed
                loadFeed(1, function() {
                    nextFeed = $('.feed').html();
                    done();
                });
            });
        });
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('changes content when a new feed is loaded', function(done) {
            expect(previousFeed).not.toBe(nextFeed);
            done();
        });
     });
}());
