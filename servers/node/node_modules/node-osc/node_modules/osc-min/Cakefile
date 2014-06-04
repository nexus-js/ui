fs = require 'fs'
child = require 'child_process'

task 'test', 'run tests (requires development install)', (options) ->
    test = child.spawn 'expresso', ['-I', './lib', 'test']
    test.stdout.pipe process.stdout
    test.stderr.pipe process.stderr

task 'coverage', 'run tests with coverage check (requires development install)', (options) ->
    compile = child.exec 'coffee -c lib', ->
      test = child.spawn 'expresso', ['-I', './lib', '--cov', 'test']
      test.stdout.pipe process.stdout
      test.stderr.pipe process.stderr
      test.on "exit", () ->
        child.exec "ls lib/*.coffee", (error, output) ->
          output = output.replace /\.coffee/g, ".js"
          child.exec "rm -rf lib-cov " + output

task 'doc', 'create md and html doc files', (options) ->
    child.exec 'docket lib/* examples/* -m'
    child.exec 'docket lib/* examples/* -d doc_html'