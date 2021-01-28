const {createWriteStream} = require('fs');
const {Readable} = require('stream');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const {SitemapStream, SitemapIndexStream} = require('sitemap');

module.exports.imageMin = () =>
    gulp
        .src('src/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(
            imagemin({
                verbose: true,
            })
        )
        .pipe(gulp.dest('src'));

module.exports.siteMap = () => {
    const links = [{url: '/'}];

    const writeIndex = createWriteStream('./resources/sitemap.xml');
    const index = new SitemapIndexStream();
    index.write({
        url: 'https://eviltechcrew.ru/sitemap-0.xml',
        lastmod: new Date(),
    });
    index.pipe(writeIndex);
    index.end();

    const sitemap = new SitemapStream({
        hostname: 'https://eviltechcrew.ru',
        xmlns: {
            news: false,
            xhtml: false,
            image: false,
            video: false,
        },
    });
    const write = createWriteStream('./resources/sitemap-0.xml');
    return Readable.from(links).pipe(sitemap).pipe(write);
};
