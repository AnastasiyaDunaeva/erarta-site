"use strict";
//подключение модулей
const gulp = require("gulp"), //система описания задач
  prefixer = require("gulp-autoprefixer"), //расстановка префиксов
  sass = require("gulp-sass"), //компиляция scss
  htmlmin = require("gulp-htmlmin"), //минимизация html
  uglify = require("gulp-uglify"),
  rigger = require("gulp-rigger"),
  plumber = require("gulp-plumber"),
  rimraf = require("rimraf"),
  browserSync = require("browser-sync"), //веб-сервер
  reload = browserSync.reload, //перезагрузка веб-сервера
  path = {
    build: {
      html: "build/",
      scss: "build/css/",
      js: "build/js/",
      img: "build/img/",
      font: "build/font/"
    },
    src: {
      html: "*.html",
      scss: "scss/*.scss",
      js: "js/**/*.js",
      img: "img/**/*",
      font: "font/**/*"
    },
    watch: {
      html: "*.html",
      scss: "scss/**/*.scss",
      js: "js/**/*.js",
      img: "img/**/*",
      font: "font/**/*",
    },
    clean: "build/",
  },
  // конфигурация browser sync
  config = {
    server: {
      baseDir: "./build",
      index: "index.html",
    },
    host: "localhost",
    //tunnel: true,
    port: 7787,
    logPrefix: "WebDev",
  };

gulp.task("clean", function (done) {
  rimraf(path.clean, done);
});

gulp.task("build:html", function (done) {
  gulp
    .src(path.src.html)
    .pipe(plumber())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({ stream: true }));
  done();
});

gulp.task("build:scss", function (done) {
  gulp
    .src(path.src.scss)
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.scss))
    .pipe(reload({ stream: true }));
  done();
});

gulp.task("build:js", function (done) {
  gulp
    .src(path.src.js)
    .pipe(plumber())
    .pipe(rigger())
    // .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }));
  done();
});

gulp.task("build:img", function (done) {
  gulp
      .src(path.src.img)
      .pipe(gulp.dest(path.build.img))
      .pipe(reload({ stream: true }));
  done();
});

gulp.task("build:font", function (done) {
  gulp
      .src(path.src.font)
      .pipe(gulp.dest(path.build.font))
      .pipe(reload({ stream: true }));
  done();
});


gulp.task("webserver", function (done) {
  browserSync(config);
  done();
});

gulp.task("watch", function (done) {
  gulp.watch(path.watch.html, gulp.series("build:html"));
  gulp.watch(path.watch.scss, gulp.series("build:scss"));
  gulp.watch(path.watch.js, gulp.series("build:js"));
  gulp.watch(path.watch.img, gulp.series("build:img"));
  gulp.watch(path.watch.font, gulp.series("build:font"));
  done();
});

gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("build:html", "build:scss", "build:js", "build:img", "build:font"),
    "watch",
    "webserver"
  )
);
