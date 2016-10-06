# [gulp](https://github.com/wearefractal/gulp)-rename-assets

> Rename assets and update their names on css/js/html files

Sometimes you're in the middle of a project and wished you had a different naming convention for your assets at the beginning. This is always a tedius work of rename a file then search for this name on your css and html files to replace. This tool was made to make it easier.

This transforms your source files, use with caution. `git reset --hard` is your friend if you mess anything up.

## Install

Install with [npm](https://npmjs.org/package/gulp-rename-assets)

```
npm install --save-dev gulp-rename-assets
```

## Example

```js
var gulp = require('gulp');
var rename = require('gulp-rename-assets');

gulp.task('images:rename', function () {
  gulp.src(['./css/**/*.css', './views/**/*.html'], {
      base: './'
    })
    .pipe(rename({
        path: './',
        rename: {
          'img/my-little-save-icon.svg': 'img/icon-save.svg',
          'img/another-little-delete-icon.svg': 'img/icon-delete.svg',
          'media/final-hero-v4-tmp.mp4': 'media/hero.mp4'
        }
      }))
    .pipe(gulp.dest('./'));
});
```

## API

### rename-assets(options)

#### options.path
Type: `String`
Default value: `"./"`

Path to assets, defaults to current.


#### options.rename

Type: `Object`
*Required*

Object with keys as current file names and values as targets


## License

MIT © [Ramon Fritsch](http://www.ramonfritsch.com/)


## Release History

 * 2016-10-6   v0.0.1   Initial release.
