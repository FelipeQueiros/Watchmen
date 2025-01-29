const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

// Função para compilar SCSS para CSS
function styles() {
    return gulp.src('./src/styles/*.scss') // Caminho para todos os arquivos SCSS
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
}

// Função para minificar e concatenar scripts
function scripts() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(rename({ basename: 'main', extname: '.min.js' }))
        .pipe(gulp.dest('./dist/js'));
}

// Função para otimizar imagens
function images() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

// Tarefa para compilar SCSS e concatenar em um único arquivo
gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(rename({ basename: 'main', extname: '.min.css' }))
        .pipe(gulp.dest('dist/css'));
});

// Função watch para monitorar mudanças nos arquivos SCSS
gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/styles/*.scss', gulp.series(styles)); // Monitora mudanças nos arquivos SCSS
    gulp.watch('./src/scripts/*.js', gulp.series(scripts)); // Monitora mudanças nos arquivos JS
});

// Definindo a tarefa padrão
gulp.task('default', gulp.parallel('watch', styles, images, scripts));

// Exportando funções para serem usadas como tarefas individuais, se necessário
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = gulp.series('watch');
