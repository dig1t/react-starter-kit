module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		// Tasks
		sass: { // Convert sass file into css
			dist: {
				options: {
					sourcemap: 'none'
				},
				files: [{
					expand: true,
					cwd: 'src/scss',
					src: [
						'admin.scss',
						'main.scss'
					],
					dest: 'public/compiled/css',
					ext: '.css'
				}]
			}
		},
		
		concat: { // Concatenate required css files with compiled sass file
			dist: {
				src: [
					'public/compiled/css/main.css',
					'src/scss/*.css'
				],
				dest: 'public/compiled/css/build.css'
			}
		},
		
		cssmin: { // Minify admin and build files
			dist: {
				files: [{
					expand: true,
					cwd: 'public/compiled/css',
					src: [
						'admin.css',
						'build.css'
					],
					dest: 'public/compiled/css',
					ext: '.min.css'
				}]
			}
		},
		
		clean: { // Remove uncompressed files
			dist: {
				src: [
					'public/compiled/css/*.css',
					'!public/compiled/css/*.min.css'
				]
			}
		},
		
		watch: { // Watch for file changes
			css: {
				files: ['src/scss/*.scss', 'src/scss/pages/*.scss'],
				tasks: ['sass', 'concat', 'cssmin', 'clean']
			}
		}
	})
	
	const tasks = [
		'grunt-contrib-sass',
		'grunt-contrib-concat',
		'grunt-contrib-cssmin',
		'grunt-contrib-uglify',
		'grunt-contrib-clean',
		'grunt-contrib-watch'
	]
	
	tasks.map(task => {
		grunt.loadNpmTasks(task)
	})
	
	grunt.registerTask('default', ['watch'])
}