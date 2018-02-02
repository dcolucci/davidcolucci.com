require 'fileutils'

desc "start the database server"
task :startdb do
  sh %{ pg_ctl start -D /usr/local/var/postgres }
end


desc "stop the database server"
task :stopdb do
  sh %{ pg_ctl stop -D /usr/local/var/postgres }
end
